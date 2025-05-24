import 'reflect-metadata';
import { AppDataSource } from './database/data-source'; 
import app from './app';

AppDataSource.initialize().then(() => {
  console.log('DB connected');
  app.listen(3000, () => {
    console.log('Server is running at http://localhost:3000');
  });
}).catch((err) => {
  console.error('DB connection failed ❌', err);
});
