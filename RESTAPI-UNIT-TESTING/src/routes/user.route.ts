// src/routes/user.routes.ts

import { Router } from 'express';
import {
  getAllUser,
  getOneUser,
  createUser,
  updateUser,
  deleteUser
} from '../controllers/user.controller';
import { userSchemas, validateRequest } from '../middleware/validation.middleware';



const router = Router();

// Get all users
router.get('/users', getAllUser);

// Get one user by email
router.get(
  '/users/:email',
  validateRequest(userSchemas.emailParam, 'params'),
  getOneUser
);

// Create a new user
router.post(
  '/users',
  validateRequest(userSchemas.createUser, 'body'),

  createUser
);

// Update user by email (only if at least name or salary is provided)
router.put(
  '/users/:email',
  validateRequest(userSchemas.emailParam, 'params'),
  validateRequest(userSchemas.updateUser, 'body'),
  updateUser
);

// Delete user by email
router.delete(
  '/users/:email',
  validateRequest(userSchemas.emailParam, 'params'),
  deleteUser
);

export default router;
