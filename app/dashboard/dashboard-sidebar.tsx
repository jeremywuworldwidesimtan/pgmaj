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
import Link from "next/link";

const navMain = [
  {
    title: "Applications",
    items: [
      {
        title: "Applications Dashboard",
        url: "/dashboard",
        icon: Briefcase,
      },
    ],
  },
  {
    title: "Interviews",
    items: [
      {
        title: "Scheduler",
        url: "/dashboard/interview/scheduler",
        icon: CalendarDays,
      },
      {
        title: "Interview Prep",
        url: "/dashboard/interview/prep",
        icon: ClipboardCheck,
      },
    ],
  },
  {
    title: "Resume",
    items: [
      {
        title: "Work History",
        url: "/dashboard/resume/work-history",
        icon: History,
      },
      {
        title: "Resume Designer",
        url: "/dashboard/resume/designer",
        icon: Edit,
      },
    ],
  },
  {
    title: "Settings",
    items: [
      {
        title: "General",
        url: "/dashboard/settings/general",
        icon: Settings,
      },
      {
        title: "Help",
        url: "/dashboard/settings/help",
        icon: HelpCircle,
      },
      {
        title: "Changelog",
        url: "/dashboard/settings/changelog",
        icon: RefreshCw,
      },
    ],
  },
];

export function DashboardSidebar() {
    const currentDate = new Date();
  return (
    <Sidebar>
      <SidebarHeader className="gap-0">
        <h1 className="text-xl font-bold px-2">PGMAJ Dashboard</h1>
        <p className="text-sm text-muted-foreground px-2">{currentDate.toLocaleDateString('en-GB', { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric' })}</p>
      </SidebarHeader>
      <SidebarContent>
        {navMain.map((item, index) => (
          <SidebarGroup key={index}>
            <SidebarGroupLabel>{item.title}</SidebarGroupLabel>
            <SidebarMenu>
              {item.items?.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton className="flex items-center gap-2">
                    <Link href={item.url} className="flex items-center gap-2">
                        {item.icon && <item.icon />}
                        <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
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
