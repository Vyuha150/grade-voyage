export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: 'ADMIN' | 'TEACHER' | 'STUDENT' | 'PARENT';
  status: 'active' | 'inactive' | 'pending';
  campus: string;
  phone?: string;
  avatar?: string;
  lastLogin?: Date;
  createdAt: Date;
  updatedAt: Date;
}

export interface Teacher extends User {
  role: 'TEACHER';
  subjects: string[];
  classes: string[];
  employeeId: string;
}

export interface Student extends User {
  role: 'STUDENT';
  studentId: string;
  class: string;
  section: string;
  parentId?: string;
  admissionDate: Date;
}

export interface Parent extends User {
  role: 'PARENT';
  children: string[]; // Student IDs
}

// Mock data
export const mockUsers: User[] = [
  {
    id: '1',
    email: 'admin@school.edu',
    firstName: 'Sarah',
    lastName: 'Wilson',
    role: 'ADMIN',
    status: 'active',
    campus: 'Main Campus',
    phone: '+1-555-0101',
    avatar: '/avatars/admin1.jpg',
    lastLogin: new Date('2024-01-22T09:30:00'),
    createdAt: new Date('2023-08-01'),
    updatedAt: new Date('2024-01-22')
  },
  {
    id: '2',
    email: 'john.teacher@school.edu',
    firstName: 'John',
    lastName: 'Smith',
    role: 'TEACHER',
    status: 'active',
    campus: 'Main Campus',
    phone: '+1-555-0102',
    avatar: '/avatars/teacher1.jpg',
    lastLogin: new Date('2024-01-22T08:15:00'),
    createdAt: new Date('2023-08-15'),
    updatedAt: new Date('2024-01-22')
  },
  {
    id: '3',
    email: 'jane.teacher@school.edu',
    firstName: 'Jane',
    lastName: 'Davis',
    role: 'TEACHER',
    status: 'active',
    campus: 'Main Campus',
    phone: '+1-555-0103',
    lastLogin: new Date('2024-01-21T16:45:00'),
    createdAt: new Date('2023-08-15'),
    updatedAt: new Date('2024-01-21')
  },
  {
    id: '4',
    email: 'alice.student@school.edu',
    firstName: 'Alice',
    lastName: 'Johnson',
    role: 'STUDENT',
    status: 'active',
    campus: 'Main Campus',
    lastLogin: new Date('2024-01-22T07:30:00'),
    createdAt: new Date('2023-09-01'),
    updatedAt: new Date('2024-01-22')
  },
  {
    id: '5',
    email: 'bob.student@school.edu',
    firstName: 'Bob',
    lastName: 'Brown',
    role: 'STUDENT',
    status: 'active',
    campus: 'Main Campus',
    lastLogin: new Date('2024-01-22T07:45:00'),
    createdAt: new Date('2023-09-01'),
    updatedAt: new Date('2024-01-22')
  },
  {
    id: '6',
    email: 'parent1@email.com',
    firstName: 'Robert',
    lastName: 'Johnson',
    role: 'PARENT',
    status: 'active',
    campus: 'Main Campus',
    phone: '+1-555-0106',
    lastLogin: new Date('2024-01-21T19:20:00'),
    createdAt: new Date('2023-09-01'),
    updatedAt: new Date('2024-01-21')
  }
];

export const mockTeachers: Teacher[] = [
  {
    ...mockUsers[1] as User,
    role: 'TEACHER',
    subjects: ['Mathematics', 'Physics'],
    classes: ['Grade 9A', 'Grade 10B'],
    employeeId: 'EMP001'
  } as Teacher,
  {
    ...mockUsers[2] as User,
    role: 'TEACHER',
    subjects: ['English', 'Literature'],
    classes: ['Grade 8A', 'Grade 9B'],
    employeeId: 'EMP002'
  } as Teacher
];

export const mockStudents: Student[] = [
  {
    ...mockUsers[3] as User,
    role: 'STUDENT',
    studentId: 'STU001',
    class: 'Grade 9',
    section: 'A',
    parentId: '6',
    admissionDate: new Date('2023-09-01')
  } as Student,
  {
    ...mockUsers[4] as User,
    role: 'STUDENT',
    studentId: 'STU002',
    class: 'Grade 8',
    section: 'B',
    admissionDate: new Date('2023-09-01')
  } as Student
];

export const mockParents: Parent[] = [
  {
    ...mockUsers[5] as User,
    role: 'PARENT',
    children: ['4'] // Alice Johnson
  } as Parent
];