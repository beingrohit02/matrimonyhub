"use client";

import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import { Menu, X, User, LogOut, LayoutDashboard, Settings, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger, DropdownMenuSeparator } from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import { getInitials } from "@/lib/utils";

export function Header() {
  const { data: session, status } = useSession();
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);

  if (status === "loading") {
    return (
      <header className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between px-4">
          <Link href="/" className="text-xl font-bold">MatrimonyHub</Link>
        </div>
      </header>
    );
  }

  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between px-4">
        <Link href="/" className="text-xl font-bold text-primary">MatrimonyHub</Link>

        <nav className="hidden md:flex items-center gap-6">
          {session?.user ? (
            <>
              <Link href="/dashboard" className="text-sm font-medium hover:text-primary transition-colors">
                Dashboard
              </Link>
              <Link href="/dashboard/search" className="text-sm font-medium hover:text-primary transition-colors">
                Search
              </Link>
              <Link href="/dashboard/matches" className="text-sm font-medium hover:text-primary transition-colors">
                Matches
              </Link>
              <Link href="/dashboard/messages" className="text-sm font-medium hover:text-primary transition-colors">
                Messages
              </Link>
            </>
          ) : (
            <>
              <Link href="/login" className="text-sm font-medium hover:text-primary transition-colors">
                Login
              </Link>
              <Button asChild variant="default">
                <Link href="/register">Register Free</Link>
              </Button>
            </>
          )}
        </nav>

        <div className="flex items-center gap-4">
          {session?.user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-9 w-9 rounded-full">
                  <Avatar className="h-9 w-9">
                    <AvatarImage src={session.user.image || ""} alt={session.user.name || ""} />
                    <AvatarFallback>{getInitials(session.user.name || "U")}</AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <div className="px-2 py-1">
                  <p className="text-sm font-medium">{session.user.name}</p>
                  <p className="text-xs text-muted-foreground">{session.user.email}</p>
                </div>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link href="/dashboard" className="flex items-center gap-2">
                    <LayoutDashboard className="h-4 w-4" />
                    Dashboard
                  </Link>
                </DropdownMenuItem>
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
                {(session.user.role === "ADMIN" || session.user.role === "SUPER_ADMIN") && (
                  <>
                    <DropdownMenuSeparator />
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
          ) : (
            <>
              <Button asChild variant="ghost" size="sm">
                <Link href="/login">Login</Link>
              </Button>
              <Button asChild size="sm">
                <Link href="/register">Register Free</Link>
              </Button>
            </>
          )}

          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>
      </div>

      {mobileMenuOpen && (
        <div className="md:hidden border-t px-4 py-4 space-y-4">
          {session?.user ? (
            <>
              <Link href="/dashboard" className="block text-sm font-medium hover:text-primary">Dashboard</Link>
              <Link href="/dashboard/search" className="block text-sm font-medium hover:text-primary">Search</Link>
              <Link href="/dashboard/matches" className="block text-sm font-medium hover:text-primary">Matches</Link>
              <Link href="/dashboard/messages" className="block text-sm font-medium hover:text-primary">Messages</Link>
              <Link href="/dashboard/profile" className="block text-sm font-medium hover:text-primary">Profile</Link>
              <Link href="/dashboard/settings" className="block text-sm font-medium hover:text-primary">Settings</Link>
              {(session.user.role === "ADMIN" || session.user.role === "SUPER_ADMIN") && (
                <Link href="/admin" className="block text-sm font-medium hover:text-primary">Admin Panel</Link>
              )}
              <Button variant="outline" onClick={() => signOut({ callbackUrl: "/" })} className="w-full">
                Logout
              </Button>
            </>
          ) : (
            <>
              <Button asChild variant="outline" className="w-full">
                <Link href="/login">Login</Link>
              </Button>
              <Button asChild className="w-full">
                <Link href="/register">Register Free</Link>
              </Button>
            </>
          )}
        </div>
      )}
    </header>
  );
}
