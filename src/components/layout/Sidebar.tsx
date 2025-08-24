import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useAuth } from '@/hooks/useAuth';
import { ROUTES } from '@/utils/routes';
import {
  LayoutDashboard,
  Users,
  BookOpen,
  Calendar,
  ClipboardCheck,
  GraduationCap,
  FileText,
  Library,
  Megaphone,
  DollarSign,
  MessageSquare,
  CalendarDays,
  Settings,
  FileBarChart,
  AlertTriangle,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';

interface SidebarProps {
  className?: string;
}

const adminNavItems = [
  { title: 'Dashboard', href: ROUTES.ADMIN.HOME, icon: LayoutDashboard },
  { title: 'Users & Roles', href: ROUTES.ADMIN.USERS, icon: Users },
  { title: 'Classes', href: ROUTES.ADMIN.CLASSES, icon: BookOpen },
  { title: 'Subjects', href: ROUTES.ADMIN.SUBJECTS, icon: Library },
  { title: 'Timetable', href: ROUTES.ADMIN.TIMETABLE, icon: Calendar },
  { title: 'Attendance', href: ROUTES.ADMIN.ATTENDANCE, icon: ClipboardCheck },
  { title: 'Assessments', href: ROUTES.ADMIN.ASSESSMENTS, icon: GraduationCap },
  { title: 'Homework', href: ROUTES.ADMIN.HOMEWORK, icon: FileText },
  { title: 'Materials', href: ROUTES.ADMIN.MATERIALS, icon: Library },
  { title: 'Announcements', href: ROUTES.ADMIN.ANNOUNCEMENTS, icon: Megaphone },
  { title: 'Fees & Invoices', href: ROUTES.ADMIN.FEES, icon: DollarSign },
  { title: 'Appointments', href: ROUTES.ADMIN.APPOINTMENTS, icon: CalendarDays },
  { title: 'Complaints', href: ROUTES.ADMIN.COMPLAINTS, icon: AlertTriangle },
  { title: 'Analytics', href: ROUTES.ADMIN.ANALYTICS, icon: FileBarChart },
  { title: 'Settings', href: ROUTES.ADMIN.SETTINGS, icon: Settings },
];

const teacherNavItems = [
  { title: 'Dashboard', href: ROUTES.TEACHER.HOME, icon: LayoutDashboard },
  { title: 'My Classes', href: ROUTES.TEACHER.CLASSES, icon: BookOpen },
  { title: 'Attendance', href: ROUTES.TEACHER.ATTENDANCE, icon: ClipboardCheck },
  { title: 'Assessments', href: ROUTES.TEACHER.ASSESSMENTS, icon: GraduationCap },
  { title: 'Homework', href: ROUTES.TEACHER.HOMEWORK, icon: FileText },
  { title: 'Materials', href: ROUTES.TEACHER.MATERIALS, icon: Library },
  { title: 'Announcements', href: ROUTES.TEACHER.ANNOUNCEMENTS, icon: Megaphone },
  { title: 'Appointments', href: ROUTES.TEACHER.APPOINTMENTS, icon: CalendarDays },
  { title: 'Messages', href: ROUTES.TEACHER.MESSAGES, icon: MessageSquare },
  { title: 'Calendar', href: ROUTES.TEACHER.CALENDAR, icon: Calendar },
];

const parentNavItems = [
  { title: 'Dashboard', href: ROUTES.STUDENT.HOME, icon: LayoutDashboard },
  { title: 'Attendance', href: ROUTES.STUDENT.ATTENDANCE, icon: ClipboardCheck },
  { title: 'Marks & Results', href: ROUTES.STUDENT.MARKS, icon: GraduationCap },
  { title: 'Homework & Materials', href: ROUTES.STUDENT.HOMEWORK_MATERIALS, icon: FileText },
  { title: 'Announcements', href: ROUTES.STUDENT.ANNOUNCEMENTS, icon: Megaphone },
  { title: 'Appointments', href: ROUTES.STUDENT.APPOINTMENTS, icon: CalendarDays },
  { title: 'Fees & Payments', href: ROUTES.STUDENT.FEES, icon: DollarSign },
  { title: 'Messages', href: ROUTES.STUDENT.MESSAGES, icon: MessageSquare },
  { title: 'Calendar', href: ROUTES.STUDENT.CALENDAR, icon: Calendar },
];

export const Sidebar = ({ className }: SidebarProps) => {
  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation();
  const { profile } = useAuth();

  if (!profile) return null;

  const getNavItems = () => {
    switch (profile.role) {
      case 'ADMIN':
        return adminNavItems;
      case 'TEACHER':
        return teacherNavItems;
      case 'PARENT':
        return parentNavItems;
      default:
        return [];
    }
  };

  const navItems = getNavItems();
  const isActive = (href: string) => location.pathname === href;

  return (
    <div 
      className={cn(
        'bg-card border-r border-border h-screen flex flex-col transition-all duration-300',
        collapsed ? 'w-16' : 'w-64',
        className
      )}
    >
      {/* Header */}
      <div className="p-4 border-b border-border">
        <div className="flex items-center justify-between">
          {!collapsed && (
            <div>
              <h2 className="text-lg font-semibold gradient-text">School Planner</h2>
              <Badge variant="secondary" className="mt-1 text-xs">
                {profile.role}
              </Badge>
            </div>
          )}
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setCollapsed(!collapsed)}
            className="h-8 w-8 p-0"
          >
            {collapsed ? (
              <ChevronRight className="h-4 w-4" />
            ) : (
              <ChevronLeft className="h-4 w-4" />
            )}
          </Button>
        </div>
      </div>

      {/* Navigation */}
      <div className="flex-1 overflow-y-auto py-4">
        <nav className="space-y-1 px-3">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <Link
                key={item.href}
                to={item.href}
                className={cn(
                  'flex items-center px-3 py-2 rounded-lg text-sm font-medium transition-colors',
                  'hover:bg-muted hover:text-foreground',
                  isActive(item.href)
                    ? 'bg-primary text-primary-foreground shadow-sm'
                    : 'text-muted-foreground',
                  collapsed ? 'justify-center' : 'justify-start'
                )}
              >
                <Icon className={cn('h-4 w-4', !collapsed && 'mr-3')} />
                {!collapsed && <span>{item.title}</span>}
              </Link>
            );
          })}
        </nav>
      </div>

      {/* User Info */}
      {!collapsed && (
        <div className="p-4 border-t border-border">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center text-primary-foreground text-sm font-medium">
              {profile.first_name[0]}{profile.last_name[0]}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium truncate">
                {profile.first_name} {profile.last_name}
              </p>
              <p className="text-xs text-muted-foreground truncate">
                {profile.email}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};