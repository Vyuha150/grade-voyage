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
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Search, FileText, Plus, Eye, Copy, Edit, Trash } from 'lucide-react';

interface AssessmentTemplatesDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const mockTemplates = [
  {
    id: '1',
    name: 'Multiple Choice Quiz',
    subject: 'General',
    type: 'quiz',
    duration: 30,
    totalMarks: 50,
    questionsCount: 25,
    usageCount: 45,
    description: 'Standard multiple choice format with 4 options per question'
  },
  {
    id: '2',
    name: 'Mathematics Problem Set',
    subject: 'Mathematics',
    type: 'test',
    duration: 90,
    totalMarks: 100,
    questionsCount: 15,
    usageCount: 32,
    description: 'Problem-solving questions with step-by-step marking scheme'
  },
  {
    id: '3',
    name: 'English Essay Assessment',
    subject: 'English',
    type: 'assignment',
    duration: 120,
    totalMarks: 100,
    questionsCount: 3,
    usageCount: 28,
    description: 'Creative and analytical writing assessment with rubric'
  },
  {
    id: '4',
    name: 'Science Practical Report',
    subject: 'Science',
    type: 'practical',
    duration: 60,
    totalMarks: 75,
    questionsCount: 8,
    usageCount: 19,
    description: 'Lab report template with observation and analysis sections'
  },
  {
    id: '5',
    name: 'History Source Analysis',
    subject: 'History',
    type: 'assignment',
    duration: 90,
    totalMarks: 80,
    questionsCount: 5,
    usageCount: 15,
    description: 'Document analysis with historical context questions'
  }
];

export const AssessmentTemplatesDialog = ({ open, onOpenChange }: AssessmentTemplatesDialogProps) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [subjectFilter, setSubjectFilter] = useState('');
  const [typeFilter, setTypeFilter] = useState('');

  const filteredTemplates = mockTemplates.filter(template => {
    const matchesSearch = template.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         template.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesSubject = !subjectFilter || template.subject.toLowerCase() === subjectFilter;
    const matchesType = !typeFilter || template.type === typeFilter;
    
    return matchesSearch && matchesSubject && matchesType;
  });

  const getTypeBadge = (type: string) => {
    const colors = {
      quiz: 'bg-blue-100 text-blue-800',
      test: 'bg-green-100 text-green-800',
      assignment: 'bg-purple-100 text-purple-800',
      practical: 'bg-orange-100 text-orange-800',
      exam: 'bg-red-100 text-red-800'
    };
    
    return (
      <Badge className={colors[type as keyof typeof colors] || 'bg-gray-100 text-gray-800'}>
        {type.charAt(0).toUpperCase() + type.slice(1)}
      </Badge>
    );
  };

  const handleUseTemplate = (templateId: string) => {
    console.log('Using template:', templateId);
    // Implement template usage logic
    onOpenChange(false);
  };

  const handleCopyTemplate = (templateId: string) => {
    console.log('Copying template:', templateId);
    // Implement template copying logic
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-6xl max-h-[90vh] overflow-hidden">
        <DialogHeader>
          <DialogTitle>Assessment Templates</DialogTitle>
          <DialogDescription>
            Browse and use pre-built assessment templates to speed up your assessment creation.
          </DialogDescription>
        </DialogHeader>

        <Tabs defaultValue="browse" className="flex-1 overflow-hidden">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="browse">Browse Templates</TabsTrigger>
            <TabsTrigger value="create">Create Template</TabsTrigger>
          </TabsList>

          <TabsContent value="browse" className="space-y-4 overflow-hidden">
            {/* Filters */}
            <div className="flex gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                <Input
                  placeholder="Search templates..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Select value={subjectFilter} onValueChange={setSubjectFilter}>
                <SelectTrigger className="w-48">
                  <SelectValue placeholder="Filter by subject" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">All Subjects</SelectItem>
                  <SelectItem value="general">General</SelectItem>
                  <SelectItem value="mathematics">Mathematics</SelectItem>
                  <SelectItem value="english">English</SelectItem>
                  <SelectItem value="science">Science</SelectItem>
                  <SelectItem value="history">History</SelectItem>
                </SelectContent>
              </Select>
              <Select value={typeFilter} onValueChange={setTypeFilter}>
                <SelectTrigger className="w-48">
                  <SelectValue placeholder="Filter by type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">All Types</SelectItem>
                  <SelectItem value="quiz">Quiz</SelectItem>
                  <SelectItem value="test">Test</SelectItem>
                  <SelectItem value="assignment">Assignment</SelectItem>
                  <SelectItem value="practical">Practical</SelectItem>
                  <SelectItem value="exam">Exam</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Templates Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 overflow-y-auto max-h-96">
              {filteredTemplates.map((template) => (
                <Card key={template.id} className="hover:shadow-md transition-shadow">
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div className="space-y-1">
                        <CardTitle className="text-lg">{template.name}</CardTitle>
                        <div className="flex gap-2 items-center">
                          {getTypeBadge(template.type)}
                          <Badge variant="outline">{template.subject}</Badge>
                        </div>
                      </div>
                      <div className="flex gap-1">
                        <Button variant="ghost" size="sm" onClick={() => handleCopyTemplate(template.id)}>
                          <Copy className="w-4 h-4" />
                        </Button>
                        <Button variant="ghost" size="sm">
                          <Eye className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground mb-4">
                      {template.description}
                    </p>
                    <div className="grid grid-cols-2 gap-4 text-sm mb-4">
                      <div>
                        <span className="text-muted-foreground">Duration:</span>
                        <span className="ml-1 font-medium">{template.duration} min</span>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Total Marks:</span>
                        <span className="ml-1 font-medium">{template.totalMarks}</span>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Questions:</span>
                        <span className="ml-1 font-medium">{template.questionsCount}</span>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Used:</span>
                        <span className="ml-1 font-medium">{template.usageCount} times</span>
                      </div>
                    </div>
                    <Button 
                      className="w-full" 
                      onClick={() => handleUseTemplate(template.id)}
                    >
                      Use This Template
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>

            {filteredTemplates.length === 0 && (
              <div className="text-center py-8">
                <FileText className="w-12 h-12 text-muted-foreground mx-auto mb-2" />
                <h3 className="text-lg font-semibold mb-2">No templates found</h3>
                <p className="text-muted-foreground">
                  Try adjusting your filters or create a new template.
                </p>
              </div>
            )}
          </TabsContent>

          <TabsContent value="create" className="space-y-4">
            <div className="text-center py-8">
              <Plus className="w-12 h-12 text-muted-foreground mx-auto mb-2" />
              <h3 className="text-lg font-semibold mb-2">Create New Template</h3>
              <p className="text-muted-foreground mb-4">
                Build a reusable assessment template that can be used across different classes.
              </p>
              <Button>
                <Plus className="w-4 h-4 mr-2" />
                Start Creating Template
              </Button>
            </div>
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