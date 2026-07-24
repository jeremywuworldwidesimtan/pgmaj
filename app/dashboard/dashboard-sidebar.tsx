import { SidebarUser } from "@/components/sidebar/sidebar-user";
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
import { Briefcase, CalendarDays, ClipboardCheck, Edit, HelpCircle, History, Info, RefreshCw, Settings } from "lucide-react";
import Link from "next/link";
import { VERSION } from "../global-values";

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
  // {
  //   title: "Interviews",
  //   items: [
  //     {
  //       title: "Scheduler",
  //       url: "/dashboard/interview/scheduler",
  //       icon: CalendarDays,
  //     },
  //     {
  //       title: "Interview Prep",
  //       url: "/dashboard/interview/prep",
  //       icon: ClipboardCheck,
  //     },
  //   ],
  // },
  // {
  //   title: "Resume",
  //   items: [
  //     {
  //       title: "Experience",
  //       url: "/dashboard/resume/experience",
  //       icon: History,
  //     },
  //     {
  //       title: "Resume Information",
  //       url: "/dashboard/resume/information",
  //       icon: Info, 
  //     },
  //     {
  //       title: "Resume Designer",
  //       url: "/dashboard/resume/designer",
  //       icon: Edit,
  //     },
  //   ],
  // }
];

export function DashboardSidebar() {
    const currentDate = new Date();
  return (
    <Sidebar>
      <SidebarHeader className="gap-0">
        <h1 className="text-xl font-bold px-2">PGMAJ<sup>{VERSION}</sup></h1>
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
        <SidebarUser user={{
            name: "Marty Wilson",
            email: "marty@example.com",
            avatar: "/path/to/avatar.jpg",
        }}/>
      </SidebarFooter>
    </Sidebar>
  );
}
