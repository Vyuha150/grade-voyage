import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useAuth } from '@/hooks/useAuth';
import {
  Shield,
  GraduationCap,
  Users,
  BookOpen,
} from 'lucide-react';

export const DemoLogin = () => {
  const { demoLogin } = useAuth();

  const handleDemoLogin = async (role: 'ADMIN' | 'TEACHER' | 'PARENT') => {
    await demoLogin(role);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background to-muted p-4">
      <Card className="w-full max-w-2xl">
        <CardHeader className="text-center">
          <CardTitle className="text-3xl font-bold gradient-text flex items-center justify-center gap-2">
            <BookOpen className="h-8 w-8" />
            School Planner Demo
          </CardTitle>
          <CardDescription className="text-lg">
            Choose your role to explore the system
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="text-center text-sm text-muted-foreground mb-6">
            Click any button below to instantly access that portal with demo data
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Admin Login */}
            <Button
              onClick={() => handleDemoLogin('ADMIN')}
              variant="outline"
              className="h-auto p-6 flex flex-col items-center gap-4 hover:bg-primary/5 transition-colors"
            >
              <div className="w-16 h-16 bg-red-500/10 rounded-full flex items-center justify-center">
                <Shield className="h-8 w-8 text-red-600" />
              </div>
              <div className="text-center">
                <h3 className="font-semibold text-lg">Login as Admin</h3>
                <p className="text-sm text-muted-foreground mt-1">
                  Full system access & management
                </p>
                <Badge variant="secondary" className="mt-2">
                  Admin Portal
                </Badge>
              </div>
            </Button>

            {/* Teacher Login */}
            <Button
              onClick={() => handleDemoLogin('TEACHER')}
              variant="outline"
              className="h-auto p-6 flex flex-col items-center gap-4 hover:bg-primary/5 transition-colors"
            >
              <div className="w-16 h-16 bg-blue-500/10 rounded-full flex items-center justify-center">
                <GraduationCap className="h-8 w-8 text-blue-600" />
              </div>
              <div className="text-center">
                <h3 className="font-semibold text-lg">Login as Teacher</h3>
                <p className="text-sm text-muted-foreground mt-1">
                  Manage classes & students
                </p>
                <Badge variant="secondary" className="mt-2">
                  Teacher Portal
                </Badge>
              </div>
            </Button>

            {/* Parent Login */}
            <Button
              onClick={() => handleDemoLogin('PARENT')}
              variant="outline"
              className="h-auto p-6 flex flex-col items-center gap-4 hover:bg-primary/5 transition-colors"
            >
              <div className="w-16 h-16 bg-green-500/10 rounded-full flex items-center justify-center">
                <Users className="h-8 w-8 text-green-600" />
              </div>
              <div className="text-center">
                <h3 className="font-semibold text-lg">Login as Parent</h3>
                <p className="text-sm text-muted-foreground mt-1">
                  Monitor child's progress
                </p>
                <Badge variant="secondary" className="mt-2">
                  Parent Portal
                </Badge>
              </div>
            </Button>
          </div>

          <div className="text-center text-xs text-muted-foreground space-y-2 mt-8 p-4 bg-muted/50 rounded-lg">
            <p><strong>Demo Features:</strong></p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-2 text-left">
              <div>
                <strong>Admin:</strong> Manage users, classes, fees, analytics
              </div>
              <div>
                <strong>Teacher:</strong> Attendance, assignments, grades
              </div>
              <div>
                <strong>Parent:</strong> View progress, pay fees, appointments
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};