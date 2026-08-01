import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { DashboardSidebar } from "./dashboard-sidebar";
export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <SidebarProvider>
      <DashboardSidebar />
      <SidebarInset className="min-w-0">
        <header className="flex h-14 shrink-0 items-center gap-4 border-b px-4 md:px-6">
          <SidebarTrigger />
          <h2 className="text-lg font-bold">PGMAJ</h2>
        </header>
        <div className="flex min-w-0 flex-1 flex-col p-4">
          {children}
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
