import NextAuth from "next-auth";
import { authConfig } from "./auth.config";
import Credentials from "next-auth/providers/credentials";
import { z } from "zod";
import type { IUser } from "@/types/IUser";
import bcrypt from "bcrypt";
import { users } from "@/constants/users.constant";
import { error } from "console";

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


