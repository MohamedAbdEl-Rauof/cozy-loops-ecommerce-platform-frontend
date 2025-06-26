
import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  const { pathname, searchParams } = request.nextUrl;

  // Get tokens from cookies
  const accessToken = request.cookies.get('accessToken')?.value;
  const refreshToken = request.cookies.get('refreshToken')?.value;

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

  // Special case: Email verification route
  if (pathname.startsWith('/auth/verify-email')) {
    // Check if email parameter exists
    const email = searchParams.get('email');
    if (!email) {
      // No email parameter, redirect to login
      return NextResponse.redirect(new URL('/auth/login', request.url));
    }
    
    // If user is already authenticated, let the client component handle the redirect
    return NextResponse.next();
  }

  // Special case: Reset password route
  if (pathname.startsWith('/auth/reset-password')) {
    // Check if email parameter exists
    const email = searchParams.get('email');
    const token = searchParams.get('token');
    
    if (!email || !token) {
      // Missing required parameters, redirect to forgot password
      return NextResponse.redirect(new URL('/auth/forgot-password', request.url));
    }
    
    // If user is already authenticated, let the client component handle the redirect
    return NextResponse.next();
  }

  // Check if the current path is a protected route
  const isProtectedRoute = protectedRoutes.some(route => pathname.startsWith(route));
  
  // Check if the current path is an auth route
  const isAuthRoute = authRoutes.some(route => pathname.startsWith(route));
  
  // Check if the current path is a public route
  const isPublicRoute = publicRoutes.some(route => pathname.startsWith(route)) || pathname === '/';

  // For protected routes, check if user is authenticated
  if (isProtectedRoute) {
    // If no access token, redirect to login with return URL
    if (!accessToken) {
      const returnUrl = encodeURIComponent(request.nextUrl.pathname);
      return NextResponse.redirect(new URL(`/auth/login?returnUrl=${returnUrl}`, request.url));
    }
    
    // If we have access token, allow access
    return NextResponse.next();
  }

  // For auth routes, redirect to home if already logged in
  if (isAuthRoute && accessToken) {
    return NextResponse.redirect(new URL('/', request.url));
  }

  // For all other routes, proceed normally
  return NextResponse.next();
}

// Update the matcher to include all routes we want to handle
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