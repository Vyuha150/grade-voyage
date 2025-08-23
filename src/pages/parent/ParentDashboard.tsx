import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import {
  User,
  ClipboardCheck,
  GraduationCap,
  FileText,
  DollarSign,
  Calendar,
  MessageSquare,
  Bell,
  TrendingUp,
  TrendingDown,
} from 'lucide-react';

const ParentDashboard = () => {
  const [selectedChild, setSelectedChild] = useState('child1');

  // Mock data for multiple children
  const children = [
    {
      id: 'child1',
      name: 'Emma Johnson',
      class: 'Grade 10-A',
      rollNo: '2024001',
    },
    {
      id: 'child2',
      name: 'Liam Johnson',
      class: 'Grade 8-B',
      rollNo: '2024002',
    },
  ];

  const currentChild = children.find(child => child.id === selectedChild) || children[0];

  const childStats = [
    {
      title: 'Attendance Rate',
      value: '94.5%',
      change: '+2%',
      trend: 'up',
      icon: ClipboardCheck,
      color: 'text-green-600',
    },
    {
      title: 'Average Marks',
      value: '87.2%',
      change: '+5%',
      trend: 'up',
      icon: GraduationCap,
      color: 'text-blue-600',
    },
    {
      title: 'Pending Homework',
      value: '3',
      change: '-2',
      trend: 'up',
      icon: FileText,
      color: 'text-orange-600',
    },
    {
      title: 'Fee Balance',
      value: '$450',
      change: 'Due Soon',
      trend: 'neutral',
      icon: DollarSign,
      color: 'text-red-600',
    },
  ];

  const recentActivities = [
    {
      id: 1,
      title: 'Math Assignment Submitted',
      description: 'Algebra homework submitted on time',
      time: '2 hours ago',
      type: 'homework',
      status: 'completed',
    },
    {
      id: 2,
      title: 'Physics Test Result',
      description: 'Scored 92% in Physics monthly test',
      time: '1 day ago',
      type: 'assessment',
      status: 'excellent',
    },
    {
      id: 3,
      title: 'Absence Recorded',
      description: 'Absent from school due to illness',
      time: '3 days ago',
      type: 'attendance',
      status: 'excused',
    },
  ];

  const upcomingEvents = [
    {
      id: 1,
      title: 'Parent-Teacher Meeting',
      date: 'March 15, 2024',
      time: '10:00 AM',
      type: 'meeting',
    },
    {
      id: 2,
      title: 'Science Project Due',
      date: 'March 18, 2024',
      time: '11:59 PM',
      type: 'assignment',
    },
    {
      id: 3,
      title: 'Monthly Fee Payment',
      date: 'March 20, 2024',
      time: 'Due Date',
      type: 'payment',
    },
  ];

  const quickActions = [
    {
      title: 'Pay Fees',
      description: 'Pay monthly school fees online',
      icon: DollarSign,
      action: () => console.log('Navigate to fees'),
    },
    {
      title: 'Book Appointment',
      description: 'Schedule meeting with teacher',
      icon: Calendar,
      action: () => console.log('Navigate to appointments'),
    },
    {
      title: 'Send Message',
      description: 'Contact class teacher',
      icon: MessageSquare,
      action: () => console.log('Navigate to messages'),
    },
  ];

  return (
    <div className="space-y-8">
      {/* Header with Child Selector */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold gradient-text">Parent Dashboard</h1>
          <p className="text-muted-foreground mt-1">
            Monitor your child's academic progress and school activities
          </p>
        </div>
        
        {children.length > 1 && (
          <div className="flex items-center gap-3">
            <label className="text-sm font-medium">Select Child:</label>
            <Select value={selectedChild} onValueChange={setSelectedChild}>
              <SelectTrigger className="w-48">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {children.map((child) => (
                  <SelectItem key={child.id} value={child.id}>
                    {child.name} - {child.class}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        )}
      </div>

      {/* Child Info Card */}
      <Card className="bg-gradient-to-r from-primary/10 to-secondary/10 border-primary/20">
        <CardContent className="flex items-center gap-4 pt-6">
          <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center text-primary-foreground text-xl font-bold">
            {currentChild.name.split(' ').map(n => n[0]).join('')}
          </div>
          <div>
            <h2 className="text-xl font-bold">{currentChild.name}</h2>
            <p className="text-muted-foreground">
              Class: {currentChild.class} • Roll No: {currentChild.rollNo}
            </p>
            <Badge className="mt-2">Active Student</Badge>
          </div>
        </CardContent>
      </Card>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {childStats.map((stat) => {
          const Icon = stat.icon;
          const TrendIcon = stat.trend === 'up' ? TrendingUp : stat.trend === 'down' ? TrendingDown : null;
          
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
                <div className="flex items-center text-xs text-muted-foreground">
                  {TrendIcon && <TrendIcon className={`mr-1 h-3 w-3 ${
                    stat.trend === 'up' ? 'text-green-600' : 'text-red-600'
                  }`} />}
                  {stat.change}
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Activities */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Bell className="h-5 w-5" />
              Recent Activities
            </CardTitle>
            <CardDescription>
              Latest updates about {currentChild.name}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivities.map((activity) => (
                <div key={activity.id} className="flex items-start gap-3 pb-4 border-b border-border last:border-0">
                  <div className={`w-2 h-2 rounded-full mt-2 flex-shrink-0 ${
                    activity.status === 'completed' ? 'bg-green-500' :
                    activity.status === 'excellent' ? 'bg-blue-500' :
                    activity.status === 'excused' ? 'bg-orange-500' : 'bg-primary'
                  }`} />
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-sm">{activity.title}</p>
                    <p className="text-sm text-muted-foreground">{activity.description}</p>
                    <p className="text-xs text-muted-foreground mt-1">{activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
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
          <CardContent>
            <div className="space-y-4">
              {upcomingEvents.map((event) => (
                <div key={event.id} className="flex items-center justify-between p-3 rounded-lg border border-border hover:bg-muted/50 transition-colors">
                  <div>
                    <p className="font-medium text-sm">{event.title}</p>
                    <p className="text-sm text-muted-foreground">
                      {event.date} • {event.time}
                    </p>
                  </div>
                  <Badge 
                    variant={
                      event.type === 'payment' ? 'destructive' :
                      event.type === 'meeting' ? 'default' : 'secondary'
                    }
                    className="text-xs"
                  >
                    {event.type}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
          <CardDescription>
            Common tasks and shortcuts
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {quickActions.map((action) => {
              const Icon = action.icon;
              
              return (
                <Button 
                  key={action.title}
                  variant="outline" 
                  className="h-auto p-4 flex-col items-start gap-2"
                  onClick={action.action}
                >
                  <Icon className="h-5 w-5 text-primary" />
                  <div className="text-left">
                    <p className="font-medium text-sm">{action.title}</p>
                    <p className="text-xs text-muted-foreground">{action.description}</p>
                  </div>
                </Button>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ParentDashboard;