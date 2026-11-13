"use client";

import { useSession } from "next-auth/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, LayoutDashboard, User, Search, Heart, MessageSquare, Settings, LogOut, Shield, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger, DropdownMenuSeparator, DropdownMenuLabel } from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import { getInitials } from "@/lib/utils";
import { signOut } from "next-auth/react";
import { useState } from "react";

const navigation = [
  { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { name: "My Profile", href: "/dashboard/profile", icon: User },
  { name: "Search", href: "/dashboard/search", icon: Search },
  { name: "Matches", href: "/dashboard/matches", icon: Heart },
  { name: "Messages", href: "/dashboard/messages", icon: MessageSquare },
  { name: "Settings", href: "/dashboard/settings", icon: Settings },
];

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const { data: session } = useSession();
  const pathname = usePathname();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  return (
    <div className="flex h-screen bg-background">
      {/* Sidebar */}
      <aside
        className={cn(
          "fixed left-0 top-16 z-40 h-[calc(100vh-4rem)] bg-card border-r transition-all duration-300 lg:relative lg:z-auto",
          sidebarOpen ? "w-64" : "w-0",
          sidebarCollapsed ? "w-20" : "w-64",
          "overflow-hidden"
        )}
        style={{ transform: sidebarOpen ? "translateX(0)" : "translateX(-100%)" }}
      >
        <nav className="flex h-full flex-col p-4">
          <ul className="flex-1 space-y-1">
            {navigation.map((item) => {
              const isActive = pathname === item.href || pathname.startsWith(item.href + "/");
              const Icon = item.icon;
              return (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className={cn(
                      "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                      isActive
                        ? "bg-primary text-primary-foreground"
                        : "text-muted-foreground hover:bg-accent hover:text-accent-foreground",
                      sidebarCollapsed && "justify-center"
                    )}
                    title={sidebarCollapsed ? item.name : undefined}
                  >
                    <Icon className="h-5 w-5 flex-shrink-0" />
                    {!sidebarCollapsed && <span>{item.name}</span>}
                  </Link>
                </li>
              );
            })}
          </ul>

          {session?.user && (session.user.role === "ADMIN" || session.user.role === "SUPER_ADMIN") && (
            <div className="border-t pt-4">
              <Link
                href="/admin"
                className={cn(
                  "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                  pathname.startsWith("/admin")
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:bg-accent hover:text-accent-foreground",
                  sidebarCollapsed && "justify-center"
                )}
                title={sidebarCollapsed ? "Admin Panel" : undefined}
              >
                <Shield className="h-5 w-5 flex-shrink-0" />
                {!sidebarCollapsed && <span>Admin Panel</span>}
              </Link>
            </div>
          )}

          <div className="border-t pt-4">
            <Button
              variant="outline"
              className={cn("w-full justify-start", sidebarCollapsed && "justify-center")}
              title={sidebarCollapsed ? "Logout" : undefined}
              onClick={() => signOut({ callbackUrl: "/" })}
            >
              <LogOut className="h-5 w-5 flex-shrink-0" />
              {!sidebarCollapsed && <span>Logout</span>}
            </Button>
          </div>
        </nav>

        {!sidebarCollapsed && (
          <Button
            variant="ghost"
            size="icon"
            className="absolute right-2 bottom-4 -translate-x-1/2"
            onClick={() => setSidebarCollapsed(true)}
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
        )}
      </aside>

      {/* Sidebar overlay for mobile */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-30 bg-black/50 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Main content */}
      <div className={cn("flex-1 flex flex-col overflow-hidden", sidebarCollapsed ? "lg:ml-20" : "lg:ml-64")}>
        {/* Top bar */}
        <header className="sticky top-0 z-20 flex h-16 items-center justify-between border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 px-4">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="icon"
              className="lg:hidden"
              onClick={() => setSidebarOpen(true)}
            >
              <Menu className="h-5 w-5" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="hidden lg:flex"
              onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
            >
              {sidebarCollapsed ? <ChevronRight className="h-5 w-5" /> : <ChevronLeft className="h-5 w-5" />}
            </Button>
          </div>

          <div className="flex items-center gap-4">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-9 w-9 rounded-full">
                  <Avatar className="h-9 w-9">
                    <AvatarImage src={session?.user?.image || ""} alt={session?.user?.name || ""} />
                    <AvatarFallback>{getInitials(session?.user?.name || "U")}</AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <div className="px-2 py-1">
                  <p className="text-sm font-medium">{session?.user?.name}</p>
                  <p className="text-xs text-muted-foreground">{session?.user?.email}</p>
                </div>
                <DropdownMenuSeparator />
                <DropdownMenuLabel>Account</DropdownMenuLabel>
                <DropdownMenuItem asChild>
                  <Link href="/dashboard/profile" className="flex items-center gap-2">
                    <User className="h-4 w-4" />
                    Profile
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/dashboard/settings" className="flex items-center gap-2">
                    <Settings className="h-4 w-4" />
                    Settings
                  </Link>
                </DropdownMenuItem>
                {session?.user && (session.user.role === "ADMIN" || session.user.role === "SUPER_ADMIN") && (
                  <>
                    <DropdownMenuSeparator />
                    <DropdownMenuLabel>Admin</DropdownMenuLabel>
                    <DropdownMenuItem asChild>
                      <Link href="/admin" className="flex items-center gap-2">
                        <Shield className="h-4 w-4" />
                        Admin Panel
                      </Link>
                    </DropdownMenuItem>
                  </>
                )}
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  onClick={() => signOut({ callbackUrl: "/" })}
                  className="text-destructive focus:text-destructive flex items-center gap-2"
                >
                  <LogOut className="h-4 w-4" />
                  Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 overflow-y-auto p-4 md:p-6 lg:p-8">
          {children}
        </main>
      </div>

      {/* Expand sidebar button when collapsed */}
      {sidebarCollapsed && (
        <Button
          variant="ghost"
          size="icon"
          className="fixed left-20 top-1/2 z-50 -translate-y-1/2 lg:hidden"
          onClick={() => setSidebarCollapsed(false)}
        >
          <ChevronRight className="h-5 w-5" />
        </Button>
      )}
    </div>
  );
}
