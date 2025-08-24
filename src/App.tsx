import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { ProtectedRoute } from "@/components/auth/ProtectedRoute";
import { PortalLayout } from "@/components/layout/PortalLayout";
import { DemoLogin } from "@/components/auth/DemoLogin";
import { getPortalHome, canAccessRoute, ROUTES } from "@/utils/routes";

// Import all pages
import { LoginPage } from "./pages/public/LoginPage";
import { ForbiddenPage } from "./pages/public/ForbiddenPage";
import { NotFoundPage } from "./pages/public/NotFoundPage";

// Admin pages (using default imports)
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminUsersPage from "./pages/admin/AdminUsersPage";
import { AdminAssessmentsPage } from "./pages/admin/AdminAssessmentsPage";

// Teacher pages (using default imports)
import TeacherDashboard from "./pages/teacher/TeacherDashboard";
import TeacherHomeworkPage from "./pages/teacher/TeacherHomeworkPage";

// Route Guard Component
const RouteGuard = ({ children, path }: { children: React.ReactNode; path: string }) => {
  const { profile } = useAuth();
  
  if (!profile) return <>{children}</>;
  
  // Check if user can access this route
  if (!canAccessRoute(path, profile.role)) {
    return <Navigate to={ROUTES.PUBLIC.FORBIDDEN} replace />;
  }
  
  return <>{children}</>;
};

// Portal Router Component
const PortalRouter = () => {
  const { profile, loading } = useAuth();

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  // Redirect authenticated users to their portal
  if (profile) {
    return <Navigate to={getPortalHome(profile.role)} replace />;
  }

  return <DemoLogin />;
};

// Placeholder component for missing features
const PlaceholderPage = ({ title, description }: { title: string; description: string }) => (
  <div className="flex items-center justify-center min-h-[60vh]" data-testid="page-ready">
    <div className="text-center">
      <h1 className="text-2xl font-bold gradient-text mb-2">{title}</h1>
      <p className="text-muted-foreground">{description}</p>
      <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="p-4 border rounded-lg">
          <h3 className="font-semibold mb-2">Coming Features</h3>
          <ul className="text-sm text-muted-foreground">
            <li>• Interactive Dashboard</li>
            <li>• Data Tables</li>
            <li>• Analytics Charts</li>
          </ul>
        </div>
        <div className="p-4 border rounded-lg">
          <h3 className="font-semibold mb-2">Management Tools</h3>
          <ul className="text-sm text-muted-foreground">
            <li>• Create & Edit Forms</li>
            <li>• Bulk Operations</li>
            <li>• Export Functions</li>
          </ul>
        </div>
        <div className="p-4 border rounded-lg">
          <h3 className="font-semibold mb-2">Integrations</h3>
          <ul className="text-sm text-muted-foreground">
            <li>• Real-time Updates</li>
            <li>• Notifications</li>
            <li>• Mobile Sync</li>
          </ul>
        </div>
      </div>
    </div>
  </div>
);

