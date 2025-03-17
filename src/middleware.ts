import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// This middleware handles internationalization for the App Router
// It sets the default locale to 'fr'
export function middleware(request: NextRequest) {
  // Get the pathname from the request
  const pathname = request.nextUrl.pathname

  // Set locale to 'fr' (the default and only supported locale)
  const locale = 'fr'

  // Skip internationalization middleware for API routes and static assets
  if (
    pathname.startsWith('/api') ||
    pathname.startsWith('/_next') ||
    pathname.includes('/.')
  ) {
    return NextResponse.next()
  }

  // The locale is already in the pathname, skip
  if (pathname.startsWith(`/${locale}`)) {
    return NextResponse.next()
  }

  // Redirect to the path with the locale prefix (e.g. /fr/about)
  // In this case, since 'fr' is the only locale, we always redirect to /fr/...
  return NextResponse.redirect(
    new URL(`/${locale}${pathname}`, request.url)
  )
}

// Configure the middleware to run on specific paths
export const config = {
  // Match all routes except for api routes, static files, etc.
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico|.*\\..*|_vercel).*)',
  ],
}