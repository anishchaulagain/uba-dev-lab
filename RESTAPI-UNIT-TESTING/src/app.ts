
import express from 'express';
import bodyParser from 'body-parser';
import userRoutes from './routes/user.route'

const app = express();
app.use(bodyParser.json());

app.use('/', userRoutes);

export default app;
