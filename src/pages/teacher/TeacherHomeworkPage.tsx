import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { HomeworkKPICards } from '@/components/teacher/homework/HomeworkKPICards';
import { HomeworkSubmissionChart } from '@/components/teacher/homework/HomeworkSubmissionChart';
import { HomeworkOverdueChart } from '@/components/teacher/homework/HomeworkOverdueChart';
import { ResourceClicksChart } from '@/components/teacher/homework/ResourceClicksChart';
import { HomeworkTable } from '@/components/teacher/homework/HomeworkTable';
import { CreateHomeworkDialog } from '@/components/teacher/homework/CreateHomeworkDialog';
import { HomeworkTemplatesDialog } from '@/components/teacher/homework/HomeworkTemplatesDialog';
import {
  Plus,
  Copy,
  Search,
  Filter,
  Download,
  Upload,
  BookOpen,
  Clock,
  TrendingUp,
  FileText,
  Users,
  CheckCircle,
} from 'lucide-react';

const TeacherHomeworkPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedClass, setSelectedClass] = useState<string>('all');
  const [selectedSubject, setSelectedSubject] = useState<string>('all');
  const [selectedStatus, setSelectedStatus] = useState<string>('all');
  const [createHomeworkOpen, setCreateHomeworkOpen] = useState(false);
  const [templatesOpen, setTemplatesOpen] = useState(false);

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold gradient-text">Homework Management</h1>
          <p className="text-muted-foreground mt-1">
            Create, assign, and track homework for your classes
          </p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" onClick={() => setTemplatesOpen(true)} className="gap-2">
            <Copy className="h-4 w-4" />
            Templates
          </Button>
          <Button onClick={() => setCreateHomeworkOpen(true)} className="gap-2">
            <Plus className="h-4 w-4" />
            Create Homework
          </Button>
        </div>
      </div>

      {/* KPI Cards */}
      <HomeworkKPICards />

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Submission Funnel */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5" />
              Submission Status
            </CardTitle>
            <CardDescription>
              On-time vs late submissions funnel
            </CardDescription>
          </CardHeader>
          <CardContent>
            <HomeworkSubmissionChart />
          </CardContent>
        </Card>

        {/* Overdue Count */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="h-5 w-5 text-orange-500" />
              Overdue Assignments
            </CardTitle>
            <CardDescription>
              Current overdue homework count
            </CardDescription>
          </CardHeader>
          <CardContent>
            <HomeworkOverdueChart />
          </CardContent>
        </Card>

        {/* Resource Clicks */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BookOpen className="h-5 w-5" />
              Resource Engagement
            </CardTitle>
            <CardDescription>
              Material downloads and clicks
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ResourceClicksChart />
          </CardContent>
        </Card>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 xl:grid-cols-4 gap-6">
        
        {/* Filters & Quick Actions */}
        <div className="xl:col-span-1 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Filter className="h-5 w-5" />
                Filters
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Search */}
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search homework..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>

              {/* Class Filter */}
              <div>
                <label className="text-sm font-medium mb-2 block">Class</label>
                <Select value={selectedClass} onValueChange={setSelectedClass}>
                  <SelectTrigger>
                    <SelectValue placeholder="All classes" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Classes</SelectItem>
                    <SelectItem value="class-10a">Class 10A</SelectItem>
                    <SelectItem value="class-10b">Class 10B</SelectItem>
                    <SelectItem value="class-9a">Class 9A</SelectItem>
                    <SelectItem value="class-9b">Class 9B</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Subject Filter */}
              <div>
                <label className="text-sm font-medium mb-2 block">Subject</label>
                <Select value={selectedSubject} onValueChange={setSelectedSubject}>
                  <SelectTrigger>
                    <SelectValue placeholder="All subjects" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Subjects</SelectItem>
                    <SelectItem value="mathematics">Mathematics</SelectItem>
                    <SelectItem value="science">Science</SelectItem>
                    <SelectItem value="english">English</SelectItem>
                    <SelectItem value="history">History</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Status Filter */}
              <div>
                <label className="text-sm font-medium mb-2 block">Status</label>
                <Select value={selectedStatus} onValueChange={setSelectedStatus}>
                  <SelectTrigger>
                    <SelectValue placeholder="All statuses" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Statuses</SelectItem>
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="completed">Completed</SelectItem>
                    <SelectItem value="overdue">Overdue</SelectItem>
                    <SelectItem value="draft">Draft</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button variant="outline" size="sm" className="w-full justify-start gap-2">
                <Download className="h-4 w-4" />
                Export Assignments
              </Button>
              <Button variant="outline" size="sm" className="w-full justify-start gap-2">
                <Upload className="h-4 w-4" />
                Bulk Upload
              </Button>
              <Button variant="outline" size="sm" className="w-full justify-start gap-2">
                <CheckCircle className="h-4 w-4" />
                Mark All Complete
              </Button>
            </CardContent>
          </Card>

          {/* Recent Activity */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Recent Activity</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="text-sm">
                  <p className="font-medium">Alex Johnson</p>
                  <p className="text-muted-foreground text-xs">Submitted Math Assignment • 2h ago</p>
                </div>
                <div className="text-sm">
                  <p className="font-medium">Sarah Williams</p>
                  <p className="text-muted-foreground text-xs">Late submission • 4h ago</p>
                </div>
                <div className="text-sm">
                  <p className="font-medium">Mike Chen</p>
                  <p className="text-muted-foreground text-xs">Downloaded materials • 6h ago</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Homework Table */}
        <div className="xl:col-span-3">
          <Card>
            <CardHeader>
              <CardTitle>Homework Assignments</CardTitle>
              <CardDescription>
                Manage and track all homework assignments for your classes
              </CardDescription>
            </CardHeader>
            <CardContent>
              <HomeworkTable 
                searchQuery={searchQuery}
                classFilter={selectedClass}
                subjectFilter={selectedSubject}
                statusFilter={selectedStatus}
              />
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Dialogs */}
      <CreateHomeworkDialog open={createHomeworkOpen} onOpenChange={setCreateHomeworkOpen} />
      <HomeworkTemplatesDialog open={templatesOpen} onOpenChange={setTemplatesOpen} />
    </div>
  );
};

export default TeacherHomeworkPage;