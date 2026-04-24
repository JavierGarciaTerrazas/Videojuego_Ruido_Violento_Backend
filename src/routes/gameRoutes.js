import express from 'express';
import { createGame, getGames}  from '../controllers/gameController.js';
import { auth } from '../middlewares/authMiddleware.js';
import { authorize } from '../middlewares/roleMiddleware.js';


const router = express.Router();

router.post('/', auth, authorize('admin'), createGame );
router.get('/', auth, getGames);

export default router;