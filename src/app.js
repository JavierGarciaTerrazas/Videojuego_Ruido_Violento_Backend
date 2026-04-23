import express from 'express';
import authRoutes from './routes/authRoutes.js';
import { auth } from '../src/middlewares/authMiddleware.js';
import { authorize } from '../src/middlewares/roleMiddleware.js';

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

app.get('/admin', auth, authorize('admin', 'super_admin'), (req, res)=> {
  res.json({
    message: 'Bienvenido admin 👑',
    user: req.user,
    role: req.user.role
  })
})



export default app;