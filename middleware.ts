import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Get token from cookies
  const accessToken = request.cookies.get('accessToken')?.value;

  // Define protected routes
  const protectedRoutes = [
    '/profile',
    '/checkout',
    '/orders',
  ];

  // Define auth routes that should redirect if user is already logged in
  const authRoutes = [
    '/auth/login',
    '/auth/register',
    '/auth/forgot-password',
  ];

  // Check if the route is protected and user is not authenticated
  const isProtectedRoute = protectedRoutes.some(route => pathname.startsWith(route));
  const isAuthRoute = authRoutes.some(route => pathname.startsWith(route));

  if (isProtectedRoute && !accessToken) {
    // Redirect to login if trying to access protected route without auth
    return NextResponse.redirect(new URL('/auth/login', request.url));
  }

  if (isAuthRoute && accessToken) {
    // Redirect to home if trying to access auth routes while logged in
    return NextResponse.redirect(new URL('/', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/profile/:path*',
    '/checkout/:path*',
    '/orders/:path*',
    '/auth/:path*',
  ],
};
