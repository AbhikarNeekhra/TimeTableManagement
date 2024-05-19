import { NextResponse } from 'next/server';
import { getToken } from "next-auth/jwt";


// This function can be marked `async` if using `await` inside
export async function middleware(request) {

  const path = request.nextUrl.pathname;
  const token = await getToken({ req: request });
  const isPublic = path === '/auth/login' || path === '/auth/signup';
  const isAdminURL = path === '/auth/dashboard';
  const currentRole = token?.role;
  // console.log("Middleware token", token);
  // console.log("Middleware currentRole", currentRole);

  if (isPublic && token) {
    if ((currentRole === "admin" || currentRole === "moderator" || currentRole === "faculty")) {
      return NextResponse.redirect(new URL("/auth/dashboard", request.nextUrl));
    } else if (currentRole === "student") {
      return NextResponse.redirect(new URL("/student", request.nextUrl));
    } else {
      return NextResponse.redirect(new URL("/auth/error", request.nextUrl));
    }
  }

  if (isAdminURL && currentRole === "student") {
    return NextResponse.redirect(new URL("/student", request.nextUrl));
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
    '/student',
    '/auth/forgotPass',
  ],
};
