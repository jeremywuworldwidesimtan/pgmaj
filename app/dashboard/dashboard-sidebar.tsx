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
} from "@/components/ui/sidebar";
import { VERSION } from "../global-values";
import { verifySession } from "../lib/dal";
import { getUser } from "../actions/getUserInfo";
import { navMain } from "./dashboard-nav";
import { DashboardSidebarLink } from "../../components/sidebar/dashboard-sidebar-link";

export async function DashboardSidebar() {
  const currentDate = new Date();
  const session = await verifySession();
  // Fetch user-specific data from your database or data source
  const user = await getUser(session.userId);

  return (
    <Sidebar>
      <SidebarHeader className="gap-0">
        <div className="flex flex-col justify-between">
          <h1 className="text-xl font-bold px-2">PGMAJ<sup>{VERSION}</sup></h1>
        </div>
        <p className="text-sm text-muted-foreground px-2">{currentDate.toLocaleDateString('en-GB', { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric' })}</p>
      </SidebarHeader>
      <SidebarContent>
        {navMain.map((item, index) => (
          <SidebarGroup key={index}>
            <SidebarGroupLabel>{item.title}</SidebarGroupLabel>
            <SidebarMenu className="flex flex-col gap-2">
              {item.items?.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <DashboardSidebarLink href={item.url}>
                      {item.icon && <item.icon className="h-4 w-4" />}
                      <span className="text-sm">{item.title}</span>
                    </DashboardSidebarLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroup>
        ))}
      </SidebarContent>
      <SidebarFooter className="gap-0">
        <SidebarUser user={{
            name: (user?.firstName && user?.lastName) ? `${user.firstName} ${user.lastName}` : user?.username || "User",
            email: user?.email || "",
            avatar: "/placeholder.png",
            credits: user?.credits || 0
        }}/>
      </SidebarFooter>
    </Sidebar>
  );
}
