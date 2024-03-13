import { IUser } from "@/types/IUser";
import { users } from "@/constants/users.constant";
import { error } from "console";

export async function getUser(username: string) {
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
