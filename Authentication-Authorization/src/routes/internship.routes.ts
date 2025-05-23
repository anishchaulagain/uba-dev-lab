import express from 'express';
import { createInternship, updateInternship, deleteInternship } from '../controllers/internship.controller';
import { validate } from '../middleware/validate';
import { internshipSchema } from '../validators/internship.validator';

const router = express.Router();

router.post('/', validate(internshipSchema), createInternship);
router.put('/:id', validate(internshipSchema), updateInternship);
router.delete('/:id', deleteInternship);

export default router;
