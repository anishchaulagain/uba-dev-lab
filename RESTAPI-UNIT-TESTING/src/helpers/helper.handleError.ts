import { Response } from 'express';

export const handleError = (res: Response, errorMessage: string = 'Internal server error') => {
  return res.status(500).json({ message: errorMessage });
};
