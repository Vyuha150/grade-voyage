import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';
import { UserPlus, Mail, Shield, Settings } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const createUserSchema = z.object({
  firstName: z.string().min(2, 'First name must be at least 2 characters'),
  lastName: z.string().min(2, 'Last name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  phone: z.string().optional(),
  role: z.enum(['ADMIN', 'TEACHER', 'PARENT']),
  campus: z.string().min(1, 'Please select a campus'),
  department: z.string().optional(),
  employeeId: z.string().optional(),
  sendWelcomeEmail: z.boolean().default(true),
  requirePasswordChange: z.boolean().default(true),
  notes: z.string().optional(),
});

type CreateUserForm = z.infer<typeof createUserSchema>;

interface CreateUserDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const CreateUserDialog = ({ open, onOpenChange }: CreateUserDialogProps) => {
  const [currentStep, setCurrentStep] = useState('basic');
  const { toast } = useToast();

  const form = useForm<CreateUserForm>({
    resolver: zodResolver(createUserSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      role: 'TEACHER',
      campus: '',
      department: '',
      employeeId: '',
      sendWelcomeEmail: true,
      requirePasswordChange: true,
      notes: '',
    },
  });

  const onSubmit = async (data: CreateUserForm) => {
    try {
      // In real app, this would make an API call
      console.log('Creating user:', data);
      
      toast({
        title: 'User Created Successfully',
        description: `${data.firstName} ${data.lastName} has been added to the system.`,
      });

      // Reset form and close dialog
      form.reset();
      setCurrentStep('basic');
      onOpenChange(false);
    } catch (error) {
      toast({
        title: 'Error Creating User',
        description: 'There was a problem creating the user. Please try again.',
        variant: 'destructive',
      });
    }
  };

  const selectedRole = form.watch('role');

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <UserPlus className="h-5 w-5" />
            Create New User
          </DialogTitle>
          <DialogDescription>
            Add a new user to the platform with appropriate role and permissions.
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <Tabs value={currentStep} onValueChange={setCurrentStep}>
              <TabsList className="grid grid-cols-3 w-full">
                <TabsTrigger value="basic" className="gap-2">
                  <UserPlus className="h-4 w-4" />
                  Basic Info
                </TabsTrigger>
                <TabsTrigger value="role" className="gap-2">
                  <Shield className="h-4 w-4" />
                  Role & Access
                </TabsTrigger>
                <TabsTrigger value="settings" className="gap-2">
                  <Settings className="h-4 w-4" />
                  Settings
                </TabsTrigger>
              </TabsList>

              {/* Basic Information */}
              <TabsContent value="basic" className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="firstName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>First Name</FormLabel>
                        <FormControl>
                          <Input placeholder="John" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="lastName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Last Name</FormLabel>
                        <FormControl>
                          <Input placeholder="Doe" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email Address</FormLabel>
                      <FormControl>
                        <Input type="email" placeholder="john.doe@school.edu" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="phone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Phone Number (Optional)</FormLabel>
                      <FormControl>
                        <Input placeholder="+1 (555) 123-4567" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </TabsContent>

              {/* Role & Access */}
              <TabsContent value="role" className="space-y-4">
                <FormField
                  control={form.control}
                  name="role"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>User Role</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select a role" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="ADMIN">
                            <div className="flex items-center gap-2">
                              <Badge variant="destructive" className="text-xs">ADMIN</Badge>
                              <span>Full system access</span>
                            </div>
                          </SelectItem>
                          <SelectItem value="TEACHER">
                            <div className="flex items-center gap-2">
                              <Badge className="text-xs bg-blue-100 text-blue-800">TEACHER</Badge>
                              <span>Classroom management</span>
                            </div>
                          </SelectItem>
                          <SelectItem value="PARENT">
                            <div className="flex items-center gap-2">
                              <Badge className="text-xs bg-green-100 text-green-800">PARENT</Badge>
                              <span>Student progress tracking</span>
                            </div>
                          </SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="campus"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Campus</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select campus" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="main">Main Campus</SelectItem>
                          <SelectItem value="north">North Campus</SelectItem>
                          <SelectItem value="south">South Campus</SelectItem>
                          <SelectItem value="online">Online Campus</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {selectedRole === 'TEACHER' && (
                  <>
                    <FormField
                      control={form.control}
                      name="department"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Department</FormLabel>
                          <FormControl>
                            <Input placeholder="Mathematics" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="employeeId"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Employee ID</FormLabel>
                          <FormControl>
                            <Input placeholder="EMP001" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </>
                )}
              </TabsContent>

              {/* Settings */}
              <TabsContent value="settings" className="space-y-4">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <FormLabel>Send Welcome Email</FormLabel>
                      <p className="text-sm text-muted-foreground">
                        Automatically send login credentials and welcome message
                      </p>
                    </div>
                    <FormField
                      control={form.control}
                      name="sendWelcomeEmail"
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <Switch
                              checked={field.value}
                              onCheckedChange={field.onChange}
                            />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                  </div>

                  <Separator />

                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <FormLabel>Require Password Change</FormLabel>
                      <p className="text-sm text-muted-foreground">
                        Force user to change password on first login
                      </p>
                    </div>
                    <FormField
                      control={form.control}
                      name="requirePasswordChange"
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <Switch
                              checked={field.value}
                              onCheckedChange={field.onChange}
                            />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                  </div>

                  <Separator />

                  <FormField
                    control={form.control}
                    name="notes"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Notes (Optional)</FormLabel>
                        <FormControl>
                          <Textarea 
                            placeholder="Additional notes about this user..."
                            className="min-h-[100px]"
                            {...field} 
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </TabsContent>
            </Tabs>

            {/* Footer Actions */}
            <div className="flex items-center justify-between pt-4 border-t">
              <Button
                type="button"
                variant="outline"
                onClick={() => onOpenChange(false)}
              >
                Cancel
              </Button>
              
              <div className="flex gap-2">
                {currentStep === 'basic' && (
                  <Button
                    type="button"
                    onClick={() => setCurrentStep('role')}
                  >
                    Next: Role & Access
                  </Button>
                )}
                
                {currentStep === 'role' && (
                  <>
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => setCurrentStep('basic')}
                    >
                      Previous
                    </Button>
                    <Button
                      type="button"
                      onClick={() => setCurrentStep('settings')}
                    >
                      Next: Settings
                    </Button>
                  </>
                )}
                
                {currentStep === 'settings' && (
                  <>
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => setCurrentStep('role')}
                    >
                      Previous
                    </Button>
                    <Button type="submit" className="gap-2">
                      <UserPlus className="h-4 w-4" />
                      Create User
                    </Button>
                  </>
                )}
              </div>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};