import { UserManager } from '../../abstraction/User';
import { User } from '../../contracts/user.type';
import * as fs from 'fs';

const USERS_FILE = 'user.json';

export class UserService extends UserManager {
  private users: User[] = [];

  constructor() {
    super();
    this.loadUsers();
  }

  private loadUsers(): void {
    if (fs.existsSync(USERS_FILE)) {
      const data = fs.readFileSync(USERS_FILE, 'utf-8');
      this.users = JSON.parse(data);
    }
  }

  private saveUsers(): void {
    fs.writeFileSync(USERS_FILE, JSON.stringify(this.users));
  }

  create(user: User): void {
    this.users.push(user);
    this.saveUsers();
    console.log("User added.");
  }

  update(fname: string, newUser: User): void {
    let found = false;

    for (let i = 0; i < this.users.length; i++) {
      if (this.users[i].fname === fname) {
        this.users[i] = newUser;
        found = true;
        break;
      }
    }

    if (found) {
      this.saveUsers();
      console.log("User updated.");
    } else {
      console.log("User not found.");
    }
  }

  delete(fname: string): void {
    let newUsers = [];

    for (let user of this.users) {
      if (user.fname.toLowerCase() !== fname.toLowerCase()) {
        newUsers.push(user);
      }
    }

    if (newUsers.length < this.users.length) {
      this.users = newUsers;
      this.saveUsers();
      console.log("User deleted.");
    } else {
      console.log("No user found.");
    }
  }

  list(): User[] {
    return this.users;
  }
}
