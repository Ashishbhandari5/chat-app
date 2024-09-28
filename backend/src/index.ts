 import express from 'express';
 import cookieParser from 'cookie-parser';
 import authRoutes from './routes/auth.route.js';
import messageRoutes from './routes/message.route.js';
 const app=express();
 import dotenv from 'dotenv';
 dotenv.config();
app.use(express.json());
app.use(cookieParser());

 app.use('/api/auth',authRoutes)
 app.use('/api/message',messageRoutes)

 app.listen(3000,()=>{
  console.log('Server running at 3000');
 })