import { NextRequest, NextResponse } from 'next/server'

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Skip middleware for these paths completely
  const publicPaths = [
    '/login',
    '/register',
    '/',
    '/api/auth/login',
    '/api/auth/register',
    '/_next',
    '/favicon.ico',
  ]

  // Check if current path should be skipped
  const shouldSkip = publicPaths.some((path) => {
    if (path === '/') {
      return pathname === '/'
    }
    return pathname.startsWith(path)
  })

  if (shouldSkip) {
    return NextResponse.next()
  }

  // Only check authentication for protected routes
  if (pathname.startsWith('/admin') || pathname.startsWith('/dashboard')) {
    // Get token from cookies
    const cookieHeader = request.headers.get('cookie') || ''
    const tokenMatch = cookieHeader.match(/(?:^|;\s*)token=([^;]+)/)
    const token = tokenMatch ? tokenMatch[1] : null

    // If no token, redirect to login
    if (!token) {
      const loginUrl = new URL('/login', request.url)
      return NextResponse.redirect(loginUrl)
    }

    // For admin routes, we could add role checking here later
    // For now, just allow any valid token
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!_next/static|_next/image|favicon.ico).*)',
  ],
}
