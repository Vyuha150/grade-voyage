import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Textarea } from '@/components/ui/textarea';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { CheckCircle, XCircle, Clock, AlertTriangle, Eye, MessageSquare } from 'lucide-react';
import { format } from 'date-fns';

interface ModerationQueueDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const mockModerationItems = [
  {
    id: '1',
    assessmentName: 'Algebra Final Exam',
    teacher: 'Mr. Johnson',
    subject: 'Mathematics',
    class: 'Grade 9A',
    submittedDate: new Date('2024-01-20'),
    priority: 'high',
    status: 'pending',
    issues: ['Unclear marking scheme', 'Question 5 ambiguous'],
    totalMarks: 100,
    duration: 120
  },
  {
    id: '2',
    assessmentName: 'English Literature Essay',
    teacher: 'Ms. Smith',
    subject: 'English',
    class: 'Grade 11B',
    submittedDate: new Date('2024-01-19'),
    priority: 'medium',
    status: 'pending',
    issues: ['Rubric needs revision'],
    totalMarks: 80,
    duration: 90
  },
  {
    id: '3',
    assessmentName: 'Chemistry Lab Report',
    teacher: 'Dr. Brown',
    subject: 'Science',
    class: 'Grade 10A',
    submittedDate: new Date('2024-01-18'),
    priority: 'low',
    status: 'approved',
    issues: [],
    totalMarks: 75,
    duration: 60
  },
  {
    id: '4',
    assessmentName: 'World History Quiz',
    teacher: 'Ms. Davis',
    subject: 'History',
    class: 'Grade 8C',
    submittedDate: new Date('2024-01-17'),
    priority: 'medium',
    status: 'rejected',
    issues: ['Content not aligned with curriculum', 'Too many questions for time limit'],
    totalMarks: 50,
    duration: 45
  }
];

