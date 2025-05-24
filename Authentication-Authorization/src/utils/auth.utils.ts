import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

// to Generate JWT token
export const generateToken = (payload: any) => {
  return jwt.sign(
    payload,
    process.env.JWT_SECRET || 'your_jwt_secret',
    { expiresIn: '1h' }
  );
};

// Hash password
export const hashPassword = async (password: string) => {
  const salt = await bcrypt.genSalt(10);
  return bcrypt.hash(password, salt);
};

// Compare password with hash
export const comparePassword = async (password: string, hash: string) => {
  return bcrypt.compare(password, hash);
};