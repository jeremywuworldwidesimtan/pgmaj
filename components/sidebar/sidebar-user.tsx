import {
  BadgeCheck,
  Bell,
  ChevronsUpDown,
  Coins,
  CreditCard,
  HelpCircle,
  LogOut,
  RefreshCw,
  Settings,
  Sparkles,
  User,
} from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import Link from "next/link";
import { logout } from "@/app/actions/auth";

const dropdownNav = [
  {
    title: "Profile",
    url: "/dashboard/profile",
    icon: User,
  },
  {
    title: "General Settings",
    url: "/dashboard/settings/general",
    icon: Settings,
  },
  {
    title: "Account Settings",
    url: "/dashboard/settings/account",
    icon: BadgeCheck,
  },
  {
    title: "Billing",
    url: "/dashboard/settings/billing",
    icon: CreditCard,
  },
];

export function SidebarUser({
  user,
}: {
  user: {
    name: string;
    email: string;
    avatar: string;
    credits: number;
  };
}) {
  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size="lg"
              className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
            >
              <Avatar className="h-8 w-8 rounded-lg">
                <AvatarImage className="grayscale" src={user.avatar} alt={user.name} />
                <AvatarFallback className="rounded-lg">
                  {user.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </AvatarFallback>
              </Avatar>
              <div className="grid flex-1 text-left text-sm leading-tight">
                <p className="text-sm text-muted-foreground px-2 py-0">
                  Signed in as
                </p>
                <h2 className="text-lg font-bold px-2 py-0">{user.name}</h2>
              </div>
              <ChevronsUpDown className="ml-auto size-4" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg"
            side="right"
            align="end"
            sideOffset={4}
          >
            <DropdownMenuLabel className="p-0 font-normal">
              <div className="flex items-center gap-2 px-2 py-2 text-left text-sm">
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate text-medium font-bold">
                    {user.name}
                  </span>
                  <span className="truncate text-xs">{user.email}</span>
                </div>
                <div className="flex items-center gap-1 rounded-md bg-muted px-2 py-1 text-muted-foreground">
                  <Coins className="size-4" />
                  <span className="text-sm font-bold">{user.credits}</span>
                </div>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              {dropdownNav.map((item) => (
                <Link
                  key={item.title}
                  href={item.url}
                  className="w-full h-full"
                >
                  <DropdownMenuItem>
                    {item.icon && <item.icon />}
                    {item.title}
                  </DropdownMenuItem>
                </Link>
              ))}
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <Link href="/kb">
                <DropdownMenuItem>
                  <HelpCircle />
                  Help
                </DropdownMenuItem>
              </Link>
              <Link href="/kb/changelog">
                <DropdownMenuItem>
                  <RefreshCw />
                  Changelog
                </DropdownMenuItem>
              </Link>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={logout}>
              <LogOut />
              Log out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
