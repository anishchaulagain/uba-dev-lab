import { CreateUserInput, UpdateUserInput } from "../graphql-types/types";
import { User } from "../models/User";


/*This is data access layer which encapsulates all direct database interactions related to users.*/

export const createUser = async (input: CreateUserInput) => {  //This creates a new user in the MongoDB database
  return await new User(input).save();
};
//To Retrieve all users from the database
export const getUsers = async () => await User.find();

//To Find a single user by email
export const getUserByEmail = async (email: string) => await User.findOne({ email });

//To Update user data by email and return the updated document
export const updateUser = async (email: string, input: UpdateUserInput) => {
  return await User.findOneAndUpdate({ email }, input, { new: true });
};

//To Delete a user by email and return the deleted document
export const deleteUser = async (email: string) => await User.findOneAndDelete({ email });