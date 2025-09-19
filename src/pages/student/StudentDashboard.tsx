import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import {
  BookOpen,
  Calendar,
  ClipboardCheck,
  FileText,
  DollarSign,
  TrendingUp,
  Clock,
  AlertTriangle,
  CheckCircle,
  XCircle,
  Users,
  GraduationCap,
} from 'lucide-react';

const StudentDashboard = () => {
  const quickStats = [
    {
      title: 'Overall Attendance',
      value: '92%',
      target: 95,
      current: 92,
      icon: ClipboardCheck,
      color: 'text-blue-600',
      status: 'good',
    },
    {
      title: 'Current GPA',
      value: '3.8',
      target: 4.0,
      current: 3.8,
      icon: GraduationCap,
      color: 'text-green-600',
      status: 'excellent',
    },
    {
      title: 'Pending Assignments',
      value: '4',
      target: 0,
      current: 4,
      icon: FileText,
      color: 'text-orange-600',
      status: 'attention',
    },
    {
      title: 'Outstanding Fees',
      value: '$450',
      target: 0,
      current: 450,
      icon: DollarSign,
      color: 'text-red-600',
      status: 'urgent',
    },
  ];

  const upcomingClasses = [
    {
      id: 1,
      subject: 'Mathematics',
      time: '09:00 AM',
      teacher: 'Ms. Johnson',
      room: 'Room 205',
      status: 'next',
    },
    {
      id: 2,
      subject: 'Physics',
      time: '10:30 AM',
      teacher: 'Mr. Smith',
      room: 'Lab 3',
      status: 'upcoming',
    },
    {
      id: 3,
      subject: 'English',
      time: '02:00 PM',
      teacher: 'Mrs. Brown',
      room: 'Room 101',
      status: 'upcoming',
    },
  ];

  const recentGrades = [
    {
      id: 1,
      subject: 'Mathematics',
      assignment: 'Algebra Test',
      grade: 'A-',
      points: 92,
      maxPoints: 100,
      date: '2024-01-15',
    },
    {
      id: 2,
      subject: 'Physics',
      assignment: 'Lab Report #3',
      grade: 'B+',
      points: 87,
      maxPoints: 100,
      date: '2024-01-12',
    },
    {
      id: 3,
      subject: 'English',
      assignment: 'Essay Assignment',
      grade: 'A',
      points: 95,
      maxPoints: 100,
      date: '2024-01-10',
    },
  ];

  const pendingAssignments = [
    {
      id: 1,
      subject: 'Mathematics',
      title: 'Calculus Problem Set',
      dueDate: '2024-01-20',
      priority: 'high',
      progress: 60,
    },
    {
      id: 2,
      subject: 'Physics',
      title: 'Motion Analysis Report',
      dueDate: '2024-01-22',
      priority: 'medium',
      progress: 30,
    },
    {
      id: 3,
      subject: 'English',
      title: 'Shakespeare Analysis',
      dueDate: '2024-01-25',
      priority: 'low',
      progress: 0,
    },
  ];

  const announcements = [
    {
      id: 1,
      title: 'Mid-term Exam Schedule Released',
      message: 'Mid-term examination schedule has been published. Check your timetable.',
      date: '2024-01-15',
      priority: 'high',
    },
    {
      id: 2,
      title: 'Library Extended Hours',
      message: 'Library will remain open until 8 PM during exam period.',
      date: '2024-01-14',
      priority: 'medium',
    },
    {
      id: 3,
      title: 'Science Fair Registration',
      message: 'Registration for annual science fair is now open.',
      date: '2024-01-12',
      priority: 'low',
    },
  ];

  const getGradeColor = (grade: string) => {
    if (grade.startsWith('A')) return 'text-green-600 bg-green-50';
    if (grade.startsWith('B')) return 'text-blue-600 bg-blue-50';
    if (grade.startsWith('C')) return 'text-orange-600 bg-orange-50';
    return 'text-red-600 bg-red-50';
  };

  const getPriorityIcon = (priority: string) => {
    switch (priority) {
      case 'high':
        return <AlertTriangle className="h-4 w-4 text-red-500" />;
      case 'medium':
        return <Clock className="h-4 w-4 text-orange-500" />;
      default:
        return <CheckCircle className="h-4 w-4 text-green-500" />;
    }
  };

  return (
    <div className="space-y-8">
      {/* Welcome Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold gradient-text">Student Dashboard</h1>
          <p className="text-muted-foreground mt-1">
            Welcome back, John! Here's your academic overview for today.
          </p>
        </div>
        <div className="flex gap-3">
          <Button size="sm" variant="outline" className="gap-2">
            <Calendar className="h-4 w-4" />
            View Timetable
          </Button>
          <Button size="sm" className="gap-2">
            <BookOpen className="h-4 w-4" />
            Study Materials
          </Button>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {quickStats.map((stat) => {
          const Icon = stat.icon;
          
          return (
            <Card key={stat.title} className="hover:shadow-lg transition-shadow">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  {stat.title}
                </CardTitle>
                <Icon className={`h-4 w-4 ${stat.color}`} />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
                {stat.title === 'Overall Attendance' && (
                  <div className="mt-2">
                    <Progress value={stat.current} className="h-2" />
                    <p className="text-xs text-muted-foreground mt-1">
                      Target: {stat.target}%
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Today's Classes */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="h-5 w-5" />
              Today's Classes
            </CardTitle>
            <CardDescription>
              Your schedule for today
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {upcomingClasses.map((classInfo) => (
                <div 
                  key={classInfo.id} 
                  className={`flex items-center justify-between p-3 rounded-lg border transition-colors ${
                    classInfo.status === 'next' 
                      ? 'bg-primary/10 border-primary' 
                      : 'border-border hover:bg-muted/50'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className="text-center">
                      <p className="text-sm font-medium">{classInfo.time}</p>
                      {classInfo.status === 'next' && (
                        <Badge variant="default" className="text-xs mt-1">
                          Next
                        </Badge>
                      )}
                    </div>
                    <div>
                      <p className="font-medium text-sm">{classInfo.subject}</p>
                      <p className="text-sm text-muted-foreground">
                        {classInfo.teacher} • {classInfo.room}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Recent Grades */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5" />
              Recent Grades
            </CardTitle>
            <CardDescription>
              Your latest assignment results
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentGrades.map((grade) => (
                <div key={grade.id} className="flex items-center justify-between p-3 rounded-lg border border-border hover:bg-muted/50 transition-colors">
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-1">
                      <p className="font-medium text-sm">{grade.assignment}</p>
                      <Badge variant="secondary" className={`text-xs ${getGradeColor(grade.grade)}`}>
                        {grade.grade}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">{grade.subject}</p>
                    <div className="flex items-center gap-2 mt-1">
                      <Progress value={(grade.points / grade.maxPoints) * 100} className="h-1 flex-1" />
                      <span className="text-xs text-muted-foreground">
                        {grade.points}/{grade.maxPoints}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Pending Assignments */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5" />
              Pending Assignments
            </CardTitle>
            <CardDescription>
              Assignments due soon
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {pendingAssignments.map((assignment) => (
                <div key={assignment.id} className="p-3 rounded-lg border border-border hover:bg-muted/50 transition-colors">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-medium text-sm">{assignment.title}</h4>
                    {getPriorityIcon(assignment.priority)}
                  </div>
                  <div className="space-y-2">
                    <p className="text-sm text-muted-foreground">{assignment.subject}</p>
                    <p className="text-xs text-muted-foreground">Due: {assignment.dueDate}</p>
                    <div className="flex items-center gap-2">
                      <Progress value={assignment.progress} className="h-2 flex-1" />
                      <span className="text-xs text-muted-foreground">
                        {assignment.progress}%
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Announcements */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="h-5 w-5" />
              School Announcements
            </CardTitle>
            <CardDescription>
              Latest updates from school
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {announcements.map((announcement) => (
                <div key={announcement.id} className="flex items-start gap-3 pb-4 border-b border-border last:border-0">
                  <div className={`w-2 h-2 rounded-full mt-2 flex-shrink-0 ${
                    announcement.priority === 'high' ? 'bg-red-500' :
                    announcement.priority === 'medium' ? 'bg-orange-500' : 'bg-green-500'
                  }`} />
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-sm">{announcement.title}</p>
                    <p className="text-sm text-muted-foreground">{announcement.message}</p>
                    <p className="text-xs text-muted-foreground mt-1">{announcement.date}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default StudentDashboard;