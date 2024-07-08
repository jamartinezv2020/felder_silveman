import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import connectDB from './db'; // Asegúrate de que la ruta a ./db esté correctamente definida
import authRoutes from './routes/auth';
import studentRoutes from './routes/students';

const app = express();

// Middleware de CORS para permitir solicitudes desde localhost:3000
app.use(cors({
  origin: 'http://localhost:3000',
}));

// Conectar a la base de datos MongoDB
connectDB()
  .then(() => {
    console.log('MongoDB connected');
  })
  .catch((err) => {
    console.error('Error connecting to MongoDB:', err.message);
    process.exit(1); // Salir del proceso con error en caso de falla
  });

// Middleware para analizar el cuerpo de las solicitudes como JSON
app.use(express.json());

// Middleware de manejo de errores global
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error('Error:', err.stack);
  res.status(500).send('Something broke!');
});

// Definir rutas para la autenticación y los estudiantes
app.use('/api/auth', authRoutes);
app.use('/api/students', studentRoutes);

// Puerto para el servidor, usando el puerto definido en la variable de entorno PORT, o 5000 por defecto
const PORT = process.env.PORT ?? 5000;

// Iniciar el servidor
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
