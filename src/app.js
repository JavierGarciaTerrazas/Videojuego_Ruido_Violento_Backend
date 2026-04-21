import express from 'express';
import authRoutes from './routes/authRoutes.js';
import { auth } from '../src/middlewares/authMiddleware.js';
import cors from 'cors';

const app = express();
app.use(cors());

app.use(express.json());
app.use('/auth', authRoutes);

//rutas protegidas
app.get('/protegida',auth, (req, res) => {
  res.json({ 
    message: 'Acceso permitido 👌', 
    user: req.user 
  });
});



export default app;