import express from 'express'
import userRoutes from './routes/user.route'
import dotenv from 'dotenv';
dotenv.config();

const app = express()
const PORT = process.env.PORT;

app.use(express.json())
app.use('/api', userRoutes)

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});