import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { DashboardSidebar } from "./dashboard-sidebar";
import { Metadata } from "next";
import { UserProvider } from "../context/UserContext";
import { VERSION } from "../global-values";

export const metadata: Metadata = {
  title: {
    default: "PGMAJ Dashboard",
    template: "%s | PGMAJ Dashboard",
  },
  description:
    "Dashboard - Please Give Me A Job - the centralized job application management platform.",
};

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <UserProvider>
      <SidebarProvider>
        <DashboardSidebar />
        <SidebarInset className="min-w-0">
          <header className="flex h-14 shrink-0 items-center border-b gap-4 px-4 md:px-6">
            <SidebarTrigger />
            <h2 className="text-lg font-bold">PGMAJ<sup className="inline lg:hidden">{VERSION}</sup> Dashboard</h2>
          </header>
          <div className="flex min-w-0 flex-1 flex-col p-4">{children}</div>
        </SidebarInset>
      </SidebarProvider>
    </UserProvider>
  );
}
