import { Request, Response } from 'express'
import { users } from '../data/users'
import { User } from '../utils/user.type'


export const getAllUser = (req: Request, res: Response):any => {
  try {
    return res.status(200).json(users);
  } catch (error) {
    console.error('Error getting all users:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

 //Get user by email
 
export const getOneUser = (req: Request, res: Response):any => {
  try {
    const { email } = req.params;
    const user = users.find(user => user.email === email);
    
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    
    return res.status(200).json(user);
  } catch (error) {
    console.error('Error getting user:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

 //Create new user

export const createUser = (req: Request, res: Response):any => {
  try {
    const { name, email, age } = req.body;
    
    // Checking if email already exists
    const existingUser = users.find(user => user.email === email);
    if (existingUser) {
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
    return res.status(500).json({ message: 'Internal server error' });
  }
};

 // Update existing user

export const updateUser = (req: Request, res: Response):any => {
  try {
    const { email } = req.params;
    const { name, age } = req.body;
    
    const userIndex = users.findIndex((user) => user.email === email);
    
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
    return res.status(500).json({ message: 'Internal server error' });
  }
};

 // Delete user

export const deleteUser = (req: Request, res: Response):any => {
  try {
    const { email } = req.params;
    const userIndex = users.findIndex(user => user.email === email);
    
    if (userIndex === -1) {
      return res.status(404).json({ message: 'User not found' });
    }
    
    users.splice(userIndex, 1);
    return res.status(200).json({ message: 'User deleted successfully' });
  } catch (error) {
    console.error('Error deleting user:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};