const App = () => (
  <BrowserRouter>
    <Routes>
      {/* Public Routes */}
      <Route path={ROUTES.PUBLIC.HOME} element={<PortalRouter />} />
      <Route path={ROUTES.PUBLIC.LOGIN} element={<LoginPage />} />
      <Route path={ROUTES.PUBLIC.FORBIDDEN} element={<ForbiddenPage />} />
      <Route path={ROUTES.PUBLIC.NOT_FOUND} element={<NotFoundPage />} />
      
      {/* Admin Portal Routes */}
      <Route path={ROUTES.ADMIN.HOME} element={
        <RouteGuard path={ROUTES.ADMIN.HOME}>
          <ProtectedRoute allowedRoles={['ADMIN']}>
            <PortalLayout><AdminDashboard /></PortalLayout>
          </ProtectedRoute>
        </RouteGuard>
      } />
      <Route path={ROUTES.ADMIN.USERS} element={
        <RouteGuard path={ROUTES.ADMIN.USERS}>
          <ProtectedRoute allowedRoles={['ADMIN']}>
            <PortalLayout><AdminUsersPage /></PortalLayout>
          </ProtectedRoute>
        </RouteGuard>
      } />
      <Route path={ROUTES.ADMIN.ASSESSMENTS} element={
        <RouteGuard path={ROUTES.ADMIN.ASSESSMENTS}>
          <ProtectedRoute allowedRoles={['ADMIN']}>
            <PortalLayout><AdminAssessmentsPage /></PortalLayout>
          </ProtectedRoute>
        </RouteGuard>
      } />
      <Route path={ROUTES.ADMIN.CLASSES} element={
        <RouteGuard path={ROUTES.ADMIN.CLASSES}>
          <ProtectedRoute allowedRoles={['ADMIN']}>
            <PortalLayout><PlaceholderPage title="Classes Management" description="Manage classes, sections, and student assignments" /></PortalLayout>
          </ProtectedRoute>
        </RouteGuard>
      } />
      <Route path={ROUTES.ADMIN.SUBJECTS} element={
        <RouteGuard path={ROUTES.ADMIN.SUBJECTS}>
          <ProtectedRoute allowedRoles={['ADMIN']}>
            <PortalLayout><PlaceholderPage title="Subjects Management" description="Manage subjects, curriculum, and teacher assignments" /></PortalLayout>
          </ProtectedRoute>
        </RouteGuard>
      } />
      <Route path={ROUTES.ADMIN.TIMETABLE} element={
        <RouteGuard path={ROUTES.ADMIN.TIMETABLE}>
          <ProtectedRoute allowedRoles={['ADMIN']}>
            <PortalLayout><PlaceholderPage title="Timetable Management" description="Create and manage class schedules" /></PortalLayout>
          </ProtectedRoute>
        </RouteGuard>
      } />
      <Route path={ROUTES.ADMIN.ATTENDANCE} element={
        <RouteGuard path={ROUTES.ADMIN.ATTENDANCE}>
          <ProtectedRoute allowedRoles={['ADMIN']}>
            <PortalLayout><PlaceholderPage title="Attendance Overview" description="Monitor school-wide attendance" /></PortalLayout>
          </ProtectedRoute>
        </RouteGuard>
      } />
      <Route path={ROUTES.ADMIN.HOMEWORK} element={
        <RouteGuard path={ROUTES.ADMIN.HOMEWORK}>
          <ProtectedRoute allowedRoles={['ADMIN']}>
            <PortalLayout><PlaceholderPage title="Homework Overview" description="Monitor homework assignments" /></PortalLayout>
          </ProtectedRoute>
        </RouteGuard>
      } />
      <Route path={ROUTES.ADMIN.MATERIALS} element={
        <RouteGuard path={ROUTES.ADMIN.MATERIALS}>
          <ProtectedRoute allowedRoles={['ADMIN']}>
            <PortalLayout><PlaceholderPage title="Materials Management" description="Manage educational resources" /></PortalLayout>
          </ProtectedRoute>
        </RouteGuard>
      } />
      <Route path={ROUTES.ADMIN.ANNOUNCEMENTS} element={
        <RouteGuard path={ROUTES.ADMIN.ANNOUNCEMENTS}>
          <ProtectedRoute allowedRoles={['ADMIN']}>
            <PortalLayout><PlaceholderPage title="Announcements" description="Create and manage announcements" /></PortalLayout>
          </ProtectedRoute>
        </RouteGuard>
      } />
      <Route path={ROUTES.ADMIN.FEES} element={
        <RouteGuard path={ROUTES.ADMIN.FEES}>
          <ProtectedRoute allowedRoles={['ADMIN']}>
            <PortalLayout><PlaceholderPage title="Fees & Invoices" description="Manage financial records" /></PortalLayout>
          </ProtectedRoute>
        </RouteGuard>
      } />
      <Route path={ROUTES.ADMIN.APPOINTMENTS} element={
        <RouteGuard path={ROUTES.ADMIN.APPOINTMENTS}>
          <ProtectedRoute allowedRoles={['ADMIN']}>
            <PortalLayout><PlaceholderPage title="Appointments Management" description="Oversee parent-teacher meetings" /></PortalLayout>
          </ProtectedRoute>
        </RouteGuard>
      } />
      <Route path={ROUTES.ADMIN.COMPLAINTS} element={
        <RouteGuard path={ROUTES.ADMIN.COMPLAINTS}>
          <ProtectedRoute allowedRoles={['ADMIN']}>
            <PortalLayout><PlaceholderPage title="Complaints Management" description="Handle complaints and issues" /></PortalLayout>
          </ProtectedRoute>
        </RouteGuard>
      } />
      <Route path={ROUTES.ADMIN.ANALYTICS} element={
        <RouteGuard path={ROUTES.ADMIN.ANALYTICS}>
          <ProtectedRoute allowedRoles={['ADMIN']}>
            <PortalLayout><PlaceholderPage title="Analytics Dashboard" description="View comprehensive analytics" /></PortalLayout>
          </ProtectedRoute>
        </RouteGuard>
      } />
      <Route path={ROUTES.ADMIN.SETTINGS} element={
        <RouteGuard path={ROUTES.ADMIN.SETTINGS}>
          <ProtectedRoute allowedRoles={['ADMIN']}>
            <PortalLayout><PlaceholderPage title="System Settings" description="Configure school settings" /></PortalLayout>
          </ProtectedRoute>
        </RouteGuard>
      } />

      {/* Teacher Portal Routes */}
      <Route path={ROUTES.TEACHER.HOME} element={
        <RouteGuard path={ROUTES.TEACHER.HOME}>
          <ProtectedRoute allowedRoles={['TEACHER']}>
            <PortalLayout><TeacherDashboard /></PortalLayout>
          </ProtectedRoute>
        </RouteGuard>
      } />
      <Route path={ROUTES.TEACHER.HOMEWORK} element={
        <RouteGuard path={ROUTES.TEACHER.HOMEWORK}>
          <ProtectedRoute allowedRoles={['TEACHER']}>
            <PortalLayout><TeacherHomeworkPage /></PortalLayout>
          </ProtectedRoute>
        </RouteGuard>
      } />
      <Route path={ROUTES.TEACHER.CLASSES} element={
        <RouteGuard path={ROUTES.TEACHER.CLASSES}>
          <ProtectedRoute allowedRoles={['TEACHER']}>
            <PortalLayout><PlaceholderPage title="My Classes" description="Manage your assigned classes" /></PortalLayout>
          </ProtectedRoute>
        </RouteGuard>
      } />
      <Route path={ROUTES.TEACHER.ATTENDANCE} element={
        <RouteGuard path={ROUTES.TEACHER.ATTENDANCE}>
          <ProtectedRoute allowedRoles={['TEACHER']}>
            <PortalLayout><PlaceholderPage title="Attendance" description="Take and manage attendance" /></PortalLayout>
          </ProtectedRoute>
        </RouteGuard>
      } />
      <Route path={ROUTES.TEACHER.ASSESSMENTS} element={
        <RouteGuard path={ROUTES.TEACHER.ASSESSMENTS}>
          <ProtectedRoute allowedRoles={['TEACHER']}>
            <PortalLayout><PlaceholderPage title="Assessments" description="Create and grade assessments" /></PortalLayout>
          </ProtectedRoute>
        </RouteGuard>
      } />
      <Route path={ROUTES.TEACHER.MATERIALS} element={
        <RouteGuard path={ROUTES.TEACHER.MATERIALS}>
          <ProtectedRoute allowedRoles={['TEACHER']}>
            <PortalLayout><PlaceholderPage title="Materials" description="Manage teaching materials" /></PortalLayout>
          </ProtectedRoute>
        </RouteGuard>
      } />
      <Route path={ROUTES.TEACHER.ANNOUNCEMENTS} element={
        <RouteGuard path={ROUTES.TEACHER.ANNOUNCEMENTS}>
          <ProtectedRoute allowedRoles={['TEACHER']}>
            <PortalLayout><PlaceholderPage title="Announcements" description="Create class announcements" /></PortalLayout>
          </ProtectedRoute>
        </RouteGuard>
      } />
      <Route path={ROUTES.TEACHER.APPOINTMENTS} element={
        <RouteGuard path={ROUTES.TEACHER.APPOINTMENTS}>
          <ProtectedRoute allowedRoles={['TEACHER']}>
            <PortalLayout><PlaceholderPage title="Appointments" description="Manage parent meetings" /></PortalLayout>
          </ProtectedRoute>
        </RouteGuard>
      } />
      <Route path={ROUTES.TEACHER.MESSAGES} element={
        <RouteGuard path={ROUTES.TEACHER.MESSAGES}>
          <ProtectedRoute allowedRoles={['TEACHER']}>
            <PortalLayout><PlaceholderPage title="Messages" description="Communicate with parents and staff" /></PortalLayout>
          </ProtectedRoute>
        </RouteGuard>
      } />
      <Route path={ROUTES.TEACHER.CALENDAR} element={
        <RouteGuard path={ROUTES.TEACHER.CALENDAR}>
          <ProtectedRoute allowedRoles={['TEACHER']}>
            <PortalLayout><PlaceholderPage title="Calendar" description="View your teaching schedule" /></PortalLayout>
          </ProtectedRoute>
        </RouteGuard>
      } />

      {/* Student Portal Routes */}
      <Route path={ROUTES.STUDENT.HOME} element={
        <RouteGuard path={ROUTES.STUDENT.HOME}>
          <ProtectedRoute allowedRoles={['STUDENT', 'PARENT']}>
            <PortalLayout><PlaceholderPage title="Student Dashboard" description="Your academic overview" /></PortalLayout>
          </ProtectedRoute>
        </RouteGuard>
      } />
      <Route path={ROUTES.STUDENT.ATTENDANCE} element={
        <RouteGuard path={ROUTES.STUDENT.ATTENDANCE}>
          <ProtectedRoute allowedRoles={['STUDENT', 'PARENT']}>
            <PortalLayout><PlaceholderPage title="Attendance" description="View attendance records" /></PortalLayout>
          </ProtectedRoute>
        </RouteGuard>
      } />
      <Route path={ROUTES.STUDENT.MARKS} element={
        <RouteGuard path={ROUTES.STUDENT.MARKS}>
          <ProtectedRoute allowedRoles={['STUDENT', 'PARENT']}>
            <PortalLayout><PlaceholderPage title="Marks & Results" description="View grades and reports" /></PortalLayout>
          </ProtectedRoute>
        </RouteGuard>
      } />
      <Route path={ROUTES.STUDENT.HOMEWORK_MATERIALS} element={
        <RouteGuard path={ROUTES.STUDENT.HOMEWORK_MATERIALS}>
          <ProtectedRoute allowedRoles={['STUDENT', 'PARENT']}>
            <PortalLayout><PlaceholderPage title="Homework & Materials" description="Access assignments and resources" /></PortalLayout>
          </ProtectedRoute>
        </RouteGuard>
      } />
      <Route path={ROUTES.STUDENT.ANNOUNCEMENTS} element={
        <RouteGuard path={ROUTES.STUDENT.ANNOUNCEMENTS}>
          <ProtectedRoute allowedRoles={['STUDENT', 'PARENT']}>
            <PortalLayout><PlaceholderPage title="Announcements" description="School and class announcements" /></PortalLayout>
          </ProtectedRoute>
        </RouteGuard>
      } />
      <Route path={ROUTES.STUDENT.APPOINTMENTS} element={
        <RouteGuard path={ROUTES.STUDENT.APPOINTMENTS}>
          <ProtectedRoute allowedRoles={['STUDENT', 'PARENT']}>
            <PortalLayout><PlaceholderPage title="Appointments" description="Schedule meetings with teachers" /></PortalLayout>
          </ProtectedRoute>
        </RouteGuard>
      } />
      <Route path={ROUTES.STUDENT.FEES} element={
        <RouteGuard path={ROUTES.STUDENT.FEES}>
          <ProtectedRoute allowedRoles={['STUDENT', 'PARENT']}>
            <PortalLayout><PlaceholderPage title="Fees & Payments" description="Manage school fees and payments" /></PortalLayout>
          </ProtectedRoute>
        </RouteGuard>
      } />
      <Route path={ROUTES.STUDENT.MESSAGES} element={
        <RouteGuard path={ROUTES.STUDENT.MESSAGES}>
          <ProtectedRoute allowedRoles={['STUDENT', 'PARENT']}>
            <PortalLayout><PlaceholderPage title="Messages" description="Communicate with teachers" /></PortalLayout>
          </ProtectedRoute>
        </RouteGuard>
      } />
      <Route path={ROUTES.STUDENT.CALENDAR} element={
        <RouteGuard path={ROUTES.STUDENT.CALENDAR}>
          <ProtectedRoute allowedRoles={['STUDENT', 'PARENT']}>
            <PortalLayout><PlaceholderPage title="Calendar" description="View school calendar and events" /></PortalLayout>
          </ProtectedRoute>
        </RouteGuard>
      } />
      
      {/* Catch-all */}
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  </BrowserRouter>
);

export default App;