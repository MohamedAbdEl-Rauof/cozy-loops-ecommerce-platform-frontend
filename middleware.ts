import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

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
    '/auth/verify-email',
    '/products',
    '/categories',
    '/search',
    '/about',
    '/contact',
    '/faq',
  ];

  // Check if the current path is a protected route
  const isProtectedRoute = protectedRoutes.some(route => pathname.startsWith(route));
  
  // Check if the current path is an auth route
  const isAuthRoute = authRoutes.some(route => pathname.startsWith(route));
  
  // Check if the current path is a public route
  const isPublicRoute = publicRoutes.some(route => pathname.startsWith(route)) || pathname === '/';
  
  // Check if the current path is for email verification
  const isEmailVerification = pathname.startsWith('/auth/verify-email/');

  // Allow email verification routes to be accessed without authentication
  if (isEmailVerification) {
    return NextResponse.next();
  }

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