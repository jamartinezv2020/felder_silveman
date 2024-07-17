import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import userRouter from './routes/userRoutes';
import cors from 'cors'; // Importa cors

const app = express();

// Middleware
app.use(bodyParser.json());
app.use(cors()); // Usa CORS middleware

// Rutas
app.use('/api/users', userRouter);

// Conectar a MongoDB
mongoose.connect('mongodb://localhost:27017/bd_feldersilverman', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false,
})
  .then(() => console.log('Conectado a MongoDB'))
  .catch(err => console.error('Error de conexión a MongoDB', err));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Servidor iniciado en puerto ${PORT}`));



