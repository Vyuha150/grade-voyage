-- Fix function search path issues
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;

CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (user_id, school_id, role, first_name, last_name, email)
  VALUES (
    NEW.id,
    '00000000-0000-0000-0000-000000000001',
    'PARENT',
    COALESCE(NEW.raw_user_meta_data->>'first_name', 'User'),
    COALESCE(NEW.raw_user_meta_data->>'last_name', 'Name'),
    NEW.email
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;

-- Create security definer functions to avoid RLS recursion
CREATE OR REPLACE FUNCTION public.get_current_user_role()
RETURNS TEXT AS $$
  SELECT role::TEXT FROM public.profiles WHERE user_id = auth.uid();
$$ LANGUAGE SQL SECURITY DEFINER STABLE SET search_path = public;

CREATE OR REPLACE FUNCTION public.get_current_user_school_id()
RETURNS UUID AS $$
  SELECT school_id FROM public.profiles WHERE user_id = auth.uid();
$$ LANGUAGE SQL SECURITY DEFINER STABLE SET search_path = public;

-- RLS policies for schools
CREATE POLICY "Users can view their school" ON public.schools
  FOR SELECT USING (id = public.get_current_user_school_id());

-- RLS policies for classes
CREATE POLICY "Users can view classes in their school" ON public.classes
  FOR SELECT USING (school_id = public.get_current_user_school_id());

CREATE POLICY "Admins can manage classes" ON public.classes
  FOR ALL USING (public.get_current_user_role() = 'ADMIN');

-- RLS policies for sections
CREATE POLICY "Users can view sections in their school" ON public.sections
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM public.classes c 
      WHERE c.id = sections.class_id 
      AND c.school_id = public.get_current_user_school_id()
    )
  );

CREATE POLICY "Admins can manage sections" ON public.sections
  FOR ALL USING (public.get_current_user_role() = 'ADMIN');

-- RLS policies for subjects
CREATE POLICY "Users can view subjects in their school" ON public.subjects
  FOR SELECT USING (school_id = public.get_current_user_school_id());

CREATE POLICY "Admins can manage subjects" ON public.subjects
  FOR ALL USING (public.get_current_user_role() = 'ADMIN');

-- RLS policies for students
CREATE POLICY "Users can view students in their school" ON public.students
  FOR SELECT USING (school_id = public.get_current_user_school_id());

CREATE POLICY "Parents can view their ward students" ON public.students
  FOR SELECT USING (
    public.get_current_user_role() = 'PARENT' AND
    EXISTS (
      SELECT 1 FROM public.parent_student_relationships psr
      JOIN public.profiles p ON p.id = psr.parent_profile_id
      WHERE p.user_id = auth.uid() AND psr.student_id = students.id
    )
  );

CREATE POLICY "Admins can manage students" ON public.students
  FOR ALL USING (public.get_current_user_role() = 'ADMIN');

-- RLS policies for parent_student_relationships
CREATE POLICY "Parents can view their relationships" ON public.parent_student_relationships
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM public.profiles p 
      WHERE p.id = parent_profile_id AND p.user_id = auth.uid()
    )
  );

CREATE POLICY "Admins can manage relationships" ON public.parent_student_relationships
  FOR ALL USING (public.get_current_user_role() = 'ADMIN');

-- RLS policies for teacher_class_assignments
CREATE POLICY "Teachers can view their assignments" ON public.teacher_class_assignments
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM public.profiles p 
      WHERE p.id = teacher_profile_id AND p.user_id = auth.uid()
    )
  );

CREATE POLICY "Admins can manage teacher assignments" ON public.teacher_class_assignments
  FOR ALL USING (public.get_current_user_role() = 'ADMIN');

-- RLS policies for attendance
CREATE POLICY "Teachers can view attendance for their classes" ON public.attendance
  FOR SELECT USING (
    public.get_current_user_role() = 'TEACHER' AND
    EXISTS (
      SELECT 1 FROM public.teacher_class_assignments tca
      JOIN public.profiles p ON p.id = tca.teacher_profile_id
      WHERE p.user_id = auth.uid() 
      AND tca.class_id = attendance.class_id 
      AND tca.section_id = attendance.section_id
    )
  );

