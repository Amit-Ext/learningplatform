import { NextResponse } from 'next/server'

export async function GET(request: Request) {
  const requestUrl = new URL(request.url)
  const code = requestUrl.searchParams.get('code')

  if (!code) {
    return NextResponse.redirect(
      `${requestUrl.origin}/auth/error?error=No code provided`
    )
  }

  // Redirect to the dashboard
  return NextResponse.redirect(new URL('/dashboard', requestUrl.origin))
} 