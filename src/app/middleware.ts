import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import supabase from '@/utils/supabase';

export async function middleware(request: NextRequest) {
  if (request.nextUrl.pathname === '/dashboard') {
    const {
      data: { session },
    } = await supabase.auth.getSession();

    if (!session) {
      return NextResponse.redirect(new URL('/', request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/dashboard/:path*'],
};
