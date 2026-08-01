import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { DashboardSidebar } from "./dashboard-sidebar";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "PGMAJ Dashboard",
  description: "Dashboard - Please Give Me A Job - the centralized job application management platform.",
};

export default function DashboardLayout({
  title: titleProp,
  children,
}: Readonly<{
  title?: string;
  children: React.ReactNode;
}>) {
  // use metadata title if title is provided, otherwise use default title
  const title = titleProp || metadata.title?.toString() || "PGMAJ";
  return (
    <SidebarProvider>
      <DashboardSidebar />
      <SidebarInset className="min-w-0">
        <header className="flex h-14 shrink-0 items-center gap-4 border-b px-4 md:px-6">
          <SidebarTrigger />
          <h2 className="text-lg font-bold">{title}</h2>
        </header>
        <div className="flex min-w-0 flex-1 flex-col p-4">
          {children}
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
