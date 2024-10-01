 import express from 'express';
 import cookieParser from 'cookie-parser';
 import authRoutes from './routes/auth.route.js';
import messageRoutes from './routes/message.route.js';
 const app=express();
 import dotenv from 'dotenv';
 dotenv.config();
 const PORT=3000;
app.use(express.json());
app.use(cookieParser());

 app.use('/api/auth',authRoutes)
 app.use('/api/message',messageRoutes)

 app.listen(PORT,()=>{
  console.log('Server running at ' + PORT);
 })