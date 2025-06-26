
import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  const { pathname, searchParams } = request.nextUrl;

  // Get tokens from cookies
  const accessToken = request.cookies.get('accessToken')?.value;
  // const refreshToken = request.cookies.get('refreshToken')?.value;

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
  const publicRoutes = [
    '/products',
    '/categories',
    '/search',
    '/about',
    '/contact',
    '/faq',
  ];

  if (pathname.startsWith('/auth/verify-email')) {
    const email = searchParams.get('email');
    if (!email) {
      return NextResponse.redirect(new URL('/auth/login', request.url));
    }
    
    return NextResponse.next();
  }

  if (pathname.startsWith('/auth/reset-password')) {
    const email = searchParams.get('email');
    const token = searchParams.get('token');
    
    if (!email || !token) {
      return NextResponse.redirect(new URL('/auth/forgot-password', request.url));
    }
    
    return NextResponse.next();
  }

  const isProtectedRoute = protectedRoutes.some(route => pathname.startsWith(route));
  
  const isAuthRoute = authRoutes.some(route => pathname.startsWith(route));
  
  // const isPublicRoute = publicRoutes.some(route => pathname.startsWith(route)) || pathname === '/';

  if (isProtectedRoute) {
    if (!accessToken) {
      const returnUrl = encodeURIComponent(request.nextUrl.pathname);
      return NextResponse.redirect(new URL(`/auth/login?returnUrl=${returnUrl}`, request.url));
    }
    
    return NextResponse.next();
  }

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
    
    // Auth routes
    '/auth/:path*',
    
    // Public routes we want to handle
    '/products/:path*',
    '/categories/:path*',
    '/search/:path*',
    
    // Root path
    '/',
  ],
};