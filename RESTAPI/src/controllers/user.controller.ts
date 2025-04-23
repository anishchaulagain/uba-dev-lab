import { Request, Response } from 'express'
import { users } from '../data/users'
import { User } from '../utils/user.type'

//Reusable functions
const handleError = (res: Response, errorMessage: string = 'Internal server error') => {
  return res.status(500).json({ message: errorMessage });
}

const findUserByEmail = (email: string): User | undefined => {
  return users.find(user => user.email === email);
}

const findUserIndexByEmail = (email: string): number => {
  return users.findIndex(user => user.email === email);
}


export const getAllUser = (_req: Request, res: Response):any => {
  try {
    return res.status(200).json(users);
  } catch (error) {
    console.error('Error getting all users:', error);
    return handleError(res);
  }
};

 //Get user by email
 
export const getOneUser = (req: Request, res: Response):any => {
  try {
    const { email } = req.params;
    const user = findUserByEmail(email)
    
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    
    return res.status(200).json(user);
  } catch (error) {
    console.error('Error getting user:', error);
    return handleError(res);
  }
};

 //Create new user

export const createUser = (req: Request, res: Response):any => {
  try {
    const { name, email, age } = req.body;
    
    // Checking if email already exists
    if (findUserByEmail(email)) {
      return res.status(409).json({ message: 'User with this email already exists' });
    }
    
    const newUser: User = {
      id: users.length + 1,
      name,
      email,
      age
    };
    
    users.push(newUser);
    return res.status(201).json({ 
      message: 'User created successfully', 
      user: newUser 
    });
  } catch (error) {
    console.error('Error creating user:', error);
    return handleError(res);
  }
};

 // Update existing user

export const updateUser = (req: Request, res: Response):any => {
  try {
    const { email } = req.params;
    const { name, age } = req.body;
    
    const userIndex =  findUserIndexByEmail(email);
    
    if (userIndex === -1) {
      return res.status(404).json({ message: 'User not found' });
    }
    
    if (name) users[userIndex].name = name;
    if (age !== undefined) users[userIndex].age = age;
    
    return res.status(200).json({
      message: 'User updated successfully',
      user: users[userIndex]
    });
  } catch (error) {
    console.error('Error updating user:', error);
    return handleError(res);
  }
};

 // Delete user

export const deleteUser = (req: Request, res: Response):any => {
  try {
    const { email } = req.params;
    const userIndex =  findUserIndexByEmail(email);
    
    if (userIndex === -1) {
      return res.status(404).json({ message: 'User not found' });
    }
    
    users.splice(userIndex, 1);
    return res.status(200).json({ message: 'User deleted successfully' });
  } catch (error) {
    console.error('Error deleting user:', error);
    return handleError(res);
  }
};