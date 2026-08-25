import { Link, useRouterState } from "@tanstack/react-router";
import {
  LayoutDashboard,
  Shirt,
  Sparkles,
  MessageSquareText,
  Megaphone,
  ListChecks,
  Bot,
  Settings,
} from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { Logo } from "@/components/Logo";

const items = [
  { title: "Dashboard", url: "/", icon: LayoutDashboard },
  { title: "Product Catalogue", url: "/products", icon: Shirt },
  { title: "AI Product Generator", url: "/product-generator", icon: Sparkles },
  { title: "Customer Responses", url: "/responses", icon: MessageSquareText },
  { title: "Social Media Generator", url: "/social", icon: Megaphone },
  { title: "Task Planner", url: "/tasks", icon: ListChecks },
  { title: "AI Chatbot", url: "/chatbot", icon: Bot },
  { title: "Settings", url: "/settings", icon: Settings },
] as const;

export function AppSidebar() {
  const pathname = useRouterState({ select: (r) => r.location.pathname });

  return (
    <Sidebar collapsible="icon">
      <SidebarHeader className="border-b border-sidebar-border">
        <div className="flex items-center gap-3 px-1 py-2">
          <Logo className="h-10 w-10 ring-1 ring-gold" />
          <div className="min-w-0 group-data-[collapsible=icon]:hidden">
            <p className="brand-title truncate text-base leading-tight text-sidebar-foreground">
              ALG Collections
            </p>
            <p className="truncate text-[10px] uppercase tracking-[0.2em] text-sidebar-primary">
              AI Assistant
            </p>
          </div>
        </div>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Workspace</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.url}>
                  <SidebarMenuButton asChild isActive={pathname === item.url} tooltip={item.title}>
                    <Link to={item.url}>
                      <item.icon className="h-4 w-4" />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="border-t border-sidebar-border">
        <p className="px-2 py-1 text-[10px] leading-relaxed text-sidebar-foreground/60 group-data-[collapsible=icon]:hidden">
          Always review AI content before sending or publishing.
        </p>
      </SidebarFooter>
    </Sidebar>
  );
}
