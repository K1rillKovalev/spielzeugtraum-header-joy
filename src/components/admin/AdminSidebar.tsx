import {
  LayoutDashboard,
  Users,
  Database,
  BarChart3,
  Settings,
  Package,
} from "lucide-react";
import { NavLink } from "@/components/NavLink";
import { useLocation } from "react-router-dom";
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
  useSidebar,
} from "@/components/ui/sidebar";

const navItems = [
  { title: "Dashboard", url: "/admin", icon: LayoutDashboard },
  { title: "User Management", url: "/admin/users", icon: Users },
  { title: "Data Management", url: "/admin/data", icon: Database },
  { title: "Statistics", url: "/admin/stats", icon: BarChart3 },
  { title: "System Settings", url: "/admin/settings", icon: Settings },
];

export function AdminSidebar() {
  const { state } = useSidebar();
  const collapsed = state === "collapsed";
  const location = useLocation();

  return (
    <Sidebar collapsible="icon">
      <SidebarHeader className="p-4 border-b border-sidebar-border">
        <div className="flex items-center gap-2">
          <Package className="h-7 w-7 text-admin-cta shrink-0" />
          {!collapsed && (
            <span className="font-display text-lg font-bold text-sidebar-primary-foreground truncate">
              SpielzeugTraum
            </span>
          )}
        </div>
        {!collapsed && (
          <span className="text-xs text-sidebar-foreground/60 mt-1">
            Admin Panel
          </span>
        )}
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="text-sidebar-foreground/50 text-xs uppercase tracking-wider">
            Navigation
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {navItems.map((item) => {
                const isActive =
                  item.url === "/admin"
                    ? location.pathname === "/admin"
                    : location.pathname.startsWith(item.url);
                return (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton
                      asChild
                      isActive={isActive}
                      tooltip={item.title}
                    >
                      <NavLink
                        to={item.url}
                        end={item.url === "/admin"}
                        className="hover:bg-sidebar-accent/50 transition-colors"
                        activeClassName="bg-sidebar-accent text-sidebar-accent-foreground font-semibold"
                      >
                        <item.icon className="h-5 w-5 shrink-0" />
                        {!collapsed && <span>{item.title}</span>}
                      </NavLink>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
