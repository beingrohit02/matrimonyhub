import { auth } from "@/lib/auth";

export default auth((req) => {
  const isLoggedIn = !!req.auth;
  const isOnDashboard = req.nextUrl.pathname.startsWith("/dashboard");
  const isOnAdmin = req.nextUrl.pathname.startsWith("/admin");
  const isOnAuth = req.nextUrl.pathname.startsWith("/login") || req.nextUrl.pathname.startsWith("/register");

  if (isOnAuth && isLoggedIn) {
    return Response.redirect(new URL("/dashboard", req.nextUrl));
  }

  if (isOnDashboard && !isLoggedIn) {
    return Response.redirect(new URL("/login", req.nextUrl));
  }

  if (isOnAdmin && (!isLoggedIn || req.auth.user.role !== "ADMIN" && req.auth.user.role !== "SUPER_ADMIN")) {
    return Response.redirect(new URL("/dashboard", req.nextUrl));
  }

  return;
});

export const config = {
  matcher: ["/dashboard/:path*", "/admin/:path*", "/login", "/register"]
};
