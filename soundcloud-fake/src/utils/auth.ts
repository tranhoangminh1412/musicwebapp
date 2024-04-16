import type { IUser } from "@/types/IUser";
import { users } from "@/constants/users.constant";
import { error } from "console";
import { JWT } from "google-auth-library";
import { GoogleAuth } from "google-auth-library";
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';


dotenv.config();


function getUser(username: string): IUser | null {
  users.forEach((u) => {
    if (username == u.username) {
      return u;
    }
  });
  return null;
}

function matchPassword(password: string, user: IUser) {
  if (password == user.password) {
    return true;
  } else {
    return false;
  }
}

export const signIn = (username: string, password: string): IUser | null => {
  const user = getUser(username);
  if (!user) return null;
  const passwordsMatch = matchPassword(password, user);
  if (passwordsMatch) return user;
  console.log("Invalid credentials");
  return null;
};

export function generateAuthToken(userId: string) {
  const authSecret = process.env.AUTH_SECRET;
  // Define payload for the JWT token
  const payload = {
    sub: userId,  // Subject (typically user ID)
    // Add any additional claims as needed
  };

  console.log(authSecret)

  // Generate JWT token with a secret key and expiration time
  // const token = jwt.sign(payload, authSecret as string, {
  //   expiresIn: '1h',  // Token expires in 1 hour
  //   // Add any additional JWT options as needed
  // });

  // // console.log(token)

  // return token;
}
