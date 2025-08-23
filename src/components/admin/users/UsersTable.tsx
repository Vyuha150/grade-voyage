import { useState } from 'react';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { 
  MoreHorizontal, 
  Eye, 
  UserCog, 
  Key, 
  Ban, 
  Mail,
  Shield,
  Users,
} from 'lucide-react';

interface UsersTableProps {
  searchQuery: string;
  roleFilter: string;
  statusFilter: string;
  campusFilter: string;
}

// Mock data - in real app this would come from API
const mockUsers = [
  {
    id: '1',
    name: 'Sarah Johnson',
    email: 'sarah.johnson@school.edu',
    role: 'TEACHER',
    class: 'Grade 10-A',
    section: 'Science',
    lastLogin: '2024-01-22 14:30',
    status: 'active',
    campus: 'main',
    avatar: '/api/placeholder/32/32',
  },
  {
    id: '2',
    name: 'Mike Chen',
    email: 'mike.chen@parent.com',
    role: 'PARENT',
    class: 'Grade 8-B',
    section: '-',
    lastLogin: '2024-01-22 09:15',
    status: 'active',
    campus: 'main',
    avatar: '/api/placeholder/32/32',
  },
  {
    id: '3',
    name: 'Dr. Lisa Park',
    email: 'lisa.park@school.edu',
    role: 'ADMIN',
    class: 'All',
    section: 'Administration',
    lastLogin: '2024-01-22 16:45',
    status: 'active',
    campus: 'main',
    avatar: '/api/placeholder/32/32',
  },
  {
    id: '4',
    name: 'John Smith',
    email: 'john.smith@parent.com',
    role: 'PARENT',
    class: 'Grade 6-A',
    section: '-',
    lastLogin: '2024-01-20 19:20',
    status: 'inactive',
    campus: 'north',
    avatar: '/api/placeholder/32/32',
  },
  {
    id: '5',
    name: 'Emma Wilson',
    email: 'emma.wilson@school.edu',
    role: 'TEACHER',
    class: 'Grade 5-C',
    section: 'Mathematics',
    lastLogin: 'Never',
    status: 'pending',
    campus: 'south',
    avatar: '/api/placeholder/32/32',
  },
];