CREATE POLICY "Teachers can mark attendance for their classes" ON public.attendance
  FOR INSERT WITH CHECK (
    public.get_current_user_role() = 'TEACHER' AND
    EXISTS (
      SELECT 1 FROM public.teacher_class_assignments tca
      JOIN public.profiles p ON p.id = tca.teacher_profile_id
      WHERE p.user_id = auth.uid() 
      AND tca.class_id = attendance.class_id 
      AND tca.section_id = attendance.section_id
    )
  );

CREATE POLICY "Parents can view their ward attendance" ON public.attendance
  FOR SELECT USING (
    public.get_current_user_role() = 'PARENT' AND
    EXISTS (
      SELECT 1 FROM public.parent_student_relationships psr
      JOIN public.profiles p ON p.id = psr.parent_profile_id
      WHERE p.user_id = auth.uid() AND psr.student_id = attendance.student_id
    )
  );

CREATE POLICY "Admins can manage attendance" ON public.attendance
  FOR ALL USING (public.get_current_user_role() = 'ADMIN');

-- RLS policies for assessments
CREATE POLICY "Teachers can manage their assessments" ON public.assessments
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM public.profiles p 
      WHERE p.id = teacher_id AND p.user_id = auth.uid()
    )
  );

CREATE POLICY "Parents can view published assessments" ON public.assessments
  FOR SELECT USING (
    public.get_current_user_role() = 'PARENT' AND 
    is_published = true AND
    EXISTS (
      SELECT 1 FROM public.parent_student_relationships psr
      JOIN public.profiles p ON p.id = psr.parent_profile_id
      JOIN public.students s ON s.id = psr.student_id
      WHERE p.user_id = auth.uid() 
      AND s.class_id = assessments.class_id 
      AND s.section_id = assessments.section_id
    )
  );

CREATE POLICY "Admins can manage assessments" ON public.assessments
  FOR ALL USING (public.get_current_user_role() = 'ADMIN');

-- RLS policies for marks
CREATE POLICY "Teachers can manage marks for their assessments" ON public.marks
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM public.assessments a
      JOIN public.profiles p ON p.id = a.teacher_id
      WHERE a.id = marks.assessment_id AND p.user_id = auth.uid()
    )
  );

CREATE POLICY "Parents can view their ward marks" ON public.marks
  FOR SELECT USING (
    public.get_current_user_role() = 'PARENT' AND
    EXISTS (
      SELECT 1 FROM public.parent_student_relationships psr
      JOIN public.profiles p ON p.id = psr.parent_profile_id
      JOIN public.assessments a ON a.id = marks.assessment_id
      WHERE p.user_id = auth.uid() 
      AND psr.student_id = marks.student_id
      AND a.is_published = true
    )
  );

CREATE POLICY "Admins can manage marks" ON public.marks
  FOR ALL USING (public.get_current_user_role() = 'ADMIN');

-- RLS policies for homework
CREATE POLICY "Teachers can manage their homework" ON public.homework
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM public.profiles p 
      WHERE p.id = teacher_id AND p.user_id = auth.uid()
    )
  );

CREATE POLICY "Parents can view homework for their wards" ON public.homework
  FOR SELECT USING (
    public.get_current_user_role() = 'PARENT' AND
    EXISTS (
      SELECT 1 FROM public.parent_student_relationships psr
      JOIN public.profiles p ON p.id = psr.parent_profile_id
      JOIN public.students s ON s.id = psr.student_id
      WHERE p.user_id = auth.uid() 
      AND s.class_id = homework.class_id 
      AND s.section_id = homework.section_id
    )
  );

CREATE POLICY "Admins can manage homework" ON public.homework
  FOR ALL USING (public.get_current_user_role() = 'ADMIN');

-- RLS policies for homework_submissions
CREATE POLICY "Parents can manage their ward submissions" ON public.homework_submissions
  FOR ALL USING (
    public.get_current_user_role() = 'PARENT' AND
    EXISTS (
      SELECT 1 FROM public.parent_student_relationships psr
      JOIN public.profiles p ON p.id = psr.parent_profile_id
      WHERE p.user_id = auth.uid() AND psr.student_id = homework_submissions.student_id
    )
  );

CREATE POLICY "Teachers can view submissions for their homework" ON public.homework_submissions
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM public.homework h
      JOIN public.profiles p ON p.id = h.teacher_id
      WHERE h.id = homework_submissions.homework_id AND p.user_id = auth.uid()
    )
  );

CREATE POLICY "Admins can manage homework submissions" ON public.homework_submissions
  FOR ALL USING (public.get_current_user_role() = 'ADMIN');

