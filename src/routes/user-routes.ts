
import { UserService } from "../app/UserHandlers/UserController";
import { User } from "../contracts/user.type";

const userController = new UserService();

const args = process.argv.slice(2);
const command = args[0];

switch (command) {
    case "user:create":
        const fname = args[2];
        const lname = args[4];

        if (!fname && !lname) {
            console.log("Please provide both fname <FirstName> and lname <LastName>");
            break;
        }

        const newUser: User = {
            id: Date.now(),
            fname,
            lname,
        };

        userController.create(newUser);
        break;

    case "user:delete":
        const nameToDelete = args[1];
        console.log(nameToDelete)
        if (!nameToDelete) {
            console.log("Please provide the first name to delete. Example: user:delete (Any Name)");
            break;
        }

        userController.delete(nameToDelete);
        break;

    case "user:update":   //create new object updatedUser, place fname as newfname, lname as newlname and update user.json
        const fnameToUpdate = args[1];
        const newFname = args[3]
        const newLname = args[5]

        const updatedUser: User = {
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
            console.table(users);
        }
        break;

    default:
        console.log("Unknown command. Try again");

}
