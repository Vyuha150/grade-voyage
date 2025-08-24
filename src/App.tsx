import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "@/hooks/useAuth";
import { ProtectedRoute } from "@/components/auth/ProtectedRoute";
import { PortalLayout } from "@/components/layout/PortalLayout";
import { DemoLogin } from "@/components/auth/DemoLogin";
import { getPortalHome, canAccessRoute } from "@/utils/routes";

// Portal Pages
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminUsersPage from "./pages/admin/AdminUsersPage";
import { AdminAssessmentsPage } from "./pages/admin/AdminAssessmentsPage";
import TeacherDashboard from "./pages/teacher/TeacherDashboard";
import TeacherHomeworkPage from "./pages/teacher/TeacherHomeworkPage";
import ParentDashboard from "./pages/parent/ParentDashboard";
import NotFound from "./pages/NotFound";

// Placeholder component for missing features
const PlaceholderPage = ({ title, description }: { title: string; description: string }) => (
  <div className="flex items-center justify-center min-h-[60vh]">
    <div className="text-center">
      <h1 className="text-2xl font-bold gradient-text mb-2">{title}</h1>
      <p className="text-muted-foreground">{description}</p>
      <p className="text-sm text-muted-foreground mt-4">This feature is coming soon!</p>
    </div>
  </div>
);

const queryClient = new QueryClient();

