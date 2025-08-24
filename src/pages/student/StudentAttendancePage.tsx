import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Progress } from '@/components/ui/progress';
import {
  CheckCircle2,
  XCircle,
  Calendar as CalendarIcon,
  TrendingUp,
  Clock,
  AlertTriangle
} from 'lucide-react';
import { useState } from 'react';

const StudentAttendancePage = () => {
  const [date, setDate] = useState<Date | undefined>(new Date());

  const attendanceStats = {
    totalDays: 180,
    presentDays: 169,
    absentDays: 8,
    lateDays: 3,
    percentage: 93.9
  };

  const monthlyData = [
    { month: 'January', percentage: 95.2, present: 20, absent: 1 },
    { month: 'February', percentage: 91.7, present: 22, absent: 2 },
    { month: 'March', percentage: 94.4, present: 17, absent: 1 },
    { month: 'April', percentage: 92.3, present: 24, absent: 2 },
    { month: 'May', percentage: 96.0, present: 24, absent: 1 },
  ];

  const recentAttendance = [
    { date: '2024-01-15', status: 'present', time: '08:30 AM' },
    { date: '2024-01-14', status: 'present', time: '08:25 AM' },
    { date: '2024-01-13', status: 'absent', time: '-' },
    { date: '2024-01-12', status: 'present', time: '08:35 AM' },
    { date: '2024-01-11', status: 'late', time: '09:15 AM' },
    { date: '2024-01-10', status: 'present', time: '08:20 AM' },
    { date: '2024-01-09', status: 'present', time: '08:30 AM' },
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'present':
        return <Badge className="bg-green-500 hover:bg-green-600">Present</Badge>;
      case 'absent':
        return <Badge variant="destructive">Absent</Badge>;
      case 'late':
        return <Badge className="bg-yellow-500 hover:bg-yellow-600">Late</Badge>;
      default:
        return <Badge variant="secondary">Unknown</Badge>;
    }
  };

  return (
    <div className="space-y-6" data-testid="page-ready">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold gradient-text">Attendance Records</h1>
          <p className="text-muted-foreground mt-1">
            Track your attendance and punctuality records
          </p>
        </div>
        <Button>
          <CalendarIcon className="h-4 w-4 mr-2" />
          Export Report
        </Button>
      </div>

      {/* Overview Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Total Days</CardTitle>
            <CalendarIcon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{attendanceStats.totalDays}</div>
            <p className="text-xs text-muted-foreground">School days</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Present Days</CardTitle>
            <CheckCircle2 className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{attendanceStats.presentDays}</div>
            <p className="text-xs text-muted-foreground">Days attended</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Absent Days</CardTitle>
            <XCircle className="h-4 w-4 text-red-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">{attendanceStats.absentDays}</div>
            <p className="text-xs text-muted-foreground">Days missed</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Attendance Rate</CardTitle>
            <TrendingUp className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">{attendanceStats.percentage}%</div>
            <Progress value={attendanceStats.percentage} className="mt-2" />
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Monthly Breakdown */}
        <Card>
          <CardHeader>
            <CardTitle>Monthly Breakdown</CardTitle>
            <CardDescription>
              Attendance percentage by month
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {monthlyData.map((month, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">{month.month}</span>
                    <span className="text-sm text-muted-foreground">
                      {month.percentage}% ({month.present}/{month.present + month.absent})
                    </span>
                  </div>
                  <Progress value={month.percentage} className="h-2" />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Calendar View */}
        <Card>
          <CardHeader>
            <CardTitle>Calendar View</CardTitle>
            <CardDescription>
              Select a date to view attendance details
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Calendar
              mode="single"
              selected={date}
              onSelect={setDate}
              className="rounded-md border"
            />
          </CardContent>
        </Card>
      </div>

      {/* Recent Attendance */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Clock className="h-5 w-5" />
            Recent Attendance
          </CardTitle>
          <CardDescription>
            Your attendance records for the past week
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recentAttendance.map((record, index) => (
              <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="text-center">
                    <p className="text-sm font-medium">
                      {new Date(record.date).toLocaleDateString('en-US', { 
                        weekday: 'short',
                        month: 'short',
                        day: 'numeric'
                      })}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {record.time}
                    </p>
                  </div>
                  {record.status === 'absent' && (
                    <AlertTriangle className="h-4 w-4 text-red-500" />
                  )}
                  {record.status === 'late' && (
                    <Clock className="h-4 w-4 text-yellow-500" />
                  )}
                  {record.status === 'present' && (
                    <CheckCircle2 className="h-4 w-4 text-green-500" />
                  )}
                </div>
                {getStatusBadge(record.status)}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default StudentAttendancePage;