import { UserManager } from '../../abstraction/User';
import { User } from '../../contracts/user.type';
import * as fs from 'fs';

const USERS_FILE = 'user.json';

export class UserService extends UserManager {   //I've create this main class that does the actual user operations
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
 
  create(user: User): void {    //this function pushes a new user object to the users array and runs saveUsers function
    this.users.push(user);
    this.saveUsers();
    console.log("User added.");
  }

  update(fname: string, newUser: User): void {
    let found = false;

    for (let i = 0; i < this.users.length; i++) {
      if (this.users[i].fname === fname) {
        this.users[i] = newUser;   //this logic here is, it takes the first name of a user and replaces that user's data with newUser if found
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
      if (user.fname.toLowerCase() !== fname.toLowerCase()) {  //It filters out the user with the matching fname
        newUsers.push(user);
      }
    }

    if (newUsers.length < this.users.length) {  //If the length of the filtered array is smaller, it means a user was deleted.
      this.users = newUsers;
      this.saveUsers();  //this right here saves the updated user list and logs the result.
      console.log("User deleted.");
    } else {
      console.log("No user found.");
    }
  }

  list(): User[] {
    return this.users;  //this simply returns the current list of users.
  }
}
