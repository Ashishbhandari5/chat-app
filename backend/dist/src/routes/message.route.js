import express from 'express';
import protectRoute from '../middleware/protectRoute.js';
import { sendMessage, getMessage, getUsersForSidebar } from '../controllers/message.controller.js';
const router = express.Router();
router.get("/conversations", protectRoute, getUsersForSidebar);
router.post('/send/:id', protectRoute, sendMessage);
router.get('/:id', protectRoute, getMessage);
export default router;
