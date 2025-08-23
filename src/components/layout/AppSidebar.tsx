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
  MapPin
} from "lucide-react";
import { NavLink, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

const navigationItems = [
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
  },
  {
    title: "Students",
    href: "/students",
    icon: Users,
    color: "text-secondary"
  },
  {
    title: "Teachers",
    href: "/teachers",
    icon: GraduationCap,
    color: "text-accent-science"
  },
  {
    title: "Assignments",
    href: "/assignments",
    icon: BookOpen,
    color: "text-accent-arts"
  },
  {
    title: "Exams",
    href: "/exams",
    icon: FileText,
    color: "text-destructive"
  },
  {
    title: "Attendance",
    href: "/attendance",
    icon: ClipboardList,
    color: "text-warning"
  },
  {
    title: "Fees",
    href: "/fees",
    icon: DollarSign,
    color: "text-success"
  },
  {
    title: "Messages",
    href: "/messages",
    icon: MessageSquare,
    color: "text-info"
  },
  {
    title: "Analytics",
    href: "/analytics",
    icon: BarChart3,
    color: "text-accent-arts"
  },
  {
    title: "Settings",
    href: "/settings",
    icon: Settings,
    color: "text-muted-foreground"
  }
];

export function AppSidebar() {
  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation();

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