export const UsersTable = ({ searchQuery, roleFilter, statusFilter, campusFilter }: UsersTableProps) => {
  const [selectedUsers, setSelectedUsers] = useState<string[]>([]);

  // Filter users based on search and filters
  const filteredUsers = mockUsers.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         user.email.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesRole = roleFilter === 'all' || user.role === roleFilter;
    const matchesStatus = statusFilter === 'all' || user.status === statusFilter;
    const matchesCampus = campusFilter === 'all' || user.campus === campusFilter;
    
    return matchesSearch && matchesRole && matchesStatus && matchesCampus;
  });

  const getStatusBadge = (status: string) => {
    const variants = {
      active: 'default',
      inactive: 'secondary',
      pending: 'outline',
      suspended: 'destructive',
    } as const;
    
    return (
      <Badge variant={variants[status as keyof typeof variants] || 'default'}>
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </Badge>
    );
  };

  const getRoleBadge = (role: string) => {
    const colors = {
      ADMIN: 'bg-red-100 text-red-800 border-red-200',
      TEACHER: 'bg-blue-100 text-blue-800 border-blue-200',
      PARENT: 'bg-green-100 text-green-800 border-green-200',
    } as const;
    
    return (
      <Badge variant="outline" className={colors[role as keyof typeof colors]}>
        {role}
      </Badge>
    );
  };

  const handleImpersonate = (userId: string, userName: string) => {
    console.log(`Impersonating user ${userId} (${userName})`);
    // Implement impersonation with audit logging
  };

  return (
    <div className="space-y-4">
      {/* Bulk Actions */}
      {selectedUsers.length > 0 && (
        <div className="flex items-center gap-2 p-2 bg-muted rounded-lg">
          <span className="text-sm text-muted-foreground">
            {selectedUsers.length} users selected
          </span>
          <Button variant="outline" size="sm">
            Bulk Edit
          </Button>
          <Button variant="outline" size="sm">
            Send Email
          </Button>
        </div>
      )}

      {/* Users Table */}
      <div className="border rounded-lg">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-12">
                <input 
                  type="checkbox" 
                  className="rounded border-border"
                  onChange={(e) => {
                    if (e.target.checked) {
                      setSelectedUsers(filteredUsers.map(u => u.id));
                    } else {
                      setSelectedUsers([]);
                    }
                  }}
                />
              </TableHead>
              <TableHead>User</TableHead>
              <TableHead>Role</TableHead>
              <TableHead>Class/Section</TableHead>
              <TableHead>Last Login</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredUsers.map((user) => (
              <TableRow key={user.id}>
                <TableCell>
                  <input 
                    type="checkbox"
                    className="rounded border-border"
                    checked={selectedUsers.includes(user.id)}
                    onChange={(e) => {
                      if (e.target.checked) {
                        setSelectedUsers([...selectedUsers, user.id]);
                      } else {
                        setSelectedUsers(selectedUsers.filter(id => id !== user.id));
                      }
                    }}
                  />
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-3">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={user.avatar} />
                      <AvatarFallback>
                        {user.name.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="font-medium">{user.name}</div>
                      <div className="text-sm text-muted-foreground">{user.email}</div>
                    </div>
                  </div>
                </TableCell>
                <TableCell>{getRoleBadge(user.role)}</TableCell>
                <TableCell>
                  <div>
                    <div className="font-medium">{user.class}</div>
                    {user.section !== '-' && (
                      <div className="text-sm text-muted-foreground">{user.section}</div>
                    )}
                  </div>
                </TableCell>
                <TableCell className="text-sm">{user.lastLogin}</TableCell>
                <TableCell>{getStatusBadge(user.status)}</TableCell>
                <TableCell className="text-right">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" className="h-8 w-8 p-0">
                        <span className="sr-only">Open menu</span>
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-56">
                      <DropdownMenuLabel>User Actions</DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      
                      <DropdownMenuItem className="gap-2">
                        <Eye className="h-4 w-4" />
                        View Profile
                      </DropdownMenuItem>
                      
                      <DropdownMenuItem className="gap-2">
                        <UserCog className="h-4 w-4" />
                        Edit User
                      </DropdownMenuItem>
                      
                      <DropdownMenuItem 
                        className="gap-2"
                        onClick={() => handleImpersonate(user.id, user.name)}
                      >
                        <Shield className="h-4 w-4" />
                        Impersonate User
                      </DropdownMenuItem>
                      
                      <DropdownMenuSeparator />
                      
                      <DropdownMenuItem className="gap-2">
                        <Key className="h-4 w-4" />
                        Reset Password
                      </DropdownMenuItem>
                      
                      <DropdownMenuItem className="gap-2">
                        <Mail className="h-4 w-4" />
                        Send Email Invite
                      </DropdownMenuItem>
                      
                      <DropdownMenuSeparator />
                      
                      <DropdownMenuItem className="gap-2 text-red-600">
                        <Ban className="h-4 w-4" />
                        {user.status === 'active' ? 'Suspend User' : 'Activate User'}
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Empty State */}
      {filteredUsers.length === 0 && (
        <div className="text-center py-12">
          <Users className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
          <h3 className="text-lg font-medium">No users found</h3>
          <p className="text-muted-foreground mb-6">
            {searchQuery || roleFilter !== 'all' || statusFilter !== 'all' || campusFilter !== 'all'
              ? 'Try adjusting your search or filter criteria'
              : 'Get started by creating your first user account'
            }
          </p>
          <Button>
            Create User
          </Button>
        </div>
      )}
    </div>
  );
};