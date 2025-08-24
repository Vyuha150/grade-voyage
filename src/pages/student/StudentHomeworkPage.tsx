import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  FileText,
  Download,
  Upload,
  BookOpen,
  Calendar,
  Clock,
  CheckCircle2,
  AlertTriangle
} from 'lucide-react';

const StudentHomeworkPage = () => {
  const pendingHomework = [
    {
      id: 1,
      subject: 'Mathematics',
      title: 'Algebra Practice Set 5',
      dueDate: '2024-01-18',
      description: 'Complete exercises 1-20 from Chapter 5',
      priority: 'high',
      estimatedTime: '2 hours'
    },
    {
      id: 2,
      subject: 'English Literature',
      title: 'Essay on Shakespearean Sonnets',
      dueDate: '2024-01-20',
      description: 'Write a 500-word essay analyzing Sonnet 18',
      priority: 'medium',
      estimatedTime: '3 hours'
    },
    {
      id: 3,
      subject: 'Physics',
      title: 'Lab Report - Pendulum Experiment',
      dueDate: '2024-01-22',
      description: 'Submit complete lab report with calculations',
      priority: 'medium',
      estimatedTime: '1.5 hours'
    }
  ];

  const completedHomework = [
    {
      id: 4,
      subject: 'Chemistry',
      title: 'Periodic Table Quiz',
      submittedDate: '2024-01-15',
      grade: 'A',
      feedback: 'Excellent work! Well organized answers.'
    },
    {
      id: 5,
      subject: 'History',
      title: 'World War II Timeline',
      submittedDate: '2024-01-12',
      grade: 'B+',
      feedback: 'Good effort, more detail needed on key events.'
    }
  ];

  const materials = [
    {
      id: 1,
      subject: 'Mathematics',
      title: 'Algebra Reference Guide',
      type: 'PDF',
      size: '2.4 MB',
      uploadedBy: 'Mrs. Johnson',
      uploadDate: '2024-01-10'
    },
    {
      id: 2,
      subject: 'Physics',
      title: 'Lab Safety Guidelines',
      type: 'PDF',
      size: '1.2 MB',
      uploadedBy: 'Dr. Wilson',
      uploadDate: '2024-01-08'
    },
    {
      id: 3,
      subject: 'English',
      title: 'Literary Terms Glossary',
      type: 'DOCX',
      size: '850 KB',
      uploadedBy: 'Mr. Thompson',
      uploadDate: '2024-01-05'
    }
  ];

  const getPriorityBadge = (priority: string) => {
    switch (priority) {
      case 'high':
        return <Badge variant="destructive">High Priority</Badge>;
      case 'medium':
        return <Badge className="bg-yellow-500 hover:bg-yellow-600">Medium</Badge>;
      case 'low':
        return <Badge variant="secondary">Low Priority</Badge>;
      default:
        return <Badge variant="secondary">Normal</Badge>;
    }
  };

  const getGradeBadge = (grade: string) => {
    const gradeColors = {
      'A+': 'bg-green-500',
      'A': 'bg-blue-500',
      'B+': 'bg-yellow-500',
      'B': 'bg-orange-500',
      'C': 'bg-red-500'
    };
    
    return (
      <Badge className={gradeColors[grade as keyof typeof gradeColors] || 'bg-gray-500'}>
        {grade}
      </Badge>
    );
  };

  return (
    <div className="space-y-6" data-testid="page-ready">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold gradient-text">Homework & Materials</h1>
          <p className="text-muted-foreground mt-1">
            Access assignments, submit work, and download study materials
          </p>
        </div>
        <Button>
          <Upload className="h-4 w-4 mr-2" />
          Submit Assignment
        </Button>
      </div>

      <Tabs defaultValue="pending" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="pending">Pending ({pendingHomework.length})</TabsTrigger>
          <TabsTrigger value="completed">Completed ({completedHomework.length})</TabsTrigger>
          <TabsTrigger value="materials">Materials ({materials.length})</TabsTrigger>
        </TabsList>

        <TabsContent value="pending" className="space-y-6">
          <div className="grid grid-cols-1 gap-6">
            {pendingHomework.map((homework) => (
              <Card key={homework.id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="flex items-center gap-2">
                        <FileText className="h-5 w-5" />
                        {homework.title}
                      </CardTitle>
                      <CardDescription className="mt-1">
                        {homework.subject} • Due {new Date(homework.dueDate).toLocaleDateString()}
                      </CardDescription>
                    </div>
                    <div className="flex items-center gap-2">
                      {getPriorityBadge(homework.priority)}
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-4">{homework.description}</p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <Clock className="h-4 w-4" />
                        {homework.estimatedTime}
                      </div>
                      <div className="flex items-center gap-1">
                        <Calendar className="h-4 w-4" />
                        {Math.ceil((new Date(homework.dueDate).getTime() - Date.now()) / (1000 * 60 * 60 * 24))} days left
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">
                        <Download className="h-4 w-4 mr-2" />
                        Download
                      </Button>
                      <Button size="sm">
                        <Upload className="h-4 w-4 mr-2" />
                        Submit
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="completed" className="space-y-6">
          <div className="grid grid-cols-1 gap-6">
            {completedHomework.map((homework) => (
              <Card key={homework.id}>
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="flex items-center gap-2">
                        <CheckCircle2 className="h-5 w-5 text-green-600" />
                        {homework.title}
                      </CardTitle>
                      <CardDescription className="mt-1">
                        {homework.subject} • Submitted {new Date(homework.submittedDate).toLocaleDateString()}
                      </CardDescription>
                    </div>
                    {getGradeBadge(homework.grade)}
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="bg-muted/50 p-3 rounded-lg">
                    <h4 className="font-medium text-sm mb-1">Teacher Feedback:</h4>
                    <p className="text-sm text-muted-foreground">{homework.feedback}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="materials" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {materials.map((material) => (
              <Card key={material.id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-lg">
                    <BookOpen className="h-5 w-5" />
                    {material.title}
                  </CardTitle>
                  <CardDescription>{material.subject}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Type:</span>
                      <Badge variant="outline">{material.type}</Badge>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Size:</span>
                      <span>{material.size}</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Uploaded by:</span>
                      <span>{material.uploadedBy}</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Date:</span>
                      <span>{new Date(material.uploadDate).toLocaleDateString()}</span>
                    </div>
                    <Button className="w-full" size="sm">
                      <Download className="h-4 w-4 mr-2" />
                      Download
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default StudentHomeworkPage;