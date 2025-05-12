import { users } from "../data/users";
import { User } from "../utils/user.type";

export const findUserByEmail = (email: string): User | undefined => {
  return users.find(user => user.email === email);
}

export const findUserIndexByEmail = (email: string): number => {
  return users.findIndex(user => user.email === email);
}