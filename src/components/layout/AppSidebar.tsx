import { useState } from "react";
import { 
  Calendar, 
  BookOpen, 
  Users, 
  GraduationCap, 
  ClipboardList, 
  DollarSign, 
  MessageSquare, 
  BarChart3, 
  Settings, 
  Home,
  ChevronLeft,
  ChevronRight,
  Bell,
  FileText,
  MapPin,
  School,
  UserCheck,
  BookOpenCheck,
  Clock,
  TrendingUp,
  CreditCard
} from "lucide-react";
import { NavLink, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/useAuth";
import { ROUTES } from "@/utils/routes";

// Navigation items based on user role
const getNavigationItems = (role: string) => {
  const commonItems = [
    {
      title: "Dashboard",
      href: role === 'ADMIN' ? ROUTES.ADMIN.HOME : role === 'TEACHER' ? ROUTES.TEACHER.HOME : ROUTES.STUDENT.HOME,
      icon: Home,
      color: "text-primary"
    },
  ];

  if (role === 'ADMIN') {
    return [
      ...commonItems,
      {
        title: "Users & Roles",
        href: ROUTES.ADMIN.USERS,
        icon: Users,
        color: "text-secondary"
      },
      {
        title: "Classes",
        href: ROUTES.ADMIN.CLASSES,
        icon: School,
        color: "text-accent-science"
      },
      {
        title: "Subjects",
        href: ROUTES.ADMIN.SUBJECTS,
        icon: BookOpen,
        color: "text-accent-arts"
      },
      {
        title: "Timetable",
        href: ROUTES.ADMIN.TIMETABLE,
        icon: ClipboardList,
        color: "text-accent-math"
      },
      {
        title: "Attendance",
        href: ROUTES.ADMIN.ATTENDANCE,
        icon: UserCheck,
        color: "text-warning"
      },
      {
        title: "Assessments",
        href: ROUTES.ADMIN.ASSESSMENTS,
        icon: BookOpenCheck,
        color: "text-destructive"
      },
      {
        title: "Homework",
        href: ROUTES.ADMIN.HOMEWORK,
        icon: FileText,
        color: "text-info"
      },
      {
        title: "Materials",
        href: ROUTES.ADMIN.MATERIALS,
        icon: BookOpen,
        color: "text-accent-arts"
      },
      {
        title: "Announcements",
        href: ROUTES.ADMIN.ANNOUNCEMENTS,
        icon: Bell,
        color: "text-primary"
      },
      {
        title: "Fees & Invoices",
        href: ROUTES.ADMIN.FEES,
        icon: CreditCard,
        color: "text-success"
      },
      {
        title: "Appointments",
        href: ROUTES.ADMIN.APPOINTMENTS,
        icon: Calendar,
        color: "text-primary"
      },
      {
        title: "Complaints",
        href: ROUTES.ADMIN.COMPLAINTS,
        icon: MessageSquare,
        color: "text-warning"
      },
      {
        title: "Analytics",
        href: ROUTES.ADMIN.ANALYTICS,
        icon: BarChart3,
        color: "text-accent-arts"
      },
      {
        title: "Settings",
        href: ROUTES.ADMIN.SETTINGS,
        icon: Settings,
        color: "text-muted-foreground"
      }
    ];
  }

  if (role === 'TEACHER') {
    return [
      ...commonItems,
      {
        title: "My Classes",
        href: ROUTES.TEACHER.CLASSES,
        icon: School,
        color: "text-secondary"
      },
      {
        title: "Attendance",
        href: ROUTES.TEACHER.ATTENDANCE,
        icon: UserCheck,
        color: "text-warning"
      },
      {
        title: "Assessments",
        href: ROUTES.TEACHER.ASSESSMENTS,
        icon: BookOpenCheck,
        color: "text-destructive"
      },
      {
        title: "Homework",
        href: ROUTES.TEACHER.HOMEWORK,
        icon: FileText,
        color: "text-info"
      },
      {
        title: "Materials",
        href: ROUTES.TEACHER.MATERIALS,
        icon: BookOpen,
        color: "text-accent-arts"
      },
      {
        title: "Announcements",
        href: ROUTES.TEACHER.ANNOUNCEMENTS,
        icon: Bell,
        color: "text-primary"
      },
      {
        title: "Appointments",
        href: ROUTES.TEACHER.APPOINTMENTS,
        icon: Calendar,
        color: "text-primary"
      },
      {
        title: "Messages",
        href: ROUTES.TEACHER.MESSAGES,
        icon: MessageSquare,
        color: "text-info"
      },
      {
        title: "Calendar",
        href: ROUTES.TEACHER.CALENDAR,
        icon: Calendar,
        color: "text-accent-math"
      }
    ];
  }

  if (role === 'PARENT' || role === 'STUDENT') {
    return [
      ...commonItems,
      {
        title: "Attendance",
        href: ROUTES.STUDENT.ATTENDANCE,
        icon: UserCheck,
        color: "text-warning"
      },
      {
        title: "Marks & Results",
        href: ROUTES.STUDENT.MARKS,
        icon: TrendingUp,
        color: "text-destructive"
      },
      {
        title: "Homework & Materials",
        href: ROUTES.STUDENT.HOMEWORK_MATERIALS,
        icon: BookOpen,
        color: "text-accent-arts"
      },
      {
        title: "Announcements",
        href: ROUTES.STUDENT.ANNOUNCEMENTS,
        icon: Bell,
        color: "text-primary"
      },
      {
        title: "Appointments",
        href: ROUTES.STUDENT.APPOINTMENTS,
        icon: Calendar,
        color: "text-primary"
      },
      {
        title: "Fees & Payments",
        href: ROUTES.STUDENT.FEES,
        icon: CreditCard,
        color: "text-success"
      },
      {
        title: "Messages",
        href: ROUTES.STUDENT.MESSAGES,
        icon: MessageSquare,
        color: "text-info"
      },
      {
        title: "Calendar",
        href: ROUTES.STUDENT.CALENDAR,
        icon: Calendar,
        color: "text-accent-math"
      }
    ];
  }

  // Default navigation for non-authenticated users
  return [
    {
      title: "Dashboard",
      href: "/",
      icon: Home,
      color: "text-primary"
    },
    {
      title: "Calendar",
      href: "/calendar",
      icon: Calendar,
      color: "text-primary"
    },
    {
      title: "Timetable",
      href: "/timetable",
      icon: ClipboardList,
      color: "text-accent-math"
    }
  ];
};

export function AppSidebar() {
  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation();
  const { profile } = useAuth();
  
  const navigationItems = getNavigationItems(profile?.role || 'GUEST');

  const isActive = (path: string) => {
    if (path === "/") {
      return location.pathname === "/";
    }
    return location.pathname.startsWith(path);
  };

  return (
    <div 
      className={cn(
        "flex flex-col h-screen bg-sidebar border-r border-sidebar-border transition-all duration-300",
        collapsed ? "w-16" : "w-64"
      )}
    >
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-sidebar-border">
        {!collapsed && (
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center">
              <GraduationCap className="w-5 h-5 text-white" />
            </div>
            <div>
              <h1 className="text-lg font-semibold text-sidebar-foreground">
                EduPlan
              </h1>
              <p className="text-xs text-sidebar-accent-foreground">
                School Management
              </p>
            </div>
          </div>
        )}
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setCollapsed(!collapsed)}
          className="text-sidebar-foreground hover:bg-sidebar-accent"
        >
          {collapsed ? (
            <ChevronRight className="w-4 h-4" />
          ) : (
            <ChevronLeft className="w-4 h-4" />
          )}
        </Button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-3 space-y-1">
        {navigationItems.map((item) => {
          const Icon = item.icon;
          const active = isActive(item.href);
          
          return (
            <NavLink
              key={item.href}
              to={item.href}
              className={cn(
                "flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 group",
                active
                  ? "bg-sidebar-primary text-sidebar-primary-foreground shadow-sm"
                  : "text-sidebar-accent-foreground hover:bg-sidebar-accent hover:text-sidebar-foreground"
              )}
            >
              <Icon 
                className={cn(
                  "w-5 h-5 transition-colors",
                  active ? "text-sidebar-primary-foreground" : item.color
                )} 
              />
              {!collapsed && (
                <span className="truncate">{item.title}</span>
              )}
              {!collapsed && active && (
                <div className="ml-auto w-2 h-2 bg-sidebar-primary-foreground rounded-full" />
              )}
            </NavLink>
          );
        })}
      </nav>

      {/* Quick Actions */}
      {!collapsed && (
        <div className="p-3 border-t border-sidebar-border">
          <div className="space-y-2">
            <Button 
              size="sm" 
              className="w-full justify-start bg-gradient-primary hover:opacity-90"
            >
              <Bell className="w-4 h-4 mr-2" />
              Notifications
            </Button>
            <Button 
              size="sm" 
              variant="outline"
              className="w-full justify-start border-sidebar-border text-sidebar-foreground hover:bg-sidebar-accent"
            >
              <MapPin className="w-4 h-4 mr-2" />
              Quick Tour
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}