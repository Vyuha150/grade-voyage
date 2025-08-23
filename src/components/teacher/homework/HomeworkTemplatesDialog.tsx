import { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  Search,
  Copy,
  Star,
  BookOpen,
  FileText,
  Calculator,
  Globe,
} from 'lucide-react';

interface HomeworkTemplatesDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const HomeworkTemplatesDialog = ({ open, onOpenChange }: HomeworkTemplatesDialogProps) => {
  const [searchQuery, setSearchQuery] = useState('');

  const templates = [
    {
      id: 'template-1',
      title: 'Math Problem Set',
      subject: 'Mathematics',
      description: 'Standard template for algebra and geometry problems',
      icon: Calculator,
      usageCount: 24,
      lastUsed: '2 days ago',
      tags: ['algebra', 'geometry', 'practice'],
    },
    {
      id: 'template-2',
      title: 'Reading Comprehension',
      subject: 'English',
      description: 'Template for reading assignments with questions',
      icon: BookOpen,
      usageCount: 18,
      lastUsed: '1 week ago',
      tags: ['reading', 'comprehension', 'analysis'],
    },
    {
      id: 'template-3',
      title: 'Lab Report',
      subject: 'Science',
      description: 'Structured template for science experiment reports',
      icon: FileText,
      usageCount: 12,
      lastUsed: '3 days ago',
      tags: ['experiment', 'report', 'analysis'],
    },
    {
      id: 'template-4',
      title: 'Essay Assignment',
      subject: 'English',
      description: 'Template for structured essay writing assignments',
      icon: FileText,
      usageCount: 15,
      lastUsed: '5 days ago',
      tags: ['essay', 'writing', 'structure'],
    },
    {
      id: 'template-5',
      title: 'Geography Project',
      subject: 'Geography',
      description: 'Project template for geographical research and presentation',
      icon: Globe,
      usageCount: 8,
      lastUsed: '1 month ago',
      tags: ['project', 'research', 'presentation'],
    },
  ];

  const filteredTemplates = templates.filter(template =>
    template.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    template.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
    template.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const useTemplate = (template: any) => {
    // TODO: Implement template usage
    console.log('Using template:', template);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Homework Templates</DialogTitle>
          <DialogDescription>
            Choose from pre-built templates to quickly create homework assignments
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search templates..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>

          {/* Templates Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredTemplates.map((template) => {
              const Icon = template.icon;
              
              return (
                <Card key={template.id} className="hover:shadow-md transition-shadow">
                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-primary/10 rounded-lg">
                          <Icon className="h-5 w-5 text-primary" />
                        </div>
                        <div>
                          <CardTitle className="text-base">{template.title}</CardTitle>
                          <Badge variant="outline" className="text-xs mt-1">
                            {template.subject}
                          </Badge>
                        </div>
                      </div>
                      <div className="flex items-center gap-1">
                        <Star className="h-4 w-4 text-yellow-500" />
                        <span className="text-sm text-muted-foreground">{template.usageCount}</span>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <CardDescription className="text-sm">
                      {template.description}
                    </CardDescription>
                    
                    <div className="flex flex-wrap gap-1">
                      {template.tags.map((tag) => (
                        <Badge key={tag} variant="secondary" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                    
                    <div className="flex items-center justify-between pt-2">
                      <span className="text-xs text-muted-foreground">
                        Last used: {template.lastUsed}
                      </span>
                      <Button size="sm" onClick={() => useTemplate(template)} className="gap-2">
                        <Copy className="h-3 w-3" />
                        Use Template
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          {filteredTemplates.length === 0 && (
            <div className="text-center py-8">
              <FileText className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
              <h3 className="text-lg font-semibold">No templates found</h3>
              <p className="text-muted-foreground">No templates match your search criteria.</p>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};