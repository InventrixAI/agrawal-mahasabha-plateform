import { NextRequest, NextResponse } from 'next/server'
import { verifyToken } from './lib/auth'

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Public routes that don't need authentication
  const publicRoutes = [
    '/',
    '/about',
    '/contact',
    '/news',
    '/events',
    '/members',
    '/gallery',
    '/login',
    '/register',
  ]

  // API routes that don't need authentication
  const publicApiRoutes = [
    '/api/auth/login',
    '/api/auth/register',
    '/api/news',
    '/api/events',
    '/api/members',
    '/api/gallery',
  ]

  // Check if route is public
  const isPublicRoute = publicRoutes.some(
    (route) => pathname === route || pathname.startsWith(`${route}/`)
  )

  const isPublicApiRoute = publicApiRoutes.some(
    (route) => pathname === route || pathname.startsWith(`${route}/`)
  )

  // Allow public routes
  if (isPublicRoute || isPublicApiRoute) {
    return NextResponse.next()
  }

  // Get token from cookies or authorization header
  const token =
    request.cookies.get('token')?.value ||
    request.headers.get('authorization')?.replace('Bearer ', '')

  // Redirect to login if no token
  if (!token) {
    if (pathname.startsWith('/api/')) {
      return NextResponse.json(
        { success: false, message: 'Authentication required' },
        { status: 401 }
      )
    }

    const loginUrl = new URL('/login', request.url)
    loginUrl.searchParams.set('from', pathname)
    return NextResponse.redirect(loginUrl)
  }

  // Verify token
  const payload = verifyToken(token)
  if (!payload) {
    if (pathname.startsWith('/api/')) {
      return NextResponse.json({ success: false, message: 'Invalid token' }, { status: 401 })
    }

    const loginUrl = new URL('/login', request.url)
    return NextResponse.redirect(loginUrl)
  }

  // Check admin routes
  if (pathname.startsWith('/admin')) {
    if (payload.role !== 'ADMIN' && payload.role !== 'SUPER_ADMIN') {
      if (pathname.startsWith('/api/')) {
        return NextResponse.json(
          { success: false, message: 'Admin access required' },
          { status: 403 }
        )
      }

      return NextResponse.redirect(new URL('/dashboard', request.url))
    }
  }

  // Add user info to request headers for API routes
  if (pathname.startsWith('/api/')) {
    const requestHeaders = new Headers(request.headers)
    requestHeaders.set('x-user-id', payload.userId)
    requestHeaders.set('x-user-email', payload.email)
    requestHeaders.set('x-user-role', payload.role)

    return NextResponse.next({
      request: {
        headers: requestHeaders,
      },
    })
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder
     */
    '/((?!_next/static|_next/image|favicon.ico|public/).*)',
  ],
}
