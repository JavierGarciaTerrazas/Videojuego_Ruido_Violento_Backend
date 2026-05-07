import express from 'express';
import { addToLibrary, getMyLibrary, updateLibraryStatus } from '../controllers/libraryController.js';
import { auth } from '../middlewares/authMiddleware.js';


const router = express.Router();

// ruta para agregar un juego a la biblioteca del usuario autenticado

router.post('/', auth, addToLibrary);
router.get('/', auth, getMyLibrary);
router.patch('/:id', auth, updateLibraryStatus);


export default router;