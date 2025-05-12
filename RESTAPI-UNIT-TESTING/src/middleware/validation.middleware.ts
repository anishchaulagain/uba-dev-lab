import { Request, Response, NextFunction } from 'express';
import { z } from 'zod';

// Centralized trimming and transforming helpers
const trimmedString = z.string().trim();
const emailSchema = trimmedString.email('Invalid email format').transform(val => val.toLowerCase());

// Custom salary validator
const salarySchema = z.union([
  z.string().transform(val => parseFloat(val)),
  z.number()
])
.refine(val => !isNaN(val), 'Salary must be a number')
.refine(val => val > 0, 'Salary must be a positive number')
.refine(val => val >= 10000, 'Salary must be at least 10,000')
.refine(val => /^\d+(\.\d{1,2})?$/.test(val.toString()), 'Salary can have at most 2 decimal places');

// User validation schemas
export const userSchemas: any = {
  emailParam: z.object({
    email: emailSchema
  }),

  createUser: z.object({
    name: trimmedString
      .min(2, 'Name must be at least 2 characters')
      .max(50, 'Name must be at most 50 characters'),
    email: emailSchema,
    salary: salarySchema
  }),

  updateUser: z.object({
    name: trimmedString
      .min(2, 'Name must be at least 2 characters')
      .max(50, 'Name must be at most 50 characters')
      .optional(),
    salary: salarySchema.optional()
  }).refine(data => data.name !== undefined || data.salary !== undefined, {
    message: 'At least one field (name or salary) is required to update'
  })
};

// Validation middleware
export const validateRequest = (
  schema: z.ZodSchema<any>, 
  property: 'body' | 'params' | 'query'
): any => {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      const result = schema.safeParse(req[property]);

      if (!result.success) {
        return res.status(400).json({
          message: 'Validation error',
          errors: result.error.errors
        });
      }

      req[property] = result.data;
      next();
    } catch (error) {
      console.error(`Validation error for ${property}:`, error);
      return res.status(500).json({ message: 'Internal server error during validation' });
    }
  };
};
