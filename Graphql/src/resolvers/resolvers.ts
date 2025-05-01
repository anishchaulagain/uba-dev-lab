
import { CreateUserInput, UpdateUserInput, UserResponse, UserType } from "../graphql-types/types";
import { handleValidationError } from "../helper/handleValidation";
import { createUserSchema, deleteUserSchema, getUserSchema, updateUserSchema } from "../middleware/user.validator";
import * as ds from '../datasources/user.datasource'



export const resolvers = {
  Query: {
    //fetch all the users
    users: async (): Promise<UserType[]> => {
      return await ds.getUsers();
    },

//fetch user via email from datasource
    user: async (_: unknown, args: { email: string }): Promise<UserType | null> => {
      try {
        const { email } = getUserSchema.parse(args);
        const user = await ds.getUserByEmail(email);   // Fetching user from data source
        if (!user)
          throw new Error("User not found");
        return user;
      } catch (err: any) {
        throw new Error(handleValidationError(err));
      }
    },
  },

  // Mutation resolvers is used to handle data modification
  Mutation: {
    createUser: async (_: unknown, { input }: { input: CreateUserInput }): Promise<UserResponse> => {   // Create a new user
      try {
        const validated = createUserSchema.parse(input);
        const existing = await ds.getUserByEmail(validated.email);
        if (existing)   //checking whether email already exist or not
          throw new Error("Email already exists");
        const user = await ds.createUser(validated);
        return { message: "User created successfully", user };
      } catch (err: any) {
        return {
          message: handleValidationError(err),
          user: null,
        };
      }
    },
       // Update an existing user
    updateUser: async (_: unknown, { email, input }: { email: string; input: UpdateUserInput }): Promise<UserResponse> => {
      try {
        getUserSchema.parse({ email });   // Validating email and update input
        const validated = updateUserSchema.parse(input);
        const user = await ds.updateUser(email, validated);
        if (!user)
          throw new Error("User not found");
        return { message: "User updated successfully", user };
      } catch (err: any) {
        return {
          message: handleValidationError(err),
          user: null,
        };
      }
    },
    // Delete a user by email
    deleteUser: async (_: unknown, { email }: { email: string }): Promise<UserResponse> => {
      try {
        deleteUserSchema.parse({ email });   // Validate email
        const user = await ds.deleteUser(email);
        if (!user)
          throw new Error("User not found");
        return { message: "User deleted", user };
      } catch (err: any) {
        return {
          message: handleValidationError(err),
          user: null,
        };
      }
    },
  },
};
