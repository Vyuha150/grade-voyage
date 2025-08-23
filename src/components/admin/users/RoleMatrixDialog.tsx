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
import { Switch } from '@/components/ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Shield, 
  Users, 
  GraduationCap, 
  Settings, 
  FileText, 
  DollarSign,
  Calendar,
  BarChart,
  Save,
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface RoleMatrixDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

interface Permission {
  id: string;
  name: string;
  description: string;
  category: string;
}

interface RolePermissions {
  [key: string]: {
    [permissionId: string]: boolean;
  };
}

const permissions: Permission[] = [
  // User Management
  { id: 'users.view', name: 'View Users', description: 'View user profiles and details', category: 'users' },
  { id: 'users.create', name: 'Create Users', description: 'Add new users to the system', category: 'users' },
  { id: 'users.edit', name: 'Edit Users', description: 'Modify user information', category: 'users' },
  { id: 'users.delete', name: 'Delete Users', description: 'Remove users from system', category: 'users' },
  { id: 'users.impersonate', name: 'Impersonate Users', description: 'Login as another user', category: 'users' },

  // Academic Management
  { id: 'classes.view', name: 'View Classes', description: 'View class information', category: 'academic' },
  { id: 'classes.manage', name: 'Manage Classes', description: 'Create and edit classes', category: 'academic' },
  { id: 'subjects.manage', name: 'Manage Subjects', description: 'Create and edit subjects', category: 'academic' },
  { id: 'timetable.manage', name: 'Manage Timetable', description: 'Create and modify schedules', category: 'academic' },

  // Assessment & Grading
  { id: 'assessments.view', name: 'View Assessments', description: 'View assessment results', category: 'assessment' },
  { id: 'assessments.create', name: 'Create Assessments', description: 'Create new assessments', category: 'assessment' },
  { id: 'grades.manage', name: 'Manage Grades', description: 'Enter and modify grades', category: 'assessment' },
  { id: 'reports.generate', name: 'Generate Reports', description: 'Create academic reports', category: 'assessment' },

  // Financial Management
  { id: 'fees.view', name: 'View Fees', description: 'View fee information', category: 'finance' },
  { id: 'fees.manage', name: 'Manage Fees', description: 'Create and modify fee structures', category: 'finance' },
  { id: 'payments.process', name: 'Process Payments', description: 'Handle payment processing', category: 'finance' },
  { id: 'invoices.generate', name: 'Generate Invoices', description: 'Create and send invoices', category: 'finance' },

  // System Administration
  { id: 'system.settings', name: 'System Settings', description: 'Modify system configuration', category: 'system' },
  { id: 'analytics.view', name: 'View Analytics', description: 'Access system analytics', category: 'system' },
  { id: 'audit.view', name: 'View Audit Logs', description: 'Access system audit trails', category: 'system' },
  { id: 'backup.manage', name: 'Manage Backups', description: 'Create and restore backups', category: 'system' },
];

const categoryIcons = {
  users: Users,
  academic: GraduationCap,
  assessment: FileText,
  finance: DollarSign,
  system: Settings,
};

