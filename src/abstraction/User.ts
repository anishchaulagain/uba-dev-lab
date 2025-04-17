import { User } from "../contracts/user.type";

export abstract class UserManager {
  abstract create(user: User): void;
  abstract delete(FirstName: string): void;
  abstract update(fname: string, updatedData: Partial<User>): void;
  abstract list(): User[];
}
