import express from 'express';
import { createUser, deleteUser, getOneUserWithInternships, getUsersWithInternshipCount, getUsersWithInternships, updateUser } from '../controllers/user.controller';
import { validate } from '../middleware/validate';
import { userSchema } from '../validators/user.validator';
import { authenticate } from '../middleware/auth.middleware';

const router = express.Router();

// Public route
router.get('/count', getUsersWithInternshipCount);

// Protected routes
router.post('/', authenticate, validate(userSchema), createUser);
router.get('/', authenticate, getUsersWithInternships);
//router.get('/:id', authenticate, getOneUserWithInternships);
router.put('/:id', authenticate, validate(userSchema), updateUser);
router.delete('/:id', authenticate, deleteUser);

export default router;