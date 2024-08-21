import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import userRouter from './routes/userRoutes';
import questionnaireRoutes from './routes/questionnaire';
import studentRoutes from './routes/studentRoutes';
import student from './routes/students';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app = express();

app.use(bodyParser.json());
app.use(cors());
app.use(express.json());
// Usar las rutas
app.use('/api/questionnaire', questionnaireRoutes);
app.use('/api/users', userRouter);

app.use('/api', userRouter);
//app.use('/api/students', student);
app.use('/api/students', studentRoutes);
app.get('/api/auth/user/email', (req, res) => {
  // Lógica para obtener el email del usuario
  res.json({ email: 'usuario@example.com' });
});


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