export const ModerationQueueDialog = ({ open, onOpenChange }: ModerationQueueDialogProps) => {
  const [selectedItem, setSelectedItem] = useState<string | null>(null);
  const [moderationComment, setModerationComment] = useState('');

  const pendingItems = mockModerationItems.filter(item => item.status === 'pending');
  const reviewedItems = mockModerationItems.filter(item => item.status !== 'pending');

  const getPriorityBadge = (priority: string) => {
    switch (priority) {
      case 'high':
        return <Badge className="bg-red-100 text-red-800">High Priority</Badge>;
      case 'medium':
        return <Badge className="bg-yellow-100 text-yellow-800">Medium Priority</Badge>;
      case 'low':
        return <Badge className="bg-green-100 text-green-800">Low Priority</Badge>;
      default:
        return <Badge variant="secondary">{priority}</Badge>;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'pending':
        return <Badge className="bg-blue-100 text-blue-800"><Clock className="w-3 h-3 mr-1" />Pending</Badge>;
      case 'approved':
        return <Badge className="bg-green-100 text-green-800"><CheckCircle className="w-3 h-3 mr-1" />Approved</Badge>;
      case 'rejected':
        return <Badge className="bg-red-100 text-red-800"><XCircle className="w-3 h-3 mr-1" />Rejected</Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  const handleApprove = (itemId: string) => {
    console.log('Approving assessment:', itemId, 'Comment:', moderationComment);
    // Implement approval logic
    setModerationComment('');
  };

  const handleReject = (itemId: string) => {
    console.log('Rejecting assessment:', itemId, 'Comment:', moderationComment);
    // Implement rejection logic
    setModerationComment('');
  };

  const selectedItemData = mockModerationItems.find(item => item.id === selectedItem);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-6xl max-h-[90vh] overflow-hidden">
        <DialogHeader>
          <DialogTitle>Assessment Moderation Queue</DialogTitle>
          <DialogDescription>
            Review and moderate assessments submitted by teachers before publication.
          </DialogDescription>
        </DialogHeader>

        <Tabs defaultValue="pending" className="flex-1 overflow-hidden">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="pending">
              Pending Review ({pendingItems.length})
            </TabsTrigger>
            <TabsTrigger value="reviewed">
              Previously Reviewed ({reviewedItems.length})
            </TabsTrigger>
          </TabsList>

          <TabsContent value="pending" className="space-y-4 overflow-hidden">
            {pendingItems.length === 0 ? (
              <div className="text-center py-8">
                <CheckCircle className="w-12 h-12 text-green-500 mx-auto mb-2" />
                <h3 className="text-lg font-semibold mb-2">All caught up!</h3>
                <p className="text-muted-foreground">
                  There are no assessments pending moderation at the moment.
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 h-full">
                {/* Queue List */}
                <div className="space-y-4 overflow-y-auto">
                  {pendingItems.map((item) => (
                    <Card 
                      key={item.id} 
                      className={`cursor-pointer transition-all ${
                        selectedItem === item.id ? 'ring-2 ring-primary' : 'hover:shadow-md'
                      }`}
                      onClick={() => setSelectedItem(item.id)}
                    >
                      <CardHeader className="pb-3">
                        <div className="flex justify-between items-start">
                          <div>
                            <CardTitle className="text-base">{item.assessmentName}</CardTitle>
                            <p className="text-sm text-muted-foreground">
                              {item.teacher} • {item.subject} • {item.class}
                            </p>
                          </div>
                          {getPriorityBadge(item.priority)}
                        </div>
                      </CardHeader>
                      <CardContent className="pt-0">
                        <div className="flex justify-between items-center text-sm">
                          <span className="text-muted-foreground">
                            Submitted {format(item.submittedDate, 'MMM dd, yyyy')}
                          </span>
                          {item.issues.length > 0 && (
                            <div className="flex items-center text-amber-600">
                              <AlertTriangle className="w-4 h-4 mr-1" />
                              {item.issues.length} issue{item.issues.length !== 1 ? 's' : ''}
                            </div>
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>

                {/* Review Panel */}
                <div className="border rounded-lg p-4 overflow-y-auto">
                  {selectedItemData ? (
                    <div className="space-y-4">
                      <div>
                        <h3 className="text-lg font-semibold">{selectedItemData.assessmentName}</h3>
                        <p className="text-muted-foreground">
                          {selectedItemData.teacher} • {selectedItemData.subject} • {selectedItemData.class}
                        </p>
                      </div>

                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <span className="text-muted-foreground">Total Marks:</span>
                          <span className="ml-1 font-medium">{selectedItemData.totalMarks}</span>
                        </div>
                        <div>
                          <span className="text-muted-foreground">Duration:</span>
                          <span className="ml-1 font-medium">{selectedItemData.duration} min</span>
                        </div>
                      </div>

                      {selectedItemData.issues.length > 0 && (
                        <div>
                          <h4 className="font-medium text-amber-600 mb-2 flex items-center">
                            <AlertTriangle className="w-4 h-4 mr-1" />
                            Identified Issues
                          </h4>
                          <ul className="list-disc list-inside space-y-1 text-sm">
                            {selectedItemData.issues.map((issue, index) => (
                              <li key={index} className="text-muted-foreground">{issue}</li>
                            ))}
                          </ul>
                        </div>
                      )}

                      <div>
                        <Button variant="outline" size="sm" className="w-full mb-4">
                          <Eye className="w-4 h-4 mr-2" />
                          Preview Assessment
                        </Button>
                      </div>

                      <div>
                        <label className="text-sm font-medium mb-2 block">
                          Moderation Comments
                        </label>
                        <Textarea
                          placeholder="Add your review comments..."
                          value={moderationComment}
                          onChange={(e) => setModerationComment(e.target.value)}
                          className="resize-none"
                          rows={4}
                        />
                      </div>

                      <div className="flex gap-2">
                        <Button 
                          className="flex-1" 
                          onClick={() => handleApprove(selectedItemData.id)}
                        >
                          <CheckCircle className="w-4 h-4 mr-2" />
                          Approve
                        </Button>
                        <Button 
                          variant="destructive" 
                          className="flex-1"
                          onClick={() => handleReject(selectedItemData.id)}
                        >
                          <XCircle className="w-4 h-4 mr-2" />
                          Reject
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <div className="text-center py-8">
                      <MessageSquare className="w-12 h-12 text-muted-foreground mx-auto mb-2" />
                      <p className="text-muted-foreground">
                        Select an assessment from the queue to review
                      </p>
                    </div>
                  )}
                </div>
              </div>
            )}
          </TabsContent>

          <TabsContent value="reviewed" className="overflow-y-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Assessment</TableHead>
                  <TableHead>Teacher</TableHead>
                  <TableHead>Subject</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Reviewed Date</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {reviewedItems.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell>
                      <div>
                        <div className="font-medium">{item.assessmentName}</div>
                        <div className="text-sm text-muted-foreground">{item.class}</div>
                      </div>
                    </TableCell>
                    <TableCell>{item.teacher}</TableCell>
                    <TableCell>{item.subject}</TableCell>
                    <TableCell>{getStatusBadge(item.status)}</TableCell>
                    <TableCell>{format(item.submittedDate, 'MMM dd, yyyy')}</TableCell>
                    <TableCell>
                      <Button variant="ghost" size="sm">
                        <Eye className="w-4 h-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TabsContent>
        </Tabs>

        <div className="flex justify-end">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Close
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};