export const RoleMatrixDialog = ({ open, onOpenChange }: RoleMatrixDialogProps) => {
  const { toast } = useToast();
  
  // Initial role permissions setup
  const [rolePermissions, setRolePermissions] = useState<RolePermissions>({
    ADMIN: {
      // Admins have all permissions
      ...Object.fromEntries(permissions.map(p => [p.id, true]))
    },
    TEACHER: {
      // Teachers have limited permissions
      'users.view': true,
      'classes.view': true,
      'subjects.manage': true,
      'assessments.view': true,
      'assessments.create': true,
      'grades.manage': true,
      'reports.generate': true,
      'fees.view': true,
      'analytics.view': true,
    },
    PARENT: {
      // Parents have very limited permissions
      'assessments.view': true,
      'fees.view': true,
    }
  });

  const togglePermission = (role: string, permissionId: string) => {
    setRolePermissions(prev => ({
      ...prev,
      [role]: {
        ...prev[role],
        [permissionId]: !prev[role]?.[permissionId]
      }
    }));
  };

  const saveChanges = () => {
    // In real app, this would save to backend
    console.log('Saving role permissions:', rolePermissions);
    
    toast({
      title: 'Permissions Updated',
      description: 'Role permissions have been successfully updated.',
    });
    
    onOpenChange(false);
  };

  const getPermissionsByCategory = (category: string) => {
    return permissions.filter(p => p.category === category);
  };

  const categories = [...new Set(permissions.map(p => p.category))];

  const getRoleBadge = (role: string) => {
    const styles = {
      ADMIN: 'bg-red-100 text-red-800 border-red-200',
      TEACHER: 'bg-blue-100 text-blue-800 border-blue-200',
      PARENT: 'bg-green-100 text-green-800 border-green-200',
    };
    
    return (
      <Badge variant="outline" className={styles[role as keyof typeof styles]}>
        {role}
      </Badge>
    );
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-6xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Shield className="h-5 w-5" />
            Role Permission Matrix
          </DialogTitle>
          <DialogDescription>
            Configure permissions for each user role across different system modules
          </DialogDescription>
        </DialogHeader>

        <Tabs defaultValue="matrix" className="space-y-4">
          <TabsList>
            <TabsTrigger value="matrix">Permission Matrix</TabsTrigger>
            <TabsTrigger value="summary">Role Summary</TabsTrigger>
          </TabsList>

          <TabsContent value="matrix" className="space-y-6">
            {categories.map(category => {
              const Icon = categoryIcons[category as keyof typeof categoryIcons] || Settings;
              const categoryPermissions = getPermissionsByCategory(category);
              
              return (
                <Card key={category}>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 capitalize">
                      <Icon className="h-5 w-5" />
                      {category} Management
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="overflow-x-auto">
                      <table className="w-full">
                        <thead>
                          <tr className="border-b">
                            <th className="text-left p-2 font-medium">Permission</th>
                            <th className="text-center p-2 font-medium">Admin</th>
                            <th className="text-center p-2 font-medium">Teacher</th>
                            <th className="text-center p-2 font-medium">Parent</th>
                          </tr>
                        </thead>
                        <tbody>
                          {categoryPermissions.map(permission => (
                            <tr key={permission.id} className="border-b">
                              <td className="p-2">
                                <div>
                                  <div className="font-medium">{permission.name}</div>
                                  <div className="text-sm text-muted-foreground">
                                    {permission.description}
                                  </div>
                                </div>
                              </td>
                              {['ADMIN', 'TEACHER', 'PARENT'].map(role => (
                                <td key={role} className="p-2 text-center">
                                  <Switch
                                    checked={rolePermissions[role]?.[permission.id] || false}
                                    onCheckedChange={() => togglePermission(role, permission.id)}
                                  />
                                </td>
                              ))}
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </TabsContent>

          <TabsContent value="summary" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {['ADMIN', 'TEACHER', 'PARENT'].map(role => {
                const rolePerms = rolePermissions[role] || {};
                const enabledPermissions = Object.entries(rolePerms)
                  .filter(([_, enabled]) => enabled)
                  .map(([permId]) => permissions.find(p => p.id === permId))
                  .filter(Boolean);

                return (
                  <Card key={role}>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        {getRoleBadge(role)}
                        <span className="text-sm">({enabledPermissions.length} permissions)</span>
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        {enabledPermissions.length > 0 ? (
                          enabledPermissions.map(permission => (
                            <div key={permission!.id} className="text-sm">
                              • {permission!.name}
                            </div>
                          ))
                        ) : (
                          <div className="text-sm text-muted-foreground italic">
                            No permissions assigned
                          </div>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </TabsContent>
        </Tabs>

        {/* Footer Actions */}
        <div className="flex items-center justify-between pt-4 border-t">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={saveChanges} className="gap-2">
            <Save className="h-4 w-4" />
            Save Changes
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};