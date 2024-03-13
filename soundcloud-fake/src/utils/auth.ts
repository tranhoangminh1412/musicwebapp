import NextAuth from 'next-auth';
import { authConfig } from './auth.config';
import Credentials from 'next-auth/providers/credentials';
import { z } from 'zod';
import type { IUser } from '@/types/IUser';
import bcrypt from 'bcrypt';
import { users } from '@/constants/users.constant';
import { error } from 'console';


async function getUser(username: string): Promise<IUser | undefined> {
  try {
    users.forEach(u => {
      if(username == u.username){
          return u
      }
    });
    throw error
  } catch (error) {
    console.error('Failed to fetch user:', error);
    throw new Error('Failed to fetch user.');
  }
}

export const { auth, signIn, signOut } = NextAuth({
  ...authConfig,
  providers: [
    Credentials({
      // async authorize(credentials) {
      //   const parsedCredentials = z
      //     .object({ username: z.string().min(6), password: z.string().min(6) })
      //     .safeParse(credentials);

      //   if (parsedCredentials.success) {
      //     const { username, password } = parsedCredentials.data;
      //     const user = await getUser(username);
      //     if (!user) return null;
      //     const passwordsMatch = await bcrypt.compare(password, user.password);

      //     if (passwordsMatch) return user;
      //   }
      //   console.log('Invalid credentials');
      //   return null;
      // },
    }),
  ],
});
