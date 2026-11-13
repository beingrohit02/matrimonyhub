"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, Users, Shield, FileText, BarChart3, Settings, LogOut, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger, DropdownMenuSeparator } from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import { getInitials } from "@/lib/utils";
import { signOut } from "next-auth/react";
import { useState } from "react";

const adminNavigation = [
  { name: "Dashboard", href: "/admin", icon: LayoutDashboard },
  { name: "Users", href: "/admin/users", icon: Users },
  { name: "Reports", href: "/admin/reports", icon: Shield },
  { name: "Content", href: "/admin/content", icon: FileText },
  { name: "Analytics", href: "/admin/analytics", icon: BarChart3 },
  { name: "Settings", href: "/admin/settings", icon: Settings },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const { data: session } = useSession();
  const router = useRouter();
  const pathname = usePathname();
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  if (!session?.user || (session.user.role !== "ADMIN" && session.user.role !== "SUPER_ADMIN")) {
    router.push("/dashboard");
    return null;
  }

  return (
    <div className="flex h-screen bg-background">
      {/* Sidebar */}
      <aside className={cn("fixed left-0 top-16 z-40 h-[calc(100vh-4rem)] bg-card border-r transition-all duration-300 lg:relative lg:z-auto", sidebarCollapsed ? "w-20" : "w-64")}>
        <nav className="flex h-full flex-col p-4">
          <div className="flex items-center justify-between mb-6">
            <span className={cn("font-semibold", sidebarCollapsed && "hidden")}>Admin Panel</span>
            <Button
              variant="ghost"
              size="icon"
              className="hidden lg:flex"
              onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
            >
              {sidebarCollapsed ? <ChevronRight className="h-5 w-5" /> : <ChevronLeft className="h-5 w-5" />}
            </Button>
          </div>
          <ul className="flex-1 space-y-1">
            {adminNavigation.map((item) => {
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

          <div className="border-t pt-4">
            <Button
              variant="outline"
              className={cn("w-full justify-start", sidebarCollapsed && "justify-center")}
              onClick={() => signOut({ callbackUrl: "/" })}
            >
              <LogOut className="h-5 w-5 flex-shrink-0" />
              {!sidebarCollapsed && <span>Logout</span>}
            </Button>
          </div>
        </nav>
      </aside>

      {/* Main content */}
      <div className={cn("flex-1 flex flex-col overflow-hidden", sidebarCollapsed ? "lg:ml-20" : "lg:ml-64")}>
        {/* Top bar */}
        <header className="sticky top-0 z-20 flex h-16 items-center justify-between border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 px-4">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="icon"
              className="hidden lg:flex"
              onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
            >
              {sidebarCollapsed ? <ChevronRight className="h-5 w-5" /> : <ChevronLeft className="h-5 w-5" />}
            </Button>
            <h1 className="text-xl font-bold">Admin Panel</h1>
          </div>

          <div className="flex items-center gap-4">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-9 w-9 rounded-full">
                  <Avatar className="h-9 w-9">
                    <AvatarImage src={session?.user?.image || ""} alt={session?.user?.name || ""} />
                    <AvatarFallback>{getInitials(session?.user?.name || "A")}</AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <div className="px-2 py-1">
                  <p className="text-sm font-medium">{session?.user?.name}</p>
                  <p className="text-xs text-muted-foreground">{session?.user?.email}</p>
                  <Badge variant="secondary" className="mt-1">{session?.user?.role}</Badge>
                </div>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link href="/dashboard" className="flex items-center gap-2">
                    <LayoutDashboard className="h-4 w-4" />
                    User Dashboard
                  </Link>
                </DropdownMenuItem>
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
    </div>
  );
}
