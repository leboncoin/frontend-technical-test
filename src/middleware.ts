import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export const middleware = (request: NextRequest) => {
  const baseUrl = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:3005'
  const { pathname, search } = request.nextUrl
  const externalPath = pathname.replace(/^\/api/, '')
  const url = new URL(`${baseUrl}${externalPath}${search}`)

  return NextResponse.rewrite(url)
}

export const config = {
  matcher: ['/api/:path*'],
}
