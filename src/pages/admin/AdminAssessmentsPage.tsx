import { useState } from 'react';
import { AssessmentKPICards } from '@/components/admin/assessments/AssessmentKPICards';
import { AssessmentCoverageChart } from '@/components/admin/assessments/AssessmentCoverageChart';
import { GradeAverageChart } from '@/components/admin/assessments/GradeAverageChart';
import { AssessmentsTable } from '@/components/admin/assessments/AssessmentsTable';
import { CreateAssessmentDialog } from '@/components/admin/assessments/CreateAssessmentDialog';
import { AssessmentTemplatesDialog } from '@/components/admin/assessments/AssessmentTemplatesDialog';
import { ModerationQueueDialog } from '@/components/admin/assessments/ModerationQueueDialog';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Plus, FileText, Eye, Search } from 'lucide-react';

export const AdminAssessmentsPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [subjectFilter, setSubjectFilter] = useState('');
  const [termFilter, setTermFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [createDialogOpen, setCreateDialogOpen] = useState(false);
  const [templatesDialogOpen, setTemplatesDialogOpen] = useState(false);
  const [moderationDialogOpen, setModerationDialogOpen] = useState(false);

  return (
    <div className="p-6 space-y-6">
      {/* Page Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Assessments</h1>
          <p className="text-muted-foreground">Manage and oversee all assessments</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={() => setTemplatesDialogOpen(true)}>
            <FileText className="w-4 h-4 mr-2" />
            Templates
          </Button>
          <Button variant="outline" onClick={() => setModerationDialogOpen(true)}>
            <Eye className="w-4 h-4 mr-2" />
            Moderation Queue
          </Button>
          <Button onClick={() => setCreateDialogOpen(true)}>
            <Plus className="w-4 h-4 mr-2" />
            Create Assessment
          </Button>
        </div>
      </div>

      {/* KPI Cards */}
      <AssessmentKPICards />

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Assessment Coverage by Subject</CardTitle>
          </CardHeader>
          <CardContent>
            <AssessmentCoverageChart />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Average Marks by Grade</CardTitle>
          </CardHeader>
          <CardContent>
            <GradeAverageChart />
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle>Assessment Filters</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input
                placeholder="Search assessments..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={subjectFilter} onValueChange={setSubjectFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Filter by subject" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">All Subjects</SelectItem>
                <SelectItem value="mathematics">Mathematics</SelectItem>
                <SelectItem value="english">English</SelectItem>
                <SelectItem value="science">Science</SelectItem>
                <SelectItem value="history">History</SelectItem>
                <SelectItem value="geography">Geography</SelectItem>
              </SelectContent>
            </Select>
            <Select value={termFilter} onValueChange={setTermFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Filter by term" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">All Terms</SelectItem>
                <SelectItem value="term1">Term 1</SelectItem>
                <SelectItem value="term2">Term 2</SelectItem>
                <SelectItem value="term3">Term 3</SelectItem>
              </SelectContent>
            </Select>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">All Status</SelectItem>
                <SelectItem value="draft">Draft</SelectItem>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="completed">Completed</SelectItem>
                <SelectItem value="archived">Archived</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Assessments Table */}
      <AssessmentsTable
        searchQuery={searchQuery}
        subjectFilter={subjectFilter}
        termFilter={termFilter}
        statusFilter={statusFilter}
      />

      {/* Dialogs */}
      <CreateAssessmentDialog 
        open={createDialogOpen} 
        onOpenChange={setCreateDialogOpen} 
      />
      <AssessmentTemplatesDialog 
        open={templatesDialogOpen} 
        onOpenChange={setTemplatesDialogOpen} 
      />
      <ModerationQueueDialog 
        open={moderationDialogOpen} 
        onOpenChange={setModerationDialogOpen} 
      />
    </div>
  );
};