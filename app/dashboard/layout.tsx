import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { DashboardSidebar } from "./dashboard-sidebar";
export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <SidebarProvider>
      <DashboardSidebar />
      <main className="flex flex-col">
        <SidebarTrigger />
        {children}
      </main>
    </SidebarProvider>
  );
}
