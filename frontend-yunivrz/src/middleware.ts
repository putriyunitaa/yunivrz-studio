import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const token = request.cookies.get('auth_token')?.value

  const pathname = request.nextUrl.pathname

  // Halaman login tidak boleh diproteksi
  if (pathname === '/admin/login' || pathname === '/login') {
    return NextResponse.next()
  }

  // Proteksi rute admin
  if (pathname.startsWith('/admin') && !token) {
    const adminLoginUrl = new URL('/admin/login', request.url)
    return NextResponse.redirect(adminLoginUrl)
  }

  // Proteksi rute client
  if (pathname.startsWith('/client') && !token) {
    const clientLoginUrl = new URL('/login', request.url)
    return NextResponse.redirect(clientLoginUrl)
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/admin/:path*', '/client/:path*', '/login'],
}
