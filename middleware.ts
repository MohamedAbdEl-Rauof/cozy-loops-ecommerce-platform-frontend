
import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  const { pathname, searchParams } = request.nextUrl;

  // Get tokens from cookies
  const accessToken = request.cookies.get('accessToken')?.value;

  // Define protected routes that require authentication
  const protectedRoutes = [
    '/profile',
    '/checkout',
    '/orders',
    '/account',
    '/wishlist',
    '/admin',
  ];

  // Define auth routes that should redirect if user is already logged in
  const authRoutes = [
    '/auth/login',
    '/auth/register',
    '/auth/forgot-password',
    '/auth/reset-password',
  ];

  // Define public routes that should always be accessible
  // const publicRoutes = [
  //   '/products',
  //   '/categories',
  //   '/search',
  //   '/about',
  //   '/contact',
  //   '/faq',
  // ];

  // Special case for verify-email
  if (pathname.startsWith('/auth/verify-email')) {
    const email = searchParams.get('email');
    if (!email) {
      return NextResponse.redirect(new URL('/auth/login', request.url));
    }
    return NextResponse.next();
  }

  // Special case for reset-password
  if (pathname === '/auth/reset-password') {
    // If user is authenticated, always redirect to home
    if (accessToken) {
      return NextResponse.redirect(new URL('/', request.url));
    }

    const email = searchParams.get('email');
    const fromDialog = searchParams.get('fromDialog');

    // If missing required parameters, redirect to home
    if (!email || !fromDialog) {
      return NextResponse.redirect(new URL('/', request.url));
    }

    return NextResponse.next();
  }

  // Handle protected routes
  const isProtectedRoute = protectedRoutes.some(route => pathname.startsWith(route));
  if (isProtectedRoute) {
    if (!accessToken) {
      const returnUrl = encodeURIComponent(request.nextUrl.pathname);
      return NextResponse.redirect(new URL(`/auth/login?returnUrl=${returnUrl}`, request.url));
    }
    return NextResponse.next();
  }

  // Handle auth routes for authenticated users
  const isAuthRoute = authRoutes.some(route => pathname === route || pathname.startsWith(route + '/'));
  if (isAuthRoute && accessToken) {
    return NextResponse.redirect(new URL('/', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    // Protected routes
    '/profile/:path*',
    '/checkout/:path*',
    '/orders/:path*',
    '/account/:path*',
    '/wishlist/:path*',
    '/admin/:path*',
    
    // Auth routes - use exact matching
    '/auth/login',
    '/auth/register',
    '/auth/forgot-password',
    '/auth/reset-password',
    '/auth/verify-email',
    
    // Public routes we want to handle
    '/products/:path*',
    '/categories/:path*',
    '/search/:path*',
    
    // Root path
    '/',
  ],
};