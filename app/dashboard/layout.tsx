import { SidebarInset, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { DashboardSidebar } from "./dashboard-sidebar";
export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <SidebarProvider>
      <DashboardSidebar />
      <SidebarTrigger size="lg" />
      <SidebarInset className="py-8 pr-8">
        {children}
      </SidebarInset>
    </SidebarProvider>
  );
}
