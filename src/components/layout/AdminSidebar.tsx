import { NavLink, useLocation } from "react-router-dom";
import {
  Home,
  Users,
  Calendar,
  MapPin,
  FileText,
  BarChart3,
  Building2,
  Bell,
  Settings,
  Menu
} from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarHeader,
  SidebarTrigger,
  useSidebar,
} from "@/components/ui/sidebar";

const navigationItems = [
  { title: "Dashboard", url: "/", icon: Home },
  { title: "Employees", url: "/employees", icon: Users },
  { title: "Attendance", url: "/attendance", icon: Calendar },
  { title: "GPS Tracking", url: "/gps-tracking", icon: MapPin },
  { title: "Tasks", url: "/tasks", icon: FileText },
  { title: "Reports", url: "/reports", icon: BarChart3 },
  { title: "Clients/Leads", url: "/clients", icon: Building2 },
  { title: "Notifications", url: "/notifications", icon: Bell },
  { title: "Settings", url: "/settings", icon: Settings },
];

export function AdminSidebar() {
  const { state } = useSidebar();
  const location = useLocation();
  
  const collapsed = state === "collapsed";

  const isActive = (path: string) => {
    if (path === "/") {
      return location.pathname === "/";
    }
    return location.pathname.startsWith(path);
  };

  return (
    <Sidebar className={`${collapsed ? "w-16" : "w-64"} border-r bg-card shadow-lg transition-all duration-300`}>
      <SidebarHeader className="p-4 border-b bg-primary">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-primary-foreground rounded-lg flex items-center justify-center">
            <Building2 className="w-5 h-5 text-primary" />
          </div>
          {!collapsed && (
            <div>
              <h1 className="text-lg font-bold text-primary-foreground">HQ Admin</h1>
              <p className="text-xs text-primary-foreground/80">Management Panel</p>
            </div>
          )}
        </div>
      </SidebarHeader>

      <SidebarContent className="py-4">
        <SidebarGroup>
          <SidebarGroupLabel className={`${collapsed ? "sr-only" : "px-4 text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2"}`}>
            Navigation
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu className="space-y-1 px-2">
              {navigationItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild className="w-full">
                    <NavLink
                      to={item.url}
                      end={item.url === "/"}
                      className={({ isActive: navIsActive }) =>
                        `flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200 text-sm font-medium ${
                          navIsActive || isActive(item.url)
                            ? "bg-primary text-primary-foreground shadow-md"
                            : "text-foreground hover:bg-accent hover:text-accent-foreground"
                        }`
                      }
                    >
                      <item.icon className={`w-5 h-5 ${collapsed ? "mx-auto" : ""}`} />
                      {!collapsed && <span className="truncate">{item.title}</span>}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}