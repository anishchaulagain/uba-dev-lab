import express from 'express';
import userRoutes from './routes/user.routes';
import internshipRoutes from './routes/internship.routes';

const app = express();
app.use(express.json());

app.use('/users', userRoutes);
app.use('/internships', internshipRoutes);

export default app;
