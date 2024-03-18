import type { NextAuthConfig } from "next-auth";
import { useAuth } from "@/contexts/AuthContext";

const { authenticated, setAuthenticated } = useAuth();

export const authConfig = {
  pages: {
    signIn: "/login",
  },
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isOnHome = nextUrl.pathname.startsWith("/");
      if (isOnHome) {
        if (authenticated) return true;
        return false; // Redirect unauthenticated users to login page
      } else if (authenticated) {
        return Response.redirect(new URL("/", nextUrl));
      }
      return true;
    },
  },
  providers: [], // Add providers with an empty array for now
} satisfies NextAuthConfig;
