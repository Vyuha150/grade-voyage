import { Button } from '@/components/ui/button';
import { useAuth } from '@/hooks/useAuth';
import { getPortalHome } from '@/utils/routes';
import { Search, Home } from 'lucide-react';

export const NotFoundPage = () => {
  const { profile } = useAuth();

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
        <div className="w-20 h-20 mx-auto bg-blue-100 rounded-full flex items-center justify-center">
          <Search className="w-10 h-10 text-blue-600" />
        </div>
        
        <div className="space-y-2">
          <h1 className="text-6xl font-bold text-foreground">404</h1>
          <h2 className="text-2xl font-semibold text-foreground">Page Not Found</h2>
          <p className="text-muted-foreground">
            The page you're looking for doesn't exist or may have been moved.
          </p>
        </div>

        <div className="space-y-3">
          <Button onClick={handleGoHome} className="w-full">
            <Home className="w-4 h-4 mr-2" />
            {profile ? 'Go to My Portal' : 'Go Home'}
          </Button>
        </div>

        <div className="text-sm text-muted-foreground">
          <p>Popular pages:</p>
          <div className="flex flex-wrap gap-2 mt-2 justify-center">
            <Button variant="link" size="sm" onClick={() => window.location.href = '/admin'}>
              Admin Portal
            </Button>
            <Button variant="link" size="sm" onClick={() => window.location.href = '/teacher'}>
              Teacher Portal
            </Button>
            <Button variant="link" size="sm" onClick={() => window.location.href = '/student'}>
              Student Portal
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};