import { z } from 'zod';

// Helper schema to transform age
const ageSchema = z.union([z.string(), z.number()])
  .transform(val => {
    const parsed = Number(val);
    if (Number.isNaN(parsed) || !Number.isInteger(parsed)) { //if parsed value is not a number(NaN) or not an integer
      throw new Error('Age must be a valid whole number');
    }
    return parsed;
  })
  .refine(val => val > 0 && val <= 120, {
    message: 'Age must be between 1 and 120',
  });

// Validation for getting a user
export const getUserSchema = z.object({
  email: z.string().email('Invalid email format'),
});

// Validation for creating a new user
export const createUserSchema = z.object({
  name: z.string()
    .min(2, 'Name must be at least 2 characters')
    .max(50, 'Name must be less than 50 characters'),

  email: z.string()
    .email('Invalid email format')
    .max(100, 'Email must be less than 100 characters'),

  age: ageSchema,
});

// Validation for updating a user (email not allowed to change)
export const updateUserSchema = z.object({
  name: z.string()
    .min(2, 'Name must be at least 2 characters')
    .max(50, 'Name must be less than 50 characters')
    .optional(),

  age: ageSchema.optional()
}).refine(data => data.name !== undefined || data.age !== undefined, {
  message: 'At least one field (name or age) must be provided for update',
  path: ['fields'],
});

// Validation for deleting a user
export const deleteUserSchema = z.object({
  email: z.string().email('Invalid email format'),
});


