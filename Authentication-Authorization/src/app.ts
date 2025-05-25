import express from 'express';
import userRoutes from './routes/user.routes';
import internshipRoutes from './routes/internship.routes';
import authRoutes from './routes/auth.routes';
import roleRoutes from './routes/role.routes';

const app = express();
app.use(express.json());

app.use('/auth', authRoutes);
app.use('/users', userRoutes);
app.use('/internships', internshipRoutes);
app.use('/roles', roleRoutes);

export default app;