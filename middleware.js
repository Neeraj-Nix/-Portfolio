import { NextResponse } from "next/server";

export function middleware(request) {
  // Check if the user is trying to access an /admin route
  if (request.nextUrl.pathname.startsWith('/admin')) {
    // If they are trying to access the login page itself, let them through
    if (request.nextUrl.pathname === '/admin/login') {
      return NextResponse.next();
    }

    // Check for the admin token set by the login API
    const token = request.cookies.get('admin_token')?.value;

    // If no token exists, redirect completely to the login page
    if (!token) {
      return NextResponse.redirect(new URL('/admin/login', request.url));
    }
  }

  return NextResponse.next();
}

// Specify exactly which routes this middleware should protect
export const config = {
  matcher: ['/admin/:path*'],
};
