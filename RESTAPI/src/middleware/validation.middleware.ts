import { Request, Response, NextFunction } from 'express'
import { z } from 'zod'

// Creating Validation schemas for user operations
export const userSchemas = {
  // This validation checks email format from parameter (i.e from req.params)
  emailParam: z.object({
    email: z.string().email('Invalid email format')
  }),

  //This validation is for user creation
  createUser: z.object({
    name: z.string().min(1, 'Name is required'),
    email: z.string().email('Invalid email format'),
    age: z.number().int().positive('Age must be a positive integer')
  }),

  //This validation is for user updates
  updateUser: z.object({
    name: z.string().min(1).optional(),
    age: z.number().int().positive('Age must be a positive integer').optional()
  }).refine(data => data.name !== undefined || data.age !== undefined, {
    message: 'At least one field (name or age) is required to update'
  })
}


export const validateRequest = (schema: z.ZodSchema, property: 'body' | 'params' | 'query'):any => { //the part of the request to validate (body, params, or query)
  return (req: Request, res: Response, next: NextFunction) => { //
    try {
      // Handle type conversion for numeric fields when validating body
      let dataToValidate = req[property];
      
      if (property === 'body' && dataToValidate.age !== undefined) {
        dataToValidate = {
          ...dataToValidate,
          age: Number(dataToValidate.age) //handling error like if age is string, converts to number
        };
      }
      
      // Perform validation
      const result = schema.safeParse(dataToValidate);
      
      if (!result.success) {
        return res.status(400).json({
          message: 'Validation error',
          errors: result.error.errors
        });
      }
      
      //If validated, Replace the request property with the validated data
      req[property] = result.data;
      next();  //after validation, return next() i.e moves to the controller
    } catch (error) {
      console.error(`Validation error for ${property}:`, error);
      return res.status(500).json({ message: 'Internal server error during validation' });
    }
  };
};