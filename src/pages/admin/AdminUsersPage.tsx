import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { UserKPICards } from '@/components/admin/users/UserKPICards';
import { UserRoleChart } from '@/components/admin/users/UserRoleChart';
import { UserGrowthChart } from '@/components/admin/users/UserGrowthChart';
import { UsersTable } from '@/components/admin/users/UsersTable';
import { CreateUserDialog } from '@/components/admin/users/CreateUserDialog';
import { BulkImportDialog } from '@/components/admin/users/BulkImportDialog';
import { RoleMatrixDialog } from '@/components/admin/users/RoleMatrixDialog';
import {
  Plus,
  Upload,
  Shield,
  Search,
  Filter,
  Download,
  Users,
  TrendingUp,
  AlertCircle,
} from 'lucide-react';

const AdminUsersPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedRole, setSelectedRole] = useState<string>('all');
  const [selectedStatus, setSelectedStatus] = useState<string>('all');
  const [selectedCampus, setSelectedCampus] = useState<string>('all');
  const [createUserOpen, setCreateUserOpen] = useState(false);
  const [bulkImportOpen, setBulkImportOpen] = useState(false);
  const [roleMatrixOpen, setRoleMatrixOpen] = useState(false);

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold gradient-text">Users & Roles</h1>
          <p className="text-muted-foreground mt-1">
            Manage user accounts, roles, and permissions across the platform
          </p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" onClick={() => setRoleMatrixOpen(true)} className="gap-2">
            <Shield className="h-4 w-4" />
            Role Matrix
          </Button>
          <Button variant="outline" onClick={() => setBulkImportOpen(true)} className="gap-2">
            <Upload className="h-4 w-4" />
            Bulk Import
          </Button>
          <Button onClick={() => setCreateUserOpen(true)} className="gap-2">
            <Plus className="h-4 w-4" />
            Create User
          </Button>
        </div>
      </div>

      {/* 3-Column Layout */}
      <div className="grid grid-cols-1 xl:grid-cols-12 gap-6">
        
        {/* Column 1: KPIs & Infographics (4 columns) */}
        <div className="xl:col-span-4 space-y-6">
          
          {/* KPI Cards */}
          <UserKPICards />
          
          {/* User Distribution by Role */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5" />
                User Distribution
              </CardTitle>
              <CardDescription>
                Total users by role breakdown
              </CardDescription>
            </CardHeader>
            <CardContent>
              <UserRoleChart />
            </CardContent>
          </Card>

          {/* Growth Trend */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5" />
                Growth Last 30 Days
              </CardTitle>
              <CardDescription>
                New user registrations trend
              </CardDescription>
            </CardHeader>
            <CardContent>
              <UserGrowthChart />
            </CardContent>
          </Card>

          {/* Pending Verifications */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <AlertCircle className="h-5 w-5 text-orange-500" />
                Pending Actions
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center justify-between p-3 rounded-lg border border-orange-200 bg-orange-50">
                <div>
                  <p className="font-medium text-sm">Email Verifications</p>
                  <p className="text-xs text-muted-foreground">Pending user confirmations</p>
                </div>
                <Badge variant="outline" className="text-orange-600 border-orange-600">
                  23
                </Badge>
              </div>
              
              <div className="flex items-center justify-between p-3 rounded-lg border border-blue-200 bg-blue-50">
                <div>
                  <p className="font-medium text-sm">Role Assignments</p>
                  <p className="text-xs text-muted-foreground">Users without assigned roles</p>
                </div>
                <Badge variant="outline" className="text-blue-600 border-blue-600">
                  7
                </Badge>
              </div>

              <div className="flex items-center justify-between p-3 rounded-lg border border-red-200 bg-red-50">
                <div>
                  <p className="font-medium text-sm">Account Reviews</p>
                  <p className="text-xs text-muted-foreground">Flagged for manual review</p>
                </div>
                <Badge variant="outline" className="text-red-600 border-red-600">
                  3
                </Badge>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Column 2: Filters & Search (3 columns) */}
        <div className="xl:col-span-3 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Filter className="h-5 w-5" />
                Filters & Search
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Search */}
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search users..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>

              {/* Role Filter */}
              <div>
                <label className="text-sm font-medium mb-2 block">Role</label>
                <Select value={selectedRole} onValueChange={setSelectedRole}>
                  <SelectTrigger>
                    <SelectValue placeholder="All roles" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Roles</SelectItem>
                    <SelectItem value="ADMIN">Admin</SelectItem>
                    <SelectItem value="TEACHER">Teacher</SelectItem>
                    <SelectItem value="PARENT">Parent</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Status Filter */}
              <div>
                <label className="text-sm font-medium mb-2 block">Status</label>
                <Select value={selectedStatus} onValueChange={setSelectedStatus}>
                  <SelectTrigger>
                    <SelectValue placeholder="All statuses" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Statuses</SelectItem>
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="inactive">Inactive</SelectItem>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="suspended">Suspended</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Campus Filter */}
              <div>
                <label className="text-sm font-medium mb-2 block">Campus</label>
                <Select value={selectedCampus} onValueChange={setSelectedCampus}>
                  <SelectTrigger>
                    <SelectValue placeholder="All campuses" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Campuses</SelectItem>
                    <SelectItem value="main">Main Campus</SelectItem>
                    <SelectItem value="north">North Campus</SelectItem>
                    <SelectItem value="south">South Campus</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Quick Actions */}
              <div className="pt-4 border-t">
                <h4 className="text-sm font-medium mb-3">Quick Actions</h4>
                <div className="space-y-2">
                  <Button variant="outline" size="sm" className="w-full justify-start gap-2">
                    <Download className="h-4 w-4" />
                    Export Users
                  </Button>
                  <Button variant="outline" size="sm" className="w-full justify-start gap-2">
                    <AlertCircle className="h-4 w-4" />
                    Review Pending
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Activity Summary */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Recent Activity</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="text-sm">
                  <p className="font-medium">Sarah Johnson</p>
                  <p className="text-muted-foreground text-xs">Created teacher account • 2h ago</p>
                </div>
                <div className="text-sm">
                  <p className="font-medium">Mike Chen</p>
                  <p className="text-muted-foreground text-xs">Password reset • 4h ago</p>
                </div>
                <div className="text-sm">
                  <p className="font-medium">Lisa Park</p>
                  <p className="text-muted-foreground text-xs">Role changed to Admin • 6h ago</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Column 3: Users Table (5 columns) */}
        <div className="xl:col-span-5">
          <Card>
            <CardHeader>
              <CardTitle>Users Directory</CardTitle>
              <CardDescription>
                Complete list of platform users with management actions
              </CardDescription>
            </CardHeader>
            <CardContent>
              <UsersTable 
                searchQuery={searchQuery}
                roleFilter={selectedRole}
                statusFilter={selectedStatus}
                campusFilter={selectedCampus}
              />
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Dialogs */}
      <CreateUserDialog open={createUserOpen} onOpenChange={setCreateUserOpen} />
      <BulkImportDialog open={bulkImportOpen} onOpenChange={setBulkImportOpen} />
      <RoleMatrixDialog open={roleMatrixOpen} onOpenChange={setRoleMatrixOpen} />
    </div>
  );
};

export default AdminUsersPage;