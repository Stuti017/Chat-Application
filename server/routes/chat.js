import express from 'express';
import { Auth } from '../middleware/user.js';
const router = express.Router();

import { accessChats, fetchAllChats } from '../controllers/chatControllers.js';
router.post('/', Auth, accessChats);
router.get('/', Auth, fetchAllChats);

export default router;
