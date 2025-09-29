import { ReactNode } from 'react';
import { useAuth, UserRole } from '@/hooks/useAuth';
import { DemoLogin } from './DemoLogin';
import { Loader2 } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Navigate } from 'react-router-dom';

interface ProtectedRouteProps {
  children: ReactNode;
  allowedRoles?: UserRole[];
}

export const ProtectedRoute = ({ children, allowedRoles }: ProtectedRouteProps) => {
  const { user, profile, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Card>
          <CardContent className="flex items-center space-x-2 p-6">
            <Loader2 className="h-4 w-4 animate-spin" />
            <span>Loading...</span>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (!user || !profile) {
    return <DemoLogin />;
  }

  // Check role access if specific roles are required
  if (allowedRoles && !allowedRoles.includes(profile.role)) {
    return <Navigate to="/403" replace />;
  }

  return <>{children}</>;
};