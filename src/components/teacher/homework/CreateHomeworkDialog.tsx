import { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { format } from 'date-fns';
import {
  CalendarIcon,
  Upload,
  X,
  Link,
  FileText,
  Plus,
} from 'lucide-react';

interface CreateHomeworkDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const CreateHomeworkDialog = ({ open, onOpenChange }: CreateHomeworkDialogProps) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    subject: '',
    class: '',
    dueDate: undefined as Date | undefined,
    instructions: '',
    maxMarks: '',
  });
  
  const [attachments, setAttachments] = useState<string[]>([]);
  const [links, setLinks] = useState<string[]>([]);
  const [newLink, setNewLink] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implement homework creation
    console.log('Creating homework:', { ...formData, attachments, links });
    onOpenChange(false);
    resetForm();
  };

  const resetForm = () => {
    setFormData({
      title: '',
      description: '',
      subject: '',
      class: '',
      dueDate: undefined,
      instructions: '',
      maxMarks: '',
    });
    setAttachments([]);
    setLinks([]);
    setNewLink('');
  };

  const addLink = () => {
    if (newLink.trim()) {
      setLinks([...links, newLink.trim()]);
      setNewLink('');
    }
  };

  const removeLink = (index: number) => {
    setLinks(links.filter((_, i) => i !== index));
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Create New Homework</DialogTitle>
          <DialogDescription>
            Create a new homework assignment for your students
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="title">Title *</Label>
              <Input
                id="title"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                placeholder="Enter homework title"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="maxMarks">Max Marks</Label>
              <Input
                id="maxMarks"
                type="number"
                value={formData.maxMarks}
                onChange={(e) => setFormData({ ...formData, maxMarks: e.target.value })}
                placeholder="100"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="subject">Subject *</Label>
              <Select value={formData.subject} onValueChange={(value) => setFormData({ ...formData, subject: value })}>
                <SelectTrigger>
                  <SelectValue placeholder="Select subject" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="mathematics">Mathematics</SelectItem>
                  <SelectItem value="science">Science</SelectItem>
                  <SelectItem value="english">English</SelectItem>
                  <SelectItem value="history">History</SelectItem>
                  <SelectItem value="geography">Geography</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="class">Class *</Label>
              <Select value={formData.class} onValueChange={(value) => setFormData({ ...formData, class: value })}>
                <SelectTrigger>
                  <SelectValue placeholder="Select class" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="class-10a">Class 10A</SelectItem>
                  <SelectItem value="class-10b">Class 10B</SelectItem>
                  <SelectItem value="class-9a">Class 9A</SelectItem>
                  <SelectItem value="class-9b">Class 9B</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder="Brief description of the homework"
              rows={3}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="instructions">Instructions</Label>
            <Textarea
              id="instructions"
              value={formData.instructions}
              onChange={(e) => setFormData({ ...formData, instructions: e.target.value })}
              placeholder="Detailed instructions for students"
              rows={4}
            />
          </div>

          <div className="space-y-2">
            <Label>Due Date *</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className={cn(
                    "w-full justify-start text-left font-normal",
                    !formData.dueDate && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {formData.dueDate ? format(formData.dueDate, "PPP") : "Pick a date"}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={formData.dueDate}
                  onSelect={(date) => setFormData({ ...formData, dueDate: date })}
                  disabled={(date) => date < new Date()}
                  initialFocus
                  className="pointer-events-auto"
                />
              </PopoverContent>
            </Popover>
          </div>

          {/* Attachments Section */}
          <div className="space-y-3">
            <Label>Attachments & Resources</Label>
            
            {/* File Upload */}
            <Card>
              <CardContent className="pt-4">
                <Button variant="outline" className="w-full gap-2" type="button">
                  <Upload className="h-4 w-4" />
                  Upload Files
                </Button>
                {attachments.length > 0 && (
                  <div className="mt-3 space-y-2">
                    {attachments.map((file, index) => (
                      <div key={index} className="flex items-center justify-between p-2 bg-muted rounded">
                        <div className="flex items-center gap-2">
                          <FileText className="h-4 w-4" />
                          <span className="text-sm">{file}</span>
                        </div>
                        <Button variant="ghost" size="sm">
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Links */}
            <Card>
              <CardContent className="pt-4">
                <div className="flex gap-2 mb-3">
                  <Input
                    placeholder="Add reference link (https://...)"
                    value={newLink}
                    onChange={(e) => setNewLink(e.target.value)}
                  />
                  <Button type="button" onClick={addLink} size="sm">
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
                {links.length > 0 && (
                  <div className="space-y-2">
                    {links.map((link, index) => (
                      <div key={index} className="flex items-center justify-between p-2 bg-muted rounded">
                        <div className="flex items-center gap-2">
                          <Link className="h-4 w-4" />
                          <span className="text-sm truncate">{link}</span>
                        </div>
                        <Button variant="ghost" size="sm" onClick={() => removeLink(index)}>
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit">Create Homework</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};