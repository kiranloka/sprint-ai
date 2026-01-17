"use client";

import {
  BarChart2,
  ClipboardList,
  LayoutDashboard,
  Mail,
  Search,
} from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

// Menu items.
const items = [
  {
    title: "Dashboard",
    url: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "Lead Discovery",
    url: "/leads",
    icon: Search,
  },
  {
    title: "Lists",
    url: "/lists",
    icon: ClipboardList,
  },
  {
    title: "Campaigns",
    url: "/campaigns",
    icon: Mail,
  },
  {
    title: "Analytics",
    url: "/analytics",
    icon: BarChart2,
  },
];

export default function SideNav() {
  return (
    <Sidebar>
      <SidebarHeader className="p-4">
        <h2 className="text-xl font-bold tracking-tight px-2">sprint AI</h2>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Application</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <a href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </a>
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
