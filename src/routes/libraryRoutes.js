import express from 'express';
import { addToLibrary } from '../controllers/libraryController.js';
import { auth } from '../middlewares/authMiddleware.js';
import e from 'express';

const router = express.Router();

// ruta para agregar un juego a la biblioteca del usuario autenticado

router.post('/', auth, addToLibrary);

export default router;