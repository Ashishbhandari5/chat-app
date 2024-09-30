import express from 'express';
import protectRoute from '../middleware/protectRoute.js';
import { sendMessage,getMessage } from '../controllers/message.controller.js';

const router=express.Router();

  router.post('/send/:id',protectRoute,sendMessage);
  router.post('/:id',protectRoute,getMessage);

export default router;