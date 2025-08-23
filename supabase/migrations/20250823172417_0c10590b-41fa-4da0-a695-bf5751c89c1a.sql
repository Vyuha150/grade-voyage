-- Update user roles for demo accounts
UPDATE public.profiles 
SET role = 'ADMIN', first_name = 'Admin', last_name = 'User'
WHERE email = 'admin@demo.com';

UPDATE public.profiles 
SET role = 'TEACHER', first_name = 'Sarah', last_name = 'Teacher'  
WHERE email = 'teacher@demo.com';

UPDATE public.profiles 
SET role = 'PARENT', first_name = 'John', last_name = 'Johnson'
WHERE email = 'parent@demo.com';

-- Link parent to their children
INSERT INTO public.parent_student_relationships (parent_profile_id, student_id, relationship_type, is_primary)
SELECT p.id, s.id, 'parent', true
FROM public.profiles p, public.students s 
WHERE p.email = 'parent@demo.com' 
AND s.student_id IN ('STU2024001', 'STU2024002');

-- Create teacher assignments  
INSERT INTO public.teacher_class_assignments (teacher_profile_id, class_id, section_id, subject_id, is_class_teacher)
SELECT p.id, c.id, sec.id, sub.id, true
FROM public.profiles p, public.classes c, public.sections sec, public.subjects sub
WHERE p.email = 'teacher@demo.com'
AND c.name = 'Grade 10' 
AND sec.name = 'A'
AND sub.name = 'Mathematics';

-- Add some sample homework and announcements
INSERT INTO public.homework (class_id, section_id, subject_id, teacher_id, title, description, due_date)
SELECT c.id, sec.id, sub.id, p.id, 
       'Algebra Practice Problems', 
       'Complete exercises 1-15 from Chapter 5', 
       CURRENT_DATE + INTERVAL '3 days'
FROM public.profiles p, public.classes c, public.sections sec, public.subjects sub
WHERE p.email = 'teacher@demo.com'
AND c.name = 'Grade 10' 
AND sec.name = 'A'
AND sub.name = 'Mathematics';

INSERT INTO public.announcements (school_id, author_id, title, content, target_role)
SELECT p.school_id, p.id, 
       'Welcome to the new School Management System!',
       'We are excited to introduce our new digital platform for better communication and academic management.',
       NULL
FROM public.profiles p
WHERE p.email = 'admin@demo.com';