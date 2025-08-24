import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { useAuth } from '@/hooks/useAuth';
import {
  BookOpen,
  Calendar,
  CheckCircle2,
  Clock,
  GraduationCap,
  TrendingUp,
  User,
  Bell,
  FileText,
  CreditCard
} from 'lucide-react';

const StudentDashboard = () => {
  const { profile } = useAuth();

  const dashboardStats = [
    {
      title: 'Overall Grade',
      value: '85.2%',
      change: '+2.1%',
      icon: GraduationCap,
      color: 'text-green-600'
    },
    {
      title: 'Assignments',
      value: '12/15',
      change: 'Due Soon: 3',
      icon: BookOpen,
      color: 'text-blue-600'
    },
    {
      title: 'Attendance',
      value: '94%',
      change: 'This Month',
      icon: CheckCircle2,
      color: 'text-emerald-600'
    },
    {
      title: 'Pending Fees',
      value: '$245',
      change: 'Due: March 15',
      icon: CreditCard,
      color: 'text-orange-600'
    }
  ];

  const recentAssignments = [
    { subject: 'Mathematics', title: 'Algebra Quiz', dueDate: '2024-01-15', status: 'pending' },
    { subject: 'English', title: 'Essay on Literature', dueDate: '2024-01-18', status: 'completed' },
    { subject: 'Science', title: 'Lab Report', dueDate: '2024-01-20', status: 'pending' },
    { subject: 'History', title: 'World War II Project', dueDate: '2024-01-25', status: 'in-progress' }
  ];

  const upcomingEvents = [
    { title: 'Math Test', date: '2024-01-16', time: '10:00 AM' },
    { title: 'Science Fair', date: '2024-01-22', time: '2:00 PM' },
    { title: 'Parent-Teacher Meeting', date: '2024-01-28', time: '4:00 PM' }
  ];

  return (
    <div className="space-y-6" data-testid="page-ready">
      {/* Welcome Section */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold gradient-text">
            Welcome back, {profile?.first_name}!
          </h1>
          <p className="text-muted-foreground mt-1">
            Here's your academic overview for today
          </p>
        </div>
        <Button className="w-fit">
          <Calendar className="h-4 w-4 mr-2" />
          View Full Schedule
        </Button>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {dashboardStats.map((stat, index) => (
          <Card key={index} className="relative overflow-hidden">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
              <stat.icon className={`h-4 w-4 ${stat.color}`} />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className="text-xs text-muted-foreground">{stat.change}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Assignments */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5" />
              Recent Assignments
            </CardTitle>
            <CardDescription>
              Track your homework and project progress
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {recentAssignments.map((assignment, index) => (
              <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                <div className="flex-1">
                  <h4 className="font-medium">{assignment.title}</h4>
                  <p className="text-sm text-muted-foreground">{assignment.subject}</p>
                  <p className="text-xs text-muted-foreground">Due: {assignment.dueDate}</p>
                </div>
                <Badge 
                  variant={
                    assignment.status === 'completed' ? 'default' : 
                    assignment.status === 'pending' ? 'destructive' : 
                    'secondary'
                  }
                >
                  {assignment.status}
                </Badge>
              </div>
            ))}
            <Button variant="outline" className="w-full">
              View All Assignments
            </Button>
          </CardContent>
        </Card>

        {/* Upcoming Events */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="h-5 w-5" />
              Upcoming Events
            </CardTitle>
            <CardDescription>
              Important dates and deadlines
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {upcomingEvents.map((event, index) => (
              <div key={index} className="flex items-center gap-3 p-3 border rounded-lg">
                <div className="w-2 h-2 bg-primary rounded-full"></div>
                <div className="flex-1">
                  <h4 className="font-medium">{event.title}</h4>
                  <p className="text-sm text-muted-foreground">{event.date} at {event.time}</p>
                </div>
                <Clock className="h-4 w-4 text-muted-foreground" />
              </div>
            ))}
            <Button variant="outline" className="w-full">
              <Calendar className="h-4 w-4 mr-2" />
              View Calendar
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Academic Progress */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5" />
              Academic Progress
            </CardTitle>
            <CardDescription>
              Your performance across subjects this semester
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {[
              { subject: 'Mathematics', grade: 88, progress: 88 },
              { subject: 'English', grade: 92, progress: 92 },
              { subject: 'Science', grade: 79, progress: 79 },
              { subject: 'History', grade: 85, progress: 85 },
              { subject: 'Art', grade: 95, progress: 95 }
            ].map((subject, index) => (
              <div key={index} className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium">{subject.subject}</span>
                  <span className="text-sm text-muted-foreground">{subject.grade}%</span>
                </div>
                <Progress value={subject.progress} className="h-2" />
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <User className="h-5 w-5" />
              Quick Actions
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <Button variant="outline" className="w-full justify-start">
              <BookOpen className="h-4 w-4 mr-2" />
              Submit Assignment
            </Button>
            <Button variant="outline" className="w-full justify-start">
              <Calendar className="h-4 w-4 mr-2" />
              Book Appointment
            </Button>
            <Button variant="outline" className="w-full justify-start">
              <CreditCard className="h-4 w-4 mr-2" />
              Pay Fees
            </Button>
            <Button variant="outline" className="w-full justify-start">
              <Bell className="h-4 w-4 mr-2" />
              View Announcements
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default StudentDashboard;