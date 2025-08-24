export type UserRole = 'ADMIN' | 'TEACHER' | 'STUDENT' | 'PARENT';

// Centralized route registry for type safety and link integrity
export const ROUTES = {
  // Public routes
  PUBLIC: {
    HOME: '/',
    LOGIN: '/login',
    LOGOUT: '/logout',
    FORGOT_PASSWORD: '/forgot-password',
    HELP: '/help',
    FORBIDDEN: '/403',
    NOT_FOUND: '/404'
  },
  
  // Admin portal routes
  ADMIN: {
    HOME: '/admin',
    USERS: '/admin/users',
    CLASSES: '/admin/classes',
    SUBJECTS: '/admin/subjects',
    TIMETABLE: '/admin/timetable',
    ATTENDANCE: '/admin/attendance',
    ASSESSMENTS: '/admin/assessments',
    HOMEWORK: '/admin/homework',
    MATERIALS: '/admin/materials',
    ANNOUNCEMENTS: '/admin/announcements',
    FEES: '/admin/fees',
    APPOINTMENTS: '/admin/appointments',
    COMPLAINTS: '/admin/complaints',
    ANALYTICS: '/admin/analytics',
    SETTINGS: '/admin/settings'
  },
  
  // Teacher portal routes
  TEACHER: {
    HOME: '/teacher',
    CLASSES: '/teacher/classes',
    ATTENDANCE: '/teacher/attendance',
    ASSESSMENTS: '/teacher/assessments',
    HOMEWORK: '/teacher/homework',
    MATERIALS: '/teacher/materials',
    ANNOUNCEMENTS: '/teacher/announcements',
    APPOINTMENTS: '/teacher/appointments',
    MESSAGES: '/teacher/messages',
    CALENDAR: '/teacher/calendar'
  },
  
  // Student portal routes
  STUDENT: {
    HOME: '/student',
    ATTENDANCE: '/student/attendance',
    MARKS: '/student/marks',
    HOMEWORK_MATERIALS: '/student/homework-materials',
    ANNOUNCEMENTS: '/student/announcements',
    APPOINTMENTS: '/student/appointments',
    FEES: '/student/fees',
    MESSAGES: '/student/messages',
    CALENDAR: '/student/calendar'
  }
} as const;

// Get portal home route based on user role
export const getPortalHome = (role: UserRole): string => {
  switch (role) {
    case 'ADMIN':
      return ROUTES.ADMIN.HOME;
    case 'TEACHER':
      return ROUTES.TEACHER.HOME;
    case 'STUDENT':
      return ROUTES.STUDENT.HOME;
    case 'PARENT':
      return ROUTES.STUDENT.HOME; // Parents use student portal for now
    default:
      return ROUTES.PUBLIC.HOME;
  }
};

// Determine which portal a path belongs to
export const getRoutePortal = (path: string): UserRole | null => {
  if (path.startsWith('/admin')) return 'ADMIN';
  if (path.startsWith('/teacher')) return 'TEACHER';
  if (path.startsWith('/student')) return 'STUDENT';
  return null; // Public route
};

// Check if a user can access a specific route
export const canAccessRoute = (path: string, userRole: UserRole): boolean => {
  const portal = getRoutePortal(path);
  
  // Public routes are accessible to everyone
  if (!portal) return true;
  
  // Users can only access their own portal
  // Parents can access student portal
  if (userRole === 'PARENT' && portal === 'STUDENT') return true;
  
  return portal === userRole;
};

// Get all routes for a specific portal (for navigation)
export const getPortalRoutes = (role: UserRole) => {
  switch (role) {
    case 'ADMIN':
      return Object.values(ROUTES.ADMIN);
    case 'TEACHER':
      return Object.values(ROUTES.TEACHER);
    case 'STUDENT':
    case 'PARENT':
      return Object.values(ROUTES.STUDENT);
    default:
      return Object.values(ROUTES.PUBLIC);
  }
};