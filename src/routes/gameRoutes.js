import express from 'express';
import { createGame, getGames, deleteGame}  from '../controllers/gameController.js';
import { auth } from '../middlewares/authMiddleware.js';
import { authorize } from '../middlewares/roleMiddleware.js';


const router = express.Router();

router.post('/', auth, authorize('admin'), createGame );
router.get('/', getGames);
router.delete('/:id', auth, authorize('admin'), deleteGame);

export default router;