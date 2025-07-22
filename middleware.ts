
import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  const { pathname, searchParams } = request.nextUrl;

  const accessToken = request.cookies.get('accessToken')?.value;

  const protectedRoutes = [
    '/profile',
    '/checkout',
    '/orders',
    '/account',
    '/wishlist',
    '/admin',
  ];

  const authRoutes = [
    '/auth/login',
    '/auth/register',
    '/auth/forgot-password',
    '/auth/reset-password',
  ];

  if (pathname.startsWith('/auth/verify-email')) {
    const email = searchParams.get('email');
    if (!email) {
      return NextResponse.redirect(new URL('/auth/login', request.url));
    }
    return NextResponse.next();
  }

  if (pathname === '/auth/reset-password') {
    if (accessToken) {
      return NextResponse.redirect(new URL('/', request.url));
    }

    const email = searchParams.get('email');
    const fromDialog = searchParams.get('fromDialog');

    if (!email || !fromDialog) {
      return NextResponse.redirect(new URL('/', request.url));
    }

    return NextResponse.next();
  }

  const isProtectedRoute = protectedRoutes.some(route => pathname.startsWith(route));
  if (isProtectedRoute) {
    if (!accessToken) {
      const returnUrl = encodeURIComponent(request.nextUrl.pathname);
      return NextResponse.redirect(new URL(`/auth/login?returnUrl=${returnUrl}`, request.url));
    }
    return NextResponse.next();
  }

  const isAuthRoute = authRoutes.some(route => pathname === route || pathname.startsWith(route + '/'));
  if (isAuthRoute && accessToken) {
    return NextResponse.redirect(new URL('/', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/profile/:path*',
    '/checkout/:path*',
    '/orders/:path*',
    '/account/:path*',
    '/wishlist/:path*',
    '/admin/:path*',
    
    '/auth/login',
    '/auth/register',
    '/auth/forgot-password',
    '/auth/reset-password',
    '/auth/verify-email',
    
    '/products/:path*',
    '/categories/:path*',
    '/search/:path*',
    
    '/',
  ],
};