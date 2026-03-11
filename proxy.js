import { NextResponse } from "next/server";

export const config = {
  matcher: ["/admin/:path*", "/api/:path*"],
};

export function proxy(request) {
  const path = request.nextUrl.pathname;
  const method = request.method;

  // 1. Protect all /admin routes except /admin/login
  if (path.startsWith("/admin") && path !== "/admin/login") {
    const token = request.cookies.get("admin_token")?.value;
    
    if (!token) {
      return NextResponse.redirect(new URL("/admin/login", request.url));
    }
  }

  // 2. If logged in and trying to access /admin/login, redirect to /admin
  if (path === "/admin/login") {
    const token = request.cookies.get("admin_token")?.value;
    if (token) {
      return NextResponse.redirect(new URL("/admin", request.url));
    }
  }

  // 3. Protect sensitive /api/ routes
  if (path.startsWith("/api/")) {
    const isPublicGet = method === "GET" && path.startsWith("/api/projects");
    const isPublicPost = method === "POST" && path.startsWith("/api/contact");
    const isAdminAuth = path.startsWith("/api/admin/login") || path.startsWith("/api/admin/logout");

    // Allow public APIs
    if (isPublicGet || isPublicPost || isAdminAuth) {
      return NextResponse.next();
    }

    // Require token for everything else
    const token = request.cookies.get("admin_token")?.value;
    if (!token) {
      return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
    }
  }

  return NextResponse.next();
}
