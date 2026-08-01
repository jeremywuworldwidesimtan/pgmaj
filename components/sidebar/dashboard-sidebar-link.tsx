"use client";

import { useSidebar } from "@/components/ui/sidebar";
import Link from "next/link";

export function DashboardSidebarLink({
  children,
  href,
}: Readonly<{
  children: React.ReactNode;
  href: string;
}>) {
  const { isMobile, setOpenMobile } = useSidebar();

  function handleClick() {
    if (isMobile) {
      setOpenMobile(false);
    }
  }

  return (
    <Link href={href} onClick={handleClick} className="flex items-center gap-2">
      {children}
    </Link>
  );
}
