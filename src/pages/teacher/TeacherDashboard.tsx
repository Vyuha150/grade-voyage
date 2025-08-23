import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  BookOpen,
  ClipboardCheck,
  FileText,
  Calendar,
  Clock,
  Users,
  Plus,
  Bell,
} from 'lucide-react';

const TeacherDashboard = () => {
  const todaySchedule = [
    {
      id: 1,
      time: '09:00 AM',
      subject: 'Mathematics',
      class: '10-A',
      room: 'Room 205',
      status: 'upcoming',
    },
    {
      id: 2,
      time: '10:30 AM',
      subject: 'Physics',
      class: '11-B',
      room: 'Lab 3',
      status: 'current',
    },
    {
      id: 3,
      time: '02:00 PM',
      subject: 'Mathematics',
      class: '9-C',
      room: 'Room 205',
      status: 'upcoming',
    },
  ];

  const myClasses = [
    {
      id: 1,
      name: 'Grade 10-A Mathematics',
      students: 32,
      nextClass: 'Today 9:00 AM',
      attendance: 94,
      pendingHomework: 5,
    },
    {
      id: 2,
      name: 'Grade 11-B Physics',
      students: 28,
      nextClass: 'Today 10:30 AM',
      attendance: 89,
      pendingHomework: 12,
    },
    {
      id: 3,
      name: 'Grade 9-C Mathematics',
      students: 30,
      nextClass: 'Today 2:00 PM',
      attendance: 96,
      pendingHomework: 3,
    },
  ];

  const quickStats = [
    {
      title: 'Total Students',
      value: '90',
      icon: Users,
      color: 'text-blue-600',
    },
    {
      title: 'Classes Today',
      value: '6',
      icon: BookOpen,
      color: 'text-green-600',
    },
    {
      title: 'Pending Homework',
      value: '20',
      icon: FileText,
      color: 'text-orange-600',
    },
    {
      title: 'Avg Attendance',
      value: '93%',
      icon: ClipboardCheck,
      color: 'text-emerald-600',
    },
  ];

  const recentNotifications = [
    {
      id: 1,
      title: 'Assignment Due Reminder',
      message: 'Physics assignment for Grade 11-B due tomorrow',
      time: '1 hour ago',
      type: 'reminder',
    },
    {
      id: 2,
      title: 'Parent Meeting Request',
      message: 'Parent of John Smith requested a meeting',
      time: '3 hours ago',
      type: 'meeting',
    },
    {
      id: 3,
      title: 'Grade Submission Deadline',
      message: 'Mid-term grades due by Friday',
      time: '1 day ago',
      type: 'deadline',
    },
  ];

  return (
    <div className="space-y-8">
      {/* Welcome Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold gradient-text">Teacher Dashboard</h1>
          <p className="text-muted-foreground mt-1">
            Good morning! You have 6 classes scheduled for today.
          </p>
        </div>
        <div className="flex gap-3">
          <Button size="sm" variant="outline" className="gap-2">
            <Calendar className="h-4 w-4" />
            View Schedule
          </Button>
          <Button size="sm" className="gap-2">
            <Plus className="h-4 w-4" />
            Create Assignment
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
              </CardContent>
            </Card>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Today's Schedule */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="h-5 w-5" />
              Today's Schedule
            </CardTitle>
            <CardDescription>
              Your classes for today
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {todaySchedule.map((schedule) => (
                <div 
                  key={schedule.id} 
                  className={`flex items-center justify-between p-3 rounded-lg border transition-colors ${
                    schedule.status === 'current' 
                      ? 'bg-primary/10 border-primary' 
                      : 'border-border hover:bg-muted/50'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className="text-center">
                      <p className="text-sm font-medium">{schedule.time}</p>
                      {schedule.status === 'current' && (
                        <Badge variant="default" className="text-xs mt-1">
                          Now
                        </Badge>
                      )}
                    </div>
                    <div>
                      <p className="font-medium text-sm">{schedule.subject}</p>
                      <p className="text-sm text-muted-foreground">
                        {schedule.class} • {schedule.room}
                      </p>
                    </div>
                  </div>
                  <Button size="sm" variant="outline">
                    View
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* My Classes */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BookOpen className="h-5 w-5" />
              My Classes
            </CardTitle>
            <CardDescription>
              Overview of your assigned classes
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {myClasses.map((classInfo) => (
                <div key={classInfo.id} className="p-3 rounded-lg border border-border hover:bg-muted/50 transition-colors">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-medium text-sm">{classInfo.name}</h4>
                    <Badge variant="secondary" className="text-xs">
                      {classInfo.students} students
                    </Badge>
                  </div>
                  <div className="grid grid-cols-3 gap-2 text-xs text-muted-foreground">
                    <div>Next: {classInfo.nextClass}</div>
                    <div>Attendance: {classInfo.attendance}%</div>
                    <div>Pending: {classInfo.pendingHomework}</div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Notifications */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Bell className="h-5 w-5" />
            Recent Notifications
          </CardTitle>
          <CardDescription>
            Important updates and reminders
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recentNotifications.map((notification) => (
              <div key={notification.id} className="flex items-start gap-3 pb-4 border-b border-border last:border-0">
                <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0" />
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-sm">{notification.title}</p>
                  <p className="text-sm text-muted-foreground">{notification.message}</p>
                  <p className="text-xs text-muted-foreground mt-1">{notification.time}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default TeacherDashboard;