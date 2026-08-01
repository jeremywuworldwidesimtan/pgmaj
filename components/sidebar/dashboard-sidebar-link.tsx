"use client";

import { useSidebar } from "@/components/ui/sidebar";
import Link from "next/link";

export function DashboardSidebarLink({
  children,
  href,
  className,
}: Readonly<{
  children: React.ReactNode;
  href: string;
  className?: string;
}>) {
  const { isMobile, setOpenMobile } = useSidebar();

  function handleClick() {
    if (isMobile) {
      setOpenMobile(false);
    }
  }

  return (
    <Link href={href} onClick={handleClick} className={className}>
      {children}
    </Link>
  );
}
