// src/routes/userRoutes.ts
import { Router } from 'express';
import { registerUser, loginUser, getAllUsers, getUserById, updateUser, deleteUser, getUserProfile } from '../controllers/userController';
import auth from '../middleware/auth';

const router = Router();

router.post('/register', registerUser); // Ruta para registrar un nuevo usuario
router.post('/login', loginUser);       // Ruta para iniciar sesión de usuario

// Rutas de CRUD de usuario
router.get('/profile', auth, getUserProfile); // Ruta para obtener el perfil del usuario autenticado
router.get('/', getAllUsers);                // Ruta para obtener todos los usuarios
router.get('/:id', getUserById);             // Ruta para obtener un usuario por ID
router.put('/:id', updateUser);              // Ruta para actualizar un usuario por ID
router.delete('/:id', auth, deleteUser);           // Ruta para eliminar un usuario por ID

export default router;