// Route Guard Component
const RouteGuard = ({ children, path }: { children: React.ReactNode; path: string }) => {
  const { profile } = useAuth();
  
  if (!profile) return children;
  
  // Check if user can access this route
  if (!canAccessRoute(path, profile.role)) {
    return <Navigate to={getPortalHome(profile.role)} replace />;
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

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<ProtectedRoute><PortalRouter /></ProtectedRoute>} />
            
            {/* Admin Portal */}
            <Route path="/admin" element={
              <RouteGuard path="/admin">
                <ProtectedRoute allowedRoles={['ADMIN']}>
                  <PortalLayout>
                    <AdminDashboard />
                  </PortalLayout>
                </ProtectedRoute>
              </RouteGuard>
            } />
            <Route path="/admin/users" element={
              <RouteGuard path="/admin/users">
                <ProtectedRoute allowedRoles={['ADMIN']}>
                  <PortalLayout>
                    <AdminUsersPage />
                  </PortalLayout>
                </ProtectedRoute>
              </RouteGuard>
            } />
            
            {/* Additional Admin Routes */}
            <Route path="/admin/classes" element={
              <RouteGuard path="/admin/classes">
                <ProtectedRoute allowedRoles={['ADMIN']}>
                  <PortalLayout>
                    <PlaceholderPage title="Classes Management" description="Manage classes, sections, and student assignments" />
                  </PortalLayout>
                </ProtectedRoute>
              </RouteGuard>
            } />
            <Route path="/admin/subjects" element={
              <RouteGuard path="/admin/subjects">
                <ProtectedRoute allowedRoles={['ADMIN']}>
                  <PortalLayout>
                    <PlaceholderPage title="Subjects Management" description="Manage subjects, curriculum, and teacher assignments" />
                  </PortalLayout>
                </ProtectedRoute>
              </RouteGuard>
            } />
            <Route path="/admin/timetable" element={
              <RouteGuard path="/admin/timetable">
                <ProtectedRoute allowedRoles={['ADMIN']}>
                  <PortalLayout>
                    <PlaceholderPage title="Timetable Management" description="Create and manage class schedules" />
                  </PortalLayout>
                </ProtectedRoute>
              </RouteGuard>
            } />
            <Route path="/admin/attendance" element={
              <RouteGuard path="/admin/attendance">
                <ProtectedRoute allowedRoles={['ADMIN']}>
                  <PortalLayout>
                    <PlaceholderPage title="Attendance Overview" description="Monitor school-wide attendance" />
                  </PortalLayout>
                </ProtectedRoute>
              </RouteGuard>
            } />
            <Route path="/admin/assessments" element={
              <RouteGuard path="/admin/assessments">
                <ProtectedRoute allowedRoles={['ADMIN']}>
                  <PortalLayout>
                    <AdminAssessmentsPage />
                  </PortalLayout>
                </ProtectedRoute>
              </RouteGuard>
            } />
            <Route path="/admin/homework" element={
              <RouteGuard path="/admin/homework">
                <ProtectedRoute allowedRoles={['ADMIN']}>
                  <PortalLayout>
                    <PlaceholderPage title="Homework Overview" description="Monitor homework assignments" />
                  </PortalLayout>
                </ProtectedRoute>
              </RouteGuard>
            } />
            <Route path="/admin/materials" element={
              <RouteGuard path="/admin/materials">
                <ProtectedRoute allowedRoles={['ADMIN']}>
                  <PortalLayout>
                    <PlaceholderPage title="Materials Management" description="Manage educational resources" />
                  </PortalLayout>
                </ProtectedRoute>
              </RouteGuard>
            } />
            <Route path="/admin/announcements" element={
              <RouteGuard path="/admin/announcements">
                <ProtectedRoute allowedRoles={['ADMIN']}>
                  <PortalLayout>
                    <PlaceholderPage title="Announcements" description="Create and manage announcements" />
                  </PortalLayout>
                </ProtectedRoute>
              </RouteGuard>
            } />
            <Route path="/admin/fees" element={
              <RouteGuard path="/admin/fees">
                <ProtectedRoute allowedRoles={['ADMIN']}>
                  <PortalLayout>
                    <PlaceholderPage title="Fees & Invoices" description="Manage financial records" />
                  </PortalLayout>
                </ProtectedRoute>
              </RouteGuard>
            } />
            <Route path="/admin/appointments" element={
              <RouteGuard path="/admin/appointments">
                <ProtectedRoute allowedRoles={['ADMIN']}>
                  <PortalLayout>
                    <PlaceholderPage title="Appointments Management" description="Oversee parent-teacher meetings" />
                  </PortalLayout>
                </ProtectedRoute>
              </RouteGuard>
            } />
            <Route path="/admin/complaints" element={
              <RouteGuard path="/admin/complaints">
                <ProtectedRoute allowedRoles={['ADMIN']}>
                  <PortalLayout>
                    <PlaceholderPage title="Complaints Management" description="Handle complaints and issues" />
                  </PortalLayout>
                </ProtectedRoute>
              </RouteGuard>
            } />
            <Route path="/admin/analytics" element={
              <RouteGuard path="/admin/analytics">
                <ProtectedRoute allowedRoles={['ADMIN']}>
                  <PortalLayout>
                    <PlaceholderPage title="Analytics Dashboard" description="View comprehensive analytics" />
                  </PortalLayout>
                </ProtectedRoute>
              </RouteGuard>
            } />
            <Route path="/admin/settings" element={
              <RouteGuard path="/admin/settings">
                <ProtectedRoute allowedRoles={['ADMIN']}>
                  <PortalLayout>
                    <PlaceholderPage title="System Settings" description="Configure school settings" />
                  </PortalLayout>
                </ProtectedRoute>
              </RouteGuard>
            } />
            
            {/* Teacher Portal */}
            <Route path="/teacher" element={
              <RouteGuard path="/teacher">
                <ProtectedRoute allowedRoles={['TEACHER']}>
                  <PortalLayout>
                    <TeacherDashboard />
                  </PortalLayout>
                </ProtectedRoute>
              </RouteGuard>
            } />
            <Route path="/teacher/homework" element={
              <RouteGuard path="/teacher/homework">
                <ProtectedRoute allowedRoles={['TEACHER']}>
                  <PortalLayout>
                    <TeacherHomeworkPage />
                  </PortalLayout>
                </ProtectedRoute>
              </RouteGuard>
            } />
            
            {/* Parent Portal */}
            <Route path="/parent" element={
              <RouteGuard path="/parent">
                <ProtectedRoute allowedRoles={['PARENT']}>
                  <PortalLayout>
                    <ParentDashboard />
                  </PortalLayout>
                </ProtectedRoute>
              </RouteGuard>
            } />
            
            {/* Catch-all */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
