import { Button } from '@/components/ui/button';
import { useAuth } from '@/hooks/useAuth';
import { getPortalHome } from '@/utils/routes';
import { Shield, ArrowLeft } from 'lucide-react';

export const ForbiddenPage = () => {
  const { profile, signOut } = useAuth();

  const handleSwitchRole = () => {
    signOut();
  };

  const handleGoHome = () => {
    if (profile) {
      window.location.href = getPortalHome(profile.role);
    } else {
      window.location.href = '/';
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="text-center space-y-6 max-w-md mx-auto p-6">
        <div className="w-20 h-20 mx-auto bg-red-100 rounded-full flex items-center justify-center">
          <Shield className="w-10 h-10 text-red-600" />
        </div>
        
        <div className="space-y-2">
          <h1 className="text-3xl font-bold text-foreground">Access Denied</h1>
          <p className="text-muted-foreground">
            You don't have permission to access this page. This area is restricted to specific user roles.
          </p>
        </div>

        <div className="space-y-3">
          <Button onClick={handleGoHome} className="w-full">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Go to My Portal
          </Button>
          
          <Button variant="outline" onClick={handleSwitchRole} className="w-full">
            Switch User Role
          </Button>
        </div>

        <p className="text-xs text-muted-foreground">
          If you believe this is an error, please contact your administrator.
        </p>
      </div>
    </div>
  );
};