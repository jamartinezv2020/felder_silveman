// src/routes/userRoutes.ts
import express from 'express';
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






