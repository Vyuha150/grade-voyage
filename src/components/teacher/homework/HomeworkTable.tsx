import { useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { 
  MoreHorizontal, 
  Eye, 
  Edit, 
  Copy, 
  Trash2, 
  Send,
  Calendar,
  Users,
  FileText,
} from 'lucide-react';

interface HomeworkTableProps {
  searchQuery: string;
  classFilter: string;
  subjectFilter: string;
  statusFilter: string;
}

export const HomeworkTable = ({ searchQuery, classFilter, subjectFilter, statusFilter }: HomeworkTableProps) => {
  const [selectedHomework, setSelectedHomework] = useState<string | null>(null);

  const homeworkData = [
    {
      id: 'hw-001',
      title: 'Algebra Practice Problems',
      subject: 'Mathematics',
      class: 'Class 10A',
      dueDate: '2024-01-15',
      assignedDate: '2024-01-08',
      submissions: 28,
      totalStudents: 32,
      status: 'active' as const,
      completionRate: 87,
    },
    {
      id: 'hw-002', 
      title: 'Essay on Photosynthesis',
      subject: 'Science',
      class: 'Class 9B',
      dueDate: '2024-01-12',
      assignedDate: '2024-01-05',
      submissions: 24,
      totalStudents: 30,
      status: 'overdue' as const,
      completionRate: 80,
    },
    {
      id: 'hw-003',
      title: 'Chapter 5 Reading',
      subject: 'English',
      class: 'Class 10B',
      dueDate: '2024-01-18',
      assignedDate: '2024-01-10',
      submissions: 18,
      totalStudents: 28,
      status: 'active' as const,
      completionRate: 64,
    },
    {
      id: 'hw-004',
      title: 'History Timeline Project',
      subject: 'History',
      class: 'Class 9A',
      dueDate: '2024-01-20',
      assignedDate: '2024-01-12',
      submissions: 15,
      totalStudents: 25,
      status: 'active' as const,
      completionRate: 60,
    },
    {
      id: 'hw-005',
      title: 'Geometry Worksheets',
      subject: 'Mathematics',
      class: 'Class 10A',
      dueDate: '2024-01-10',
      assignedDate: '2024-01-03',
      submissions: 32,
      totalStudents: 32,
      status: 'completed' as const,
      completionRate: 100,
    },
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'active':
        return <Badge className="bg-blue-100 text-blue-800 border-blue-300">Active</Badge>;
      case 'completed':
        return <Badge className="bg-green-100 text-green-800 border-green-300">Completed</Badge>;
      case 'overdue':
        return <Badge className="bg-red-100 text-red-800 border-red-300">Overdue</Badge>;
      case 'draft':
        return <Badge variant="outline">Draft</Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const filteredData = homeworkData.filter(homework => {
    const matchesSearch = homework.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         homework.subject.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesClass = classFilter === 'all' || homework.class.toLowerCase().includes(classFilter);
    const matchesSubject = subjectFilter === 'all' || homework.subject.toLowerCase() === subjectFilter;
    const matchesStatus = statusFilter === 'all' || homework.status === statusFilter;
    
    return matchesSearch && matchesClass && matchesSubject && matchesStatus;
  });

  return (
    <div className="space-y-4">
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Title</TableHead>
              <TableHead>Subject</TableHead>
              <TableHead>Class</TableHead>
              <TableHead>Due Date</TableHead>
              <TableHead>Submissions</TableHead>
              <TableHead>Completion</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="w-[50px]"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredData.map((homework) => (
              <TableRow key={homework.id}>
                <TableCell>
                  <div>
                    <div className="font-medium">{homework.title}</div>
                    <div className="text-sm text-muted-foreground">
                      Assigned: {formatDate(homework.assignedDate)}
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <Badge variant="outline">{homework.subject}</Badge>
                </TableCell>
                <TableCell>{homework.class}</TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                    {formatDate(homework.dueDate)}
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <Users className="h-4 w-4 text-muted-foreground" />
                    {homework.submissions}/{homework.totalStudents}
                  </div>
                </TableCell>
                <TableCell>
                  <div className="space-y-2">
                    <Progress value={homework.completionRate} className="h-2" />
                    <span className="text-sm text-muted-foreground">
                      {homework.completionRate}%
                    </span>
                  </div>
                </TableCell>
                <TableCell>
                  {getStatusBadge(homework.status)}
                </TableCell>
                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="sm">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuLabel>Actions</DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem>
                        <Eye className="mr-2 h-4 w-4" />
                        View Details
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Edit className="mr-2 h-4 w-4" />
                        Edit Assignment
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Copy className="mr-2 h-4 w-4" />
                        Duplicate
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Send className="mr-2 h-4 w-4" />
                        Send Reminder
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <DropdownMenuItem
                            className="text-destructive focus:text-destructive"
                            onSelect={(e) => e.preventDefault()}
                          >
                            <Trash2 className="mr-2 h-4 w-4" />
                            Delete
                          </DropdownMenuItem>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>Delete Homework</AlertDialogTitle>
                            <AlertDialogDescription>
                              Are you sure you want to delete "{homework.title}"? This action cannot be undone.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction className="bg-destructive text-destructive-foreground hover:bg-destructive/90">
                              Delete
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      
      {filteredData.length === 0 && (
        <div className="text-center py-8">
          <FileText className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
          <h3 className="text-lg font-semibold">No homework found</h3>
          <p className="text-muted-foreground">No homework assignments match your current filters.</p>
        </div>
      )}
    </div>
  );
};