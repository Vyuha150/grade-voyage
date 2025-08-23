import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Users,
  GraduationCap,
  ClipboardCheck,
  DollarSign,
  TrendingUp,
  TrendingDown,
  Plus,
  Calendar,
  AlertTriangle,
  MessageSquare,
} from 'lucide-react';

const AdminDashboard = () => {
  const stats = [
    {
      title: 'Total Students',
      value: '1,234',
      change: '+12%',
      trend: 'up',
      icon: Users,
      color: 'text-blue-600',
    },
    {
      title: 'Active Teachers',
      value: '89',
      change: '+3%',
      trend: 'up',
      icon: GraduationCap,
      color: 'text-green-600',
    },
    {
      title: 'Attendance Rate',
      value: '94.5%',
      change: '-2%',
      trend: 'down',
      icon: ClipboardCheck,
      color: 'text-orange-600',
    },
    {
      title: 'Monthly Revenue',
      value: '$48,592',
      change: '+18%',
      trend: 'up',
      icon: DollarSign,
      color: 'text-emerald-600',
    },
  ];

  const recentActivities = [
    {
      id: 1,
      title: 'New student enrollment',
      description: 'Sarah Johnson enrolled in Grade 10-A',
      time: '2 hours ago',
      type: 'enrollment',
    },
    {
      id: 2,
      title: 'Fee payment received',
      description: 'John Smith paid monthly fee of $450',
      time: '4 hours ago',
      type: 'payment',
    },
    {
      id: 3,
      title: 'Teacher assignment updated',
      description: 'Math teacher assigned to Grade 9-B',
      time: '6 hours ago',
      type: 'assignment',
    },
    {
      id: 4,
      title: 'Complaint raised',
      description: 'Parent raised complaint about cafeteria food',
      time: '8 hours ago',
      type: 'complaint',
    },
  ];

  const pendingActions = [
    {
      id: 1,
      title: 'Fee reminders to send',
      count: 23,
      priority: 'high',
    },
    {
      id: 2,
      title: 'Teacher evaluations pending',
      count: 12,
      priority: 'medium',
    },
    {
      id: 3,
      title: 'Student admissions to review',
      count: 8,
      priority: 'medium',
    },
  ];

  return (
    <div className="space-y-8">
      {/* Welcome Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold gradient-text">Admin Dashboard</h1>
          <p className="text-muted-foreground mt-1">
            Welcome back! Here's what's happening at your school today.
          </p>
        </div>
        <div className="flex gap-3">
          <Button size="sm" variant="outline" className="gap-2">
            <Calendar className="h-4 w-4" />
            Schedule Meeting
          </Button>
          <Button size="sm" className="gap-2">
            <Plus className="h-4 w-4" />
            Quick Add
          </Button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => {
          const Icon = stat.icon;
          const TrendIcon = stat.trend === 'up' ? TrendingUp : TrendingDown;
          
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
                  <TrendIcon className={`mr-1 h-3 w-3 ${
                    stat.trend === 'up' ? 'text-green-600' : 'text-red-600'
                  }`} />
                  {stat.change} from last month
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
              <MessageSquare className="h-5 w-5" />
              Recent Activities
            </CardTitle>
            <CardDescription>
              Latest updates and activities across the school
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivities.map((activity) => (
                <div key={activity.id} className="flex items-start gap-3 pb-4 border-b border-border last:border-0">
                  <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0" />
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

        {/* Pending Actions */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5" />
              Pending Actions
            </CardTitle>
            <CardDescription>
              Items requiring your attention
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {pendingActions.map((action) => (
                <div key={action.id} className="flex items-center justify-between p-3 rounded-lg border border-border hover:bg-muted/50 transition-colors">
                  <div>
                    <p className="font-medium text-sm">{action.title}</p>
                    <div className="flex items-center gap-2 mt-1">
                      <Badge 
                        variant={action.priority === 'high' ? 'destructive' : 'secondary'}
                        className="text-xs"
                      >
                        {action.priority}
                      </Badge>
                      <span className="text-sm text-muted-foreground">
                        {action.count} items
                      </span>
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
      </div>
    </div>
  );
};

export default AdminDashboard;