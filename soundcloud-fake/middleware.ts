import NextAuth from 'next-auth';
import { authConfig } from './src/utils/auth.config';
import { pathToRegexp } from 'path-to-regexp';
import { start } from 'repl';
 
export default NextAuth(authConfig).auth;

const regexp = pathToRegexp("/")
 
export const config = {
  // https://nextjs.org/docs/app/building-your-application/routing/middleware#matcher
  matcher: regexp,
};