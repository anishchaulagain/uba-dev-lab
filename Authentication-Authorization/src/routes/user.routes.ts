import express from 'express';
import { createUser, deleteUser, getOneUserWithInternships, getUsersWithInternshipCount, getUsersWithInternships, updateUser } from '../controllers/user.controller';
import { validate } from '../middleware/validate';
import { userSchema } from '../validators/user.validator';
import { authenticate } from '../middleware/auth.middleware';
import { authorize } from '../middleware/authorize.middleware';
import { RoleType } from '../database/entities/Role';

const router = express.Router();

//unprotected Route
router.get('/count', getUsersWithInternshipCount); 

//Protected Routes
router.post('/', authenticate, validate(userSchema),  authorize([RoleType.MENTOR, RoleType.ADMIN]),  createUser);
router.get('/', authenticate, authorize([RoleType.USER, RoleType.MENTOR, RoleType.ADMIN]),  getUsersWithInternships);
//router.get('/:id', authenticate, authorize([RoleType.USER, RoleType.MENTOR, RoleType.ADMIN]),  getOneUserWithInternships);
router.put('/:id', authenticate, authorize([RoleType.MENTOR, RoleType.ADMIN]),  validate(userSchema), updateUser);
router.delete('/:id', authenticate,  authorize([RoleType.ADMIN]),  deleteUser);

export default router;