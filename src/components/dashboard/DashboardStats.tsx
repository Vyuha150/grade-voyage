import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Users, 
  GraduationCap, 
  BookOpen, 
  TrendingUp,
  Clock,
  CheckCircle,
  AlertCircle,
  DollarSign
} from "lucide-react";

const stats = [
  {
    title: "Total Students",
    value: "1,234",
    change: "+12%",
    trend: "up",
    icon: Users,
    color: "text-primary",
    bgColor: "bg-primary/10"
  },
  {
    title: "Active Teachers",
    value: "89",
    change: "+3%",
    trend: "up",
    icon: GraduationCap,
    color: "text-secondary",
    bgColor: "bg-secondary/10"
  },
  {
    title: "Attendance Rate",
    value: "94.2%",
    change: "+2.1%",
    trend: "up",
    icon: CheckCircle,
    color: "text-success",
    bgColor: "bg-success/10"
  },
  {
    title: "Monthly Revenue",
    value: "$89,234",
    change: "+8.3%",
    trend: "up",
    icon: DollarSign,
    color: "text-warning",
    bgColor: "bg-warning/10"
  }
];

const recentActivities = [
  {
    id: 1,
    title: "Mathematics Assignment Due",
    description: "Grade 10A - Calculus Problems",
    time: "2 hours ago",
    type: "assignment",
    status: "pending"
  },
  {
    id: 2,
    title: "Parent-Teacher Meeting",
    description: "Science Department - Grade 9",
    time: "4 hours ago",
    type: "meeting",
    status: "completed"
  },
  {
    id: 3,
    title: "Fee Payment Reminder",
    description: "Monthly fees due for 23 students",
    time: "6 hours ago",
    type: "fee",
    status: "pending"
  },
  {
    id: 4,
    title: "New Student Enrollment",
    description: "John Smith - Grade 8B",
    time: "1 day ago",
    type: "enrollment",
    status: "completed"
  }
];

export function DashboardStats() {
  return (
    <div className="space-y-6">
      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <Card key={stat.title} className="dashboard-card hover:shadow-lg transition-all duration-300">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  {stat.title}
                </CardTitle>
                <div className={`p-2 rounded-lg ${stat.bgColor}`}>
                  <Icon className={`w-5 h-5 ${stat.color}`} />
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <div className="text-2xl font-bold text-foreground">
                    {stat.value}
                  </div>
                  <Badge 
                    variant="secondary" 
                    className={`
                      ${stat.trend === 'up' 
                        ? 'bg-success/10 text-success border-success/20' 
                        : 'bg-destructive/10 text-destructive border-destructive/20'
                      }
                    `}
                  >
                    <TrendingUp className="w-3 h-3 mr-1" />
                    {stat.change}
                  </Badge>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Recent Activities */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Activities List */}
        <Card className="dashboard-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="w-5 h-5 text-primary" />
              Recent Activities
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {recentActivities.map((activity) => (
              <div 
                key={activity.id}
                className="flex items-start gap-3 p-3 rounded-lg hover:bg-surface transition-colors duration-200"
              >
                <div className="flex-shrink-0">
                  {activity.type === 'assignment' && (
                    <div className="w-8 h-8 bg-accent-math/10 rounded-lg flex items-center justify-center">
                      <BookOpen className="w-4 h-4 text-accent-math" />
                    </div>
                  )}
                  {activity.type === 'meeting' && (
                    <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center">
                      <Users className="w-4 h-4 text-primary" />
                    </div>
                  )}
                  {activity.type === 'fee' && (
                    <div className="w-8 h-8 bg-warning/10 rounded-lg flex items-center justify-center">
                      <DollarSign className="w-4 h-4 text-warning" />
                    </div>
                  )}
                  {activity.type === 'enrollment' && (
                    <div className="w-8 h-8 bg-success/10 rounded-lg flex items-center justify-center">
                      <CheckCircle className="w-4 h-4 text-success" />
                    </div>
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <h4 className="text-sm font-medium text-foreground truncate">
                      {activity.title}
                    </h4>
                    <Badge 
                      variant="outline"
                      className={`ml-2 ${
                        activity.status === 'completed' 
                          ? 'status-active' 
                          : 'status-pending'
                      }`}
                    >
                      {activity.status}
                    </Badge>
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">
                    {activity.description}
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">
                    {activity.time}
                  </p>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <Card className="dashboard-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertCircle className="w-5 h-5 text-warning" />
              Quick Actions
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <button className="w-full p-4 text-left bg-gradient-primary text-white rounded-lg hover:opacity-90 transition-opacity">
              <div className="flex items-center gap-3">
                <BookOpen className="w-5 h-5" />
                <div>
                  <h4 className="font-medium">Create Assignment</h4>
                  <p className="text-sm opacity-90">Add new assignment for students</p>
                </div>
              </div>
            </button>
            
            <button className="w-full p-4 text-left bg-gradient-secondary text-white rounded-lg hover:opacity-90 transition-opacity">
              <div className="flex items-center gap-3">
                <Users className="w-5 h-5" />
                <div>
                  <h4 className="font-medium">Schedule Meeting</h4>
                  <p className="text-sm opacity-90">Arrange parent-teacher meeting</p>
                </div>
              </div>
            </button>
            
            <button className="w-full p-4 text-left border border-card-border rounded-lg hover:bg-surface transition-colors">
              <div className="flex items-center gap-3">
                <CheckCircle className="w-5 h-5 text-success" />
                <div>
                  <h4 className="font-medium text-foreground">Mark Attendance</h4>
                  <p className="text-sm text-muted-foreground">Take today's attendance</p>
                </div>
              </div>
            </button>
            
            <button className="w-full p-4 text-left border border-card-border rounded-lg hover:bg-surface transition-colors">
              <div className="flex items-center gap-3">
                <DollarSign className="w-5 h-5 text-warning" />
                <div>
                  <h4 className="font-medium text-foreground">Generate Invoice</h4>
                  <p className="text-sm text-muted-foreground">Create fee payment invoice</p>
                </div>
              </div>
            </button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}