import express from 'express';
import { createUser, deleteUser, getOneUserWithInternships, getUsersWithInternshipCount, getUsersWithInternships, updateUser } from '../controllers/user.controller';
import { validate } from '../middleware/validate';
import { userSchema } from '../validators/user.validator';

const router = express.Router();

router.get('/count', getUsersWithInternshipCount);
router.post('/', validate(userSchema), createUser);
router.get('/', getUsersWithInternships);
//router.get('/:id', getOneUserWithInternships);
router.put('/:id', validate(userSchema), updateUser);
router.delete('/:id', deleteUser);


export default router;
