import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
    const path = request.nextUrl.pathname;
    const isPublic = path === '/auth/login' || path === '/auth/signup';
    const token = request.cookies.get('next-auth.session-token')?.value || "";

    if (isPublic && token) {
        return NextResponse.redirect(new URL("/auth/dashboard", request.nextUrl));
    }
    if (!isPublic && !token) {
        return NextResponse.redirect(new URL("/auth/login", request.nextUrl));
    }

}

// See "Matching Paths" below to learn more
export const config = {
    matcher: [
        '/auth/login',
        '/auth/signout',
        '/auth/signup',
        '/profile',
        '/api/users/logout',
        '/api/users/signup',
        '/about',
        '/CRUDmysql',
        '/auth/dashboard',
        '/',
    ],
}