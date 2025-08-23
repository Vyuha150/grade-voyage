import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "@/hooks/useAuth";
import { ProtectedRoute } from "@/components/auth/ProtectedRoute";
import { PortalLayout } from "@/components/layout/PortalLayout";
import { getPortalHome, canAccessRoute } from "@/utils/routes";

// Portal Pages
import AdminDashboard from "./pages/admin/AdminDashboard";
import TeacherDashboard from "./pages/teacher/TeacherDashboard";
import ParentDashboard from "./pages/parent/ParentDashboard";
import NotFound from "./pages/NotFound";

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

  return <div className="min-h-screen flex items-center justify-center">Please sign in</div>;
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
