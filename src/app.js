import express from 'express';
import authRoutes from './routes/authRoutes.js';
import { auth } from '../src/middlewares/authMiddleware.js';
import { authorize } from '../src/middlewares/roleMiddleware.js';
import gameRoutes from './routes/gameRoutes.js';
import { getGames } from './controllers/gameController.js';
import libraryRoutes from './routes/libraryRoutes.js';

import cors from 'cors';

const app = express();
app.use(cors());

app.use(express.json());
app.use('/auth', authRoutes);


//rutas protegidas
app.use('/games', gameRoutes);
app.use('/games', getGames );
app.use('/library', libraryRoutes);


app.get('/protegida',auth, (req, res) => {
  res.json({ 
    message: 'Acceso permitido 👌', 
    user: req.user 
  });
});

// Ruta de salud para verificar que el servidor está funcionando correctamente
app.get('/health', (req, res) => {
  res.json({ 
    message: 'Servidor saludable ✅', 
    timestamp: new Date() 
  });
});

app.get('/admin', auth, authorize('admin', 'super_admin'), (req, res)=> {
  res.json({
    message: 'Bienvenido admin 👑',
    user: req.user,
    role: req.user.role
  })
})



export default app;