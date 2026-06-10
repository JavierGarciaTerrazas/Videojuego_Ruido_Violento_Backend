import express from 'express';
import gameRoutes from './routes/gameRoutes.js';
import cors from 'cors';

const app = express();
app.use(cors());

app.use(express.json());
app.use('/', gameRoutes);

app.get('/health', (req, res) => {
  res.json({ 
    message: 'Servidor saludable ✅', 
    timestamp: new Date() 
  });
});

export default app;
