import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  Calendar, 
  Clock, 
  Users, 
  FileText,
  MoreHorizontal,
  CheckCircle,
  AlertCircle
} from "lucide-react";

interface Assignment {
  id: number;
  title: string;
  subject: string;
  class: string;
  dueDate: string;
  status: 'draft' | 'published' | 'graded';
  submissions: number;
  totalStudents: number;
  priority: 'low' | 'medium' | 'high';
  description: string;
}

const assignments: Assignment[] = [
  {
    id: 1,
    title: "Quadratic Equations - Problem Set",
    subject: "Mathematics",
    class: "Grade 10A",
    dueDate: "2024-03-25",
    status: "published",
    submissions: 23,
    totalStudents: 28,
    priority: "high",
    description: "Solve the given quadratic equations using factoring and quadratic formula methods."
  },
  {
    id: 2,
    title: "Photosynthesis Lab Report",
    subject: "Biology",
    class: "Grade 9B",
    dueDate: "2024-03-28",
    status: "published",
    submissions: 15,
    totalStudents: 25,
    priority: "medium",
    description: "Document your observations from the photosynthesis experiment conducted in class."
  },
  {
    id: 3,
    title: "Shakespeare Essay Draft",
    subject: "English Literature",
    class: "Grade 11A",
    dueDate: "2024-03-30",
    status: "draft",
    submissions: 0,
    totalStudents: 22,
    priority: "low",
    description: "Write a 1000-word essay analyzing themes in Hamlet."
  },
  {
    id: 4,
    title: "French Vocabulary Quiz",
    subject: "French",
    class: "Grade 8A",
    dueDate: "2024-03-22",
    status: "graded",
    submissions: 30,
    totalStudents: 30,
    priority: "medium",
    description: "Online vocabulary quiz covering chapters 1-3."
  }
];

const getSubjectColor = (subject: string) => {
  const colors: Record<string, string> = {
    'Mathematics': 'bg-accent-math',
    'Biology': 'bg-accent-science',
    'English Literature': 'bg-accent-arts',
    'French': 'bg-accent-arts',
    'Physics': 'bg-accent-science',
    'Chemistry': 'bg-accent-science',
  };
  return colors[subject] || 'bg-primary';
};

const getStatusColor = (status: string) => {
  switch (status) {
    case 'published': return 'status-active';
    case 'draft': return 'status-pending';
    case 'graded': return 'status-inactive';
    default: return 'status-pending';
  }
};

const getPriorityColor = (priority: string) => {
  switch (priority) {
    case 'high': return 'text-destructive';
    case 'medium': return 'text-warning';
    case 'low': return 'text-success';
    default: return 'text-muted-foreground';
  }
};

export function AssignmentCard() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <h2 className="text-2xl font-bold text-foreground">Recent Assignments</h2>
          <Badge variant="outline" className="status-active">
            {assignments.filter(a => a.status === 'published').length} active
          </Badge>
        </div>
        <Button className="bg-gradient-primary">
          <FileText className="w-4 h-4 mr-2" />
          Create Assignment
        </Button>
      </div>

      {/* Assignments Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {assignments.map((assignment) => (
          <Card key={assignment.id} className="dashboard-card hover:shadow-lg transition-all duration-300">
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-3 flex-1">
                  <div className={`w-3 h-3 rounded-full ${getSubjectColor(assignment.subject)} mt-2 flex-shrink-0`} />
                  <div className="min-w-0 flex-1">
                    <CardTitle className="text-lg font-semibold mb-1 truncate">
                      {assignment.title}
                    </CardTitle>
                    <div className="flex items-center gap-2 mb-2">
                      <Badge variant="outline" className="text-xs">
                        {assignment.subject}
                      </Badge>
                      <Badge variant="outline" className="text-xs">
                        {assignment.class}
                      </Badge>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Badge 
                    variant="outline" 
                    className={`text-xs ${getStatusColor(assignment.status)}`}
                  >
                    {assignment.status}
                  </Badge>
                  <Button variant="ghost" size="sm">
                    <MoreHorizontal className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            
            <CardContent className="space-y-4">
              {/* Description */}
              <p className="text-sm text-muted-foreground line-clamp-2">
                {assignment.description}
              </p>

              {/* Assignment Info */}
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm">
                  <Calendar className="w-4 h-4 text-muted-foreground" />
                  <span className="text-muted-foreground">Due:</span>
                  <span className="font-medium">{assignment.dueDate}</span>
                  <AlertCircle className={`w-4 h-4 ml-auto ${getPriorityColor(assignment.priority)}`} />
                </div>
                
                <div className="flex items-center gap-2 text-sm">
                  <Users className="w-4 h-4 text-muted-foreground" />
                  <span className="text-muted-foreground">Submissions:</span>
                  <span className="font-medium">
                    {assignment.submissions}/{assignment.totalStudents}
                  </span>
                  <div className="ml-auto flex items-center gap-1">
                    <div className="w-16 bg-muted rounded-full h-2">
                      <div 
                        className="h-2 bg-primary rounded-full transition-all duration-300"
                        style={{ width: `${(assignment.submissions / assignment.totalStudents) * 100}%` }}
                      />
                    </div>
                    <span className="text-xs text-muted-foreground ml-1">
                      {Math.round((assignment.submissions / assignment.totalStudents) * 100)}%
                    </span>
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="flex items-center justify-between pt-2 border-t border-card-border">
                <div className="flex items-center gap-2">
                  {assignment.status === 'graded' && (
                    <CheckCircle className="w-4 h-4 text-success" />
                  )}
                  {assignment.status === 'published' && (
                    <Clock className="w-4 h-4 text-warning" />
                  )}
                  <span className="text-xs text-muted-foreground capitalize">
                    {assignment.status === 'graded' ? 'Completed' : 
                     assignment.status === 'published' ? 'In Progress' : 'Draft'}
                  </span>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm">
                    View
                  </Button>
                  {assignment.status === 'published' && (
                    <Button variant="outline" size="sm">
                      Grade
                    </Button>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Quick Actions */}
      <Card className="dashboard-card">
        <CardHeader>
          <CardTitle className="text-lg">Quick Assignment Actions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Button variant="outline" className="h-auto p-4 flex flex-col items-center gap-2">
              <FileText className="w-6 h-6 text-primary" />
              <div className="text-center">
                <h4 className="font-medium">Create Assignment</h4>
                <p className="text-xs text-muted-foreground">Add new assignment</p>
              </div>
            </Button>
            
            <Button variant="outline" className="h-auto p-4 flex flex-col items-center gap-2">
              <CheckCircle className="w-6 h-6 text-success" />
              <div className="text-center">
                <h4 className="font-medium">Grade Submissions</h4>
                <p className="text-xs text-muted-foreground">Review & grade work</p>
              </div>
            </Button>
            
            <Button variant="outline" className="h-auto p-4 flex flex-col items-center gap-2">
              <Users className="w-6 h-6 text-warning" />
              <div className="text-center">
                <h4 className="font-medium">Send Reminders</h4>
                <p className="text-xs text-muted-foreground">Notify students</p>
              </div>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}