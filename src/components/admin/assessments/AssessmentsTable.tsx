import { useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { MoreHorizontal, Eye, Edit, Trash, CheckCircle, XCircle, Clock } from 'lucide-react';
import { format } from 'date-fns';

interface AssessmentsTableProps {
  searchQuery: string;
  subjectFilter: string;
  termFilter: string;
  statusFilter: string;
}

const mockAssessments = [
  {
    id: '1',
    name: 'Algebra Mid-term Test',
    subject: 'Mathematics',
    class: 'Grade 9A',
    status: 'active',
    publishDate: new Date('2024-01-15'),
    totalMarks: 100,
    submissionsCount: 28,
    totalStudents: 30,
    teacher: 'Mr. Johnson'
  },
  {
    id: '2',
    name: 'English Comprehension Quiz',
    subject: 'English',
    class: 'Grade 8B',
    status: 'completed',
    publishDate: new Date('2024-01-10'),
    totalMarks: 50,
    submissionsCount: 32,
    totalStudents: 32,
    teacher: 'Ms. Smith'
  },
  {
    id: '3',
    name: 'Chemistry Lab Report',
    subject: 'Science',
    class: 'Grade 11A',
    status: 'draft',
    publishDate: new Date('2024-01-20'),
    totalMarks: 75,
    submissionsCount: 0,
    totalStudents: 25,
    teacher: 'Dr. Brown'
  },
  {
    id: '4',
    name: 'World War II Essay',
    subject: 'History',
    class: 'Grade 10C',
    status: 'active',
    publishDate: new Date('2024-01-18'),
    totalMarks: 100,
    submissionsCount: 22,
    totalStudents: 28,
    teacher: 'Ms. Davis'
  },
  {
    id: '5',
    name: 'Geography Map Skills',
    subject: 'Geography',
    class: 'Grade 7A',
    status: 'completed',
    publishDate: new Date('2024-01-08'),
    totalMarks: 60,
    submissionsCount: 30,
    totalStudents: 30,
    teacher: 'Mr. Wilson'
  }
];

export const AssessmentsTable = ({ searchQuery, subjectFilter, termFilter, statusFilter }: AssessmentsTableProps) => {
  const [selectedAssessments, setSelectedAssessments] = useState<string[]>([]);

  const filteredAssessments = mockAssessments.filter(assessment => {
    const matchesSearch = assessment.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         assessment.teacher.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         assessment.class.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesSubject = subjectFilter === 'all' || assessment.subject.toLowerCase() === subjectFilter;
    const matchesStatus = statusFilter === 'all' || assessment.status === statusFilter;
    
    return matchesSearch && matchesSubject && matchesStatus;
  });

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'active':
        return <Badge className="bg-blue-100 text-blue-800"><Clock className="w-3 h-3 mr-1" />Active</Badge>;
      case 'completed':
        return <Badge className="bg-green-100 text-green-800"><CheckCircle className="w-3 h-3 mr-1" />Completed</Badge>;
      case 'draft':
        return <Badge variant="secondary"><Edit className="w-3 h-3 mr-1" />Draft</Badge>;
      case 'archived':
        return <Badge variant="outline"><XCircle className="w-3 h-3 mr-1" />Archived</Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedAssessments(filteredAssessments.map(assessment => assessment.id));
    } else {
      setSelectedAssessments([]);
    }
  };

  const handleSelectAssessment = (assessmentId: string, checked: boolean) => {
    if (checked) {
      setSelectedAssessments(prev => [...prev, assessmentId]);
    } else {
      setSelectedAssessments(prev => prev.filter(id => id !== assessmentId));
    }
  };

  const handlePublishAssessment = (assessmentId: string) => {
    console.log('Publishing assessment:', assessmentId);
    // Implement publish logic
  };

  const handleUnpublishAssessment = (assessmentId: string) => {
    console.log('Unpublishing assessment:', assessmentId);
    // Implement unpublish logic
  };

  if (filteredAssessments.length === 0) {
    return (
      <Card>
        <CardContent className="flex flex-col items-center justify-center py-12">
          <div className="text-center">
            <h3 className="text-lg font-semibold mb-2">No assessments found</h3>
            <p className="text-muted-foreground mb-4">
              {searchQuery || subjectFilter !== 'all' || statusFilter !== 'all'
                ? "Try adjusting your filters to find assessments."
                : "Create your first assessment to get started."}
            </p>
            <Button>Create Assessment</Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-center">
          <CardTitle>Assessments ({filteredAssessments.length})</CardTitle>
          {selectedAssessments.length > 0 && (
            <div className="flex gap-2">
              <Button variant="outline" size="sm">
                Bulk Publish ({selectedAssessments.length})
              </Button>
              <Button variant="outline" size="sm">
                Archive Selected
              </Button>
            </div>
          )}
        </div>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-12">
                <Checkbox
                  checked={selectedAssessments.length === filteredAssessments.length}
                  onCheckedChange={handleSelectAll}
                />
              </TableHead>
              <TableHead>Assessment</TableHead>
              <TableHead>Subject</TableHead>
              <TableHead>Class</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Submissions</TableHead>
              <TableHead>Publish Date</TableHead>
              <TableHead>Teacher</TableHead>
              <TableHead className="w-12"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredAssessments.map((assessment) => (
              <TableRow key={assessment.id}>
                <TableCell>
                  <Checkbox
                    checked={selectedAssessments.includes(assessment.id)}
                    onCheckedChange={(checked) => handleSelectAssessment(assessment.id, checked as boolean)}
                  />
                </TableCell>
                <TableCell>
                  <div>
                    <div className="font-medium">{assessment.name}</div>
                    <div className="text-sm text-muted-foreground">
                      {assessment.totalMarks} marks
                    </div>
                  </div>
                </TableCell>
                <TableCell>{assessment.subject}</TableCell>
                <TableCell>{assessment.class}</TableCell>
                <TableCell>{getStatusBadge(assessment.status)}</TableCell>
                <TableCell>
                  <div className="text-sm">
                    {assessment.submissionsCount}/{assessment.totalStudents}
                    <div className="text-xs text-muted-foreground">
                      {Math.round((assessment.submissionsCount / assessment.totalStudents) * 100)}% complete
                    </div>
                  </div>
                </TableCell>
                <TableCell>{format(assessment.publishDate, 'MMM dd, yyyy')}</TableCell>
                <TableCell>{assessment.teacher}</TableCell>
                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" className="h-8 w-8 p-0">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuLabel>Actions</DropdownMenuLabel>
                      <DropdownMenuItem>
                        <Eye className="mr-2 h-4 w-4" />
                        View Details
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Edit className="mr-2 h-4 w-4" />
                        Edit Assessment
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      {assessment.status === 'draft' ? (
                        <DropdownMenuItem onClick={() => handlePublishAssessment(assessment.id)}>
                          <CheckCircle className="mr-2 h-4 w-4" />
                          Publish
                        </DropdownMenuItem>
                      ) : (
                        <DropdownMenuItem onClick={() => handleUnpublishAssessment(assessment.id)}>
                          <XCircle className="mr-2 h-4 w-4" />
                          Unpublish
                        </DropdownMenuItem>
                      )}
                      <DropdownMenuSeparator />
                      <DropdownMenuItem className="text-red-600">
                        <Trash className="mr-2 h-4 w-4" />
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};