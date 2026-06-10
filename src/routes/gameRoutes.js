import express from 'express';
import { saveGameSceneStats } from '../controllers/gameController.js';
import { getGameSceneStats } from '../controllers/gameController.js';

const router = express.Router();

router.post('/stats', saveGameSceneStats);
router.get('/stats', getGameSceneStats);

export default router;