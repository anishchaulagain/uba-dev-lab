import { ZodError } from 'zod';


/*This is a utility function to handle validation and general errors */
export const handleValidationError = (error: unknown): string => {
  if (error instanceof ZodError) {   //if error is zod validation error 
    return error.errors  // It format each error: path (field) + message
      .map(err => `${err.path.join('.')}: ${err.message}`)
      .join(', ');  // Join multiple errors in a readable string
  }

  if (error instanceof Error) { //if it's normal js error
    return error.message;
  }

  return 'An unknown error occurred';
};
