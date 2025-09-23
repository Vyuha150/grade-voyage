-- Drop the overly permissive policy that allows all school users to view all students
DROP POLICY IF EXISTS "Users can view students in their school" ON public.students;

-- Create more restrictive policies for student data access

-- Teachers can only view students in their assigned classes
CREATE POLICY "Teachers can view students in their assigned classes" 
ON public.students 
FOR SELECT 
USING (
  (get_current_user_role() = 'TEACHER'::text) AND 
  EXISTS (
    SELECT 1 
    FROM teacher_class_assignments tca
    JOIN profiles p ON p.id = tca.teacher_profile_id
    WHERE p.user_id = auth.uid() 
    AND tca.class_id = students.class_id 
    AND tca.section_id = students.section_id
  )
);

-- Create a more secure function to check if a user is a class teacher for a student
CREATE OR REPLACE FUNCTION public.is_class_teacher_for_student(student_uuid uuid)
RETURNS boolean
LANGUAGE sql
STABLE SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1 
    FROM teacher_class_assignments tca
    JOIN profiles p ON p.id = tca.teacher_profile_id
    JOIN students s ON s.class_id = tca.class_id AND s.section_id = tca.section_id
    WHERE p.user_id = auth.uid() 
    AND s.id = student_uuid
    AND tca.is_class_teacher = true
  );
$$;

-- Class teachers can view additional details for their students (but still limited)
CREATE POLICY "Class teachers can view their students" 
ON public.students 
FOR SELECT 
USING (
  (get_current_user_role() = 'TEACHER'::text) AND 
  public.is_class_teacher_for_student(students.id)
);