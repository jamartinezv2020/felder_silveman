// src/routes/userRoutes.ts
import express from 'express';
import User from '../models/User'; // Asegúrate de tener un modelo User en esta ruta
import {
  registerUser,
  loginUser,
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
  getUserProfile
} from '../controllers/userController';
import { authMiddleware } from '../middleware/authMiddleware';

const router = express.Router();
// Ruta para obtener métricas de usuarios
router.get('/metrics', async (req, res) => {
  try {
    // Aquí puedes implementar la lógica para obtener métricas de usuarios
    // Ejemplo: Número de usuarios nuevos por mes
    const users = await User.aggregate([
      {
        $group: {
          _id: { $month: "$createdAt" }, // Agrupamos por mes de creación
          count: { $sum: 1 } // Contamos el número de usuarios por mes
        }
      },
      {
        $sort: { _id: 1 } // Ordenamos por mes
      }
    ]);

    const months = users.map(user => `Mes ${user._id}`);
    const values = users.map(user => user.count);

    res.json({ months, values });
  } catch (error) {
    console.error('Error al obtener métricas de usuarios', error);
    res.status(500).json({ message: 'Error al obtener métricas de usuarios' });
  }
});

router.post('/register', registerUser);
router.post('/login', loginUser);

router.get('/', authMiddleware, getAllUsers);
router.get('/:id', authMiddleware, getUserById);
router.put('/:id', authMiddleware, updateUser);
router.delete('/:id', authMiddleware, deleteUser);

router.get('/profile', authMiddleware, getUserProfile);

// En src/routes/userRoutes.js
router.get('/metrics', async (req, res) => {
  // Lógica para obtener métricas de usuarios
});

// En src/routes/studentRoutes.js
router.get('/metrics', async (req, res) => {
  // Lógica para obtener métricas de estudiantes
});

// En src/routes/questionnaire.js
router.get('/learningStyles', async (req, res) => {
  // Lógica para obtener datos de estilos de aprendizaje
});


export default router;






