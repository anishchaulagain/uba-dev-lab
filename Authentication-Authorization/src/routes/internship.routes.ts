import express from 'express';
import { createInternship, deleteInternship, updateInternship } from '../controllers/internship.controller';
import { validate } from '../middleware/validate';
import { internshipSchema } from '../validators/internship.validator';
import { authenticate } from '../middleware/auth.middleware';

const router = express.Router();

// Protected routes
router.post('/', authenticate, validate(internshipSchema), createInternship);
router.put('/:id', authenticate, validate(internshipSchema), updateInternship);
router.delete('/:id', authenticate, deleteInternship);

export default router;