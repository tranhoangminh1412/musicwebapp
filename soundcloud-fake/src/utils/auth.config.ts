import type { NextAuthConfig } from "next-auth";
import { useAuthContext } from "@/contexts/AuthContext";
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

const { authenticated, setAuthenticated } = useAuthContext();

export const authConfig = {
  pages: {
    signIn: "/auth/login",
  },
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isOnHome = nextUrl.pathname.startsWith("/home");
      if (isOnHome) {
        if (authenticated) return true;
        return false; // Redirect unauthenticated users to login page
      } else if (authenticated) {
        return Response.redirect(new URL("/home", nextUrl));
      }
      return true;
    },
  },
  providers: [], // Add providers with an empty array for now
} satisfies NextAuthConfig;

 
// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
  const isOnHome = request.nextUrl.pathname.startsWith("/home");
      if (isOnHome) {
        if (authenticated) return true;
        return NextResponse.redirect('/auth/login') // Redirect unauthenticated users to login page
      } else if (authenticated) {
        return Response.redirect(new URL("/home", request.nextUrl));
      }
      return true;
}
 
// See "Matching Paths" below to learn more
export const config = {
  matcher: '/home',
}