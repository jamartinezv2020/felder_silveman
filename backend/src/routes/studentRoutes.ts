import { Router } from 'express';
import { getStudents, getStudentById, createStudent, updateStudent, deleteStudent, updateLearningStyle } from '../controllers/studentController';

const router = Router();

// Ruta para actualizar el estilo de aprendizaje
router.put('/updateLearningStyle', updateLearningStyle);

// Rutas CRUD para los estudiantes
router.get('/', getStudents);
router.get('/:id', getStudentById);
router.post('/', createStudent);
router.put('/:id', updateStudent);
router.delete('/:id', deleteStudent);

export default router;