-- RLS policies for announcements
CREATE POLICY "Users can view announcements targeted to them" ON public.announcements
  FOR SELECT USING (
    school_id = public.get_current_user_school_id() AND
    (target_role IS NULL OR target_role = public.get_current_user_role()::public.user_role)
  );

CREATE POLICY "Teachers and Admins can create announcements" ON public.announcements
  FOR INSERT WITH CHECK (
    public.get_current_user_role() IN ('TEACHER', 'ADMIN') AND
    EXISTS (
      SELECT 1 FROM public.profiles p 
      WHERE p.id = author_id AND p.user_id = auth.uid()
    )
  );

CREATE POLICY "Admins can manage announcements" ON public.announcements
  FOR ALL USING (public.get_current_user_role() = 'ADMIN');

-- RLS policies for materials
CREATE POLICY "Users can view materials in their school" ON public.materials
  FOR SELECT USING (school_id = public.get_current_user_school_id());

CREATE POLICY "Teachers and Admins can upload materials" ON public.materials
  FOR INSERT WITH CHECK (
    public.get_current_user_role() IN ('TEACHER', 'ADMIN') AND
    EXISTS (
      SELECT 1 FROM public.profiles p 
      WHERE p.id = uploaded_by AND p.user_id = auth.uid()
    )
  );

CREATE POLICY "Admins can manage materials" ON public.materials
  FOR ALL USING (public.get_current_user_role() = 'ADMIN');

-- RLS policies for appointments
CREATE POLICY "Users can view their appointments" ON public.appointments
  FOR SELECT USING (
    school_id = public.get_current_user_school_id() AND
    (EXISTS (
      SELECT 1 FROM public.profiles p 
      WHERE p.user_id = auth.uid() AND (p.id = requester_id OR p.id = teacher_id)
    ))
  );

CREATE POLICY "Users can create appointments" ON public.appointments
  FOR INSERT WITH CHECK (
    EXISTS (
      SELECT 1 FROM public.profiles p 
      WHERE p.id = requester_id AND p.user_id = auth.uid()
    )
  );

CREATE POLICY "Admins can manage appointments" ON public.appointments
  FOR ALL USING (public.get_current_user_role() = 'ADMIN');

-- RLS policies for complaints
CREATE POLICY "Users can view their complaints" ON public.complaints
  FOR SELECT USING (
    school_id = public.get_current_user_school_id() AND
    (EXISTS (
      SELECT 1 FROM public.profiles p 
      WHERE p.user_id = auth.uid() AND (p.id = complainant_id OR p.id = assigned_to)
    ) OR public.get_current_user_role() = 'ADMIN')
  );

CREATE POLICY "Users can create complaints" ON public.complaints
  FOR INSERT WITH CHECK (
    EXISTS (
      SELECT 1 FROM public.profiles p 
      WHERE p.id = complainant_id AND p.user_id = auth.uid()
    )
  );

CREATE POLICY "Admins can manage complaints" ON public.complaints
  FOR ALL USING (public.get_current_user_role() = 'ADMIN');

-- RLS policies for fee_plans
CREATE POLICY "Users can view fee plans" ON public.fee_plans
  FOR SELECT USING (school_id = public.get_current_user_school_id());

CREATE POLICY "Admins can manage fee plans" ON public.fee_plans
  FOR ALL USING (public.get_current_user_role() = 'ADMIN');

-- RLS policies for invoices
CREATE POLICY "Parents can view invoices for their wards" ON public.invoices
  FOR SELECT USING (
    public.get_current_user_role() = 'PARENT' AND
    EXISTS (
      SELECT 1 FROM public.parent_student_relationships psr
      JOIN public.profiles p ON p.id = psr.parent_profile_id
      WHERE p.user_id = auth.uid() AND psr.student_id = invoices.student_id
    )
  );

CREATE POLICY "Admins can manage invoices" ON public.invoices
  FOR ALL USING (public.get_current_user_role() = 'ADMIN');

-- RLS policies for notifications
CREATE POLICY "Users can view their notifications" ON public.notifications
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM public.profiles p 
      WHERE p.id = recipient_id AND p.user_id = auth.uid()
    )
  );

CREATE POLICY "Users can update their notifications" ON public.notifications
  FOR UPDATE USING (
    EXISTS (
      SELECT 1 FROM public.profiles p 
      WHERE p.id = recipient_id AND p.user_id = auth.uid()
    )
  );