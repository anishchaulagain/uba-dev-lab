
import { UserService } from "../app/UserHandlers/UserController";
import { User } from "../contracts/user.type";

const userController = new UserService();

const args = process.argv.slice(2);
const command = args[0];

switch (command) {
    case "user:create":
        const fname = args[2];   //takes (name) from script: npm run cli user:create fname (name) lname (surname)
        const lname = args[4];   //takes (surname) from script: npm run cli user:create fname (name) lname (surname)

        if (!fname && !lname) {
            console.log("Please provide both fname <FirstName> and lname <LastName>");
            break;
        }

        const newUser: User = {   //created object newUser user's script
            id: Date.now(),
            fname,
            lname,
        };

        userController.create(newUser); //passing  object newUser to create function
        break;

    case "user:delete":
        const nameToDelete = args[1];  //takes (name) from script: npm run cli user:delete (name)
        console.log(nameToDelete)
        if (!nameToDelete) {
            console.log("Please provide the first name to delete. Example: user:delete (Any Name)");
            break;
        }

        userController.delete(nameToDelete);
        break;

    case "user:update":
        const fnameToUpdate = args[1];
        const newFname = args[3]
        const newLname = args[5]

        const updatedUser: User = {   //created new object updatedUser, placed fname as newfname, lname as newlname and passed to update()
            id: Date.now(),
            fname: newFname,
            lname: newLname
        };

        userController.update(fnameToUpdate, updatedUser);
        break;

    case "user:list":
        const users = userController.list();
        if (users.length === 0) {
            console.log("No users found.");
        } else {
            console.table(users);  //shows list in tabular form
        }
        break;

    default:
        console.log("Unknown command. Try again");
        console.log(" npm run cli user:create fname (firstName) lname (lastName)  ");
        console.log(" npm run cli user:list ");
        console.log(" npm run cli user:update (ExistingFname) fname (NewFname) lname (NewLname)  ");
        console.log(" npm run cli user:delete (fname) ");

}
