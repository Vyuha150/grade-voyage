import { UserRole } from '@/hooks/useAuth';

// Route definitions with type safety
export const ROUTES = {
  // Public routes
  HOME: '/',
  LOGIN: '/login',
  
  // Admin portal
  ADMIN: {
    HOME: '/admin',
    USERS: '/admin/users',
    USER_DETAILS: (id: string) => `/admin/users/${id}`,
    CLASSES: '/admin/classes',
    SUBJECTS: '/admin/subjects',
    TIMETABLE: '/admin/timetable',
    ATTENDANCE: '/admin/attendance',
    ASSESSMENTS: '/admin/assessments',
    MARKS: '/admin/marks',
    HOMEWORK: '/admin/homework',
    MATERIALS: '/admin/materials',
    ANNOUNCEMENTS: '/admin/announcements',
    FEES: '/admin/fees',
    INVOICES: '/admin/fees/invoices',
    APPOINTMENTS: '/admin/appointments',
    COMPLAINTS: '/admin/complaints',
    ANALYTICS: '/admin/analytics',
    SETTINGS: '/admin/settings',
    AUDIT: '/admin/audit',
  },
  
  // Teacher portal
  TEACHER: {
    HOME: '/teacher',
    CLASSES: '/teacher/classes',
    ATTENDANCE: '/teacher/attendance',
    ASSESSMENTS: '/teacher/assessments',
    MARKS: '/teacher/marks',
    HOMEWORK: '/teacher/homework',
    MATERIALS: '/teacher/materials',
    ANNOUNCEMENTS: '/teacher/announcements',
    APPOINTMENTS: '/teacher/appointments',
    COMPLAINTS: '/teacher/complaints',
    MESSAGES: '/teacher/messages',
    CALENDAR: '/teacher/calendar',
  },
  
  // Parent portal  
  PARENT: {
    HOME: '/parent',
    ATTENDANCE: '/parent/attendance',
    MARKS: '/parent/marks',
    HOMEWORK: '/parent/homework-materials',
    ANNOUNCEMENTS: '/parent/announcements',
    APPOINTMENTS: '/parent/appointments',
    FEES: '/parent/fees',
    MESSAGES: '/parent/messages',
    CALENDAR: '/parent/calendar',
  },
} as const;

// Helper function to get portal home based on role
export const getPortalHome = (role: UserRole): string => {
  switch (role) {
    case 'ADMIN':
      return ROUTES.ADMIN.HOME;
    case 'TEACHER':
      return ROUTES.TEACHER.HOME;
    case 'PARENT':
      return ROUTES.PARENT.HOME;
    default:
      return ROUTES.HOME;
  }
};

// Helper function to check if route belongs to a portal
export const getRoutePortal = (path: string): UserRole | null => {
  if (path.startsWith('/admin')) return 'ADMIN';
  if (path.startsWith('/teacher')) return 'TEACHER';
  if (path.startsWith('/parent')) return 'PARENT';
  return null;
};

// Check if user can access a specific route
export const canAccessRoute = (path: string, userRole: UserRole): boolean => {
  const routePortal = getRoutePortal(path);
  
  // Public routes are accessible to all
  if (!routePortal) return true;
  
  // Portal routes are only accessible to users with matching role
  return routePortal === userRole;
};