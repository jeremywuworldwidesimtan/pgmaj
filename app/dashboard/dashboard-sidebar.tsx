import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
} from "@/components/ui/sidebar";
import { Briefcase, CalendarDays, ClipboardCheck, Edit, HelpCircle, History, RefreshCw, Settings } from "lucide-react";

const navMain = [
  {
    title: "Applications",
    url: "#",
    items: [
      {
        title: "Applications Dashboard",
        url: "#",
        icon: Briefcase,
      },
    ],
  },
  {
    title: "Interviews",
    url: "#",
    items: [
      {
        title: "Scheduler",
        url: "#",
        icon: CalendarDays,
      },
      {
        title: "Interview Prep",
        url: "#",
        icon: ClipboardCheck,
      },
    ],
  },
  {
    title: "Resume",
    url: "#",
    items: [
      {
        title: "Work History",
        url: "#",
        icon: History,
      },
      {
        title: "Resume Designer",
        url: "#",
        icon: Edit,
      },
    ],
  },
  {
    title: "Settings",
    url: "#",
    items: [
      {
        title: "General",
        url: "#",
        icon: Settings,
      },
      {
        title: "Help",
        url: "#",
        icon: HelpCircle,
      },
      {
        title: "Changelog",
        url: "#",
        icon: RefreshCw,
      },
    ],
  },
];

export function DashboardSidebar() {
  return (
    <Sidebar>
      <SidebarHeader>
        <h1 className="text-xl font-bold px-2">PGMAJ Dashboard</h1>
      </SidebarHeader>
      <SidebarContent>
        {navMain.map((item, index) => (
          <SidebarGroup key={index}>
            <SidebarGroupLabel>{item.title}</SidebarGroupLabel>
            <SidebarMenu>
              {item.items?.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton className="flex items-center gap-2">
                    {item.icon && <item.icon />}
                    <span>{item.title}</span>
                  </SidebarMenuButton>
                  <SidebarMenuSub></SidebarMenuSub>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroup>
        ))}
      </SidebarContent>
      <SidebarFooter className="gap-0">
        <p className="text-sm text-muted-foreground px-2">Signed in as</p>
        <h2 className="text-lg font-bold px-2 py-0">Marty Wilson</h2>
      </SidebarFooter>
    </Sidebar>
  );
}
