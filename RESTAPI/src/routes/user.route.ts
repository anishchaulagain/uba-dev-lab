// src/routes/user.routes.ts
import { Router } from 'express';
import {  getAllUser,  getOneUser,  createUser, updateUser, deleteUser } from '../controllers/user.controller';
import { validateRequest, userSchemas } from '../middleware/validation.middleware';

const router = Router();

// Routes with validation middleware
router.get('/users', getAllUser);

router.get('/users/:email', 
  validateRequest(userSchemas.emailParam, 'params'),
  getOneUser
);

router.post('/users', 
  validateRequest(userSchemas.createUser, 'body'),
  createUser
);

router.put('/users/:email', 
  validateRequest(userSchemas.emailParam, 'params'),
  validateRequest(userSchemas.updateUser, 'body'),
  updateUser
);

router.delete('/users/:email', 
  validateRequest(userSchemas.emailParam, 'params'),
  deleteUser
);

export default router;