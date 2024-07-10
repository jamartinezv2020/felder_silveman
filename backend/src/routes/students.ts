import { Router } from 'express';
import { getStudents, getStudentById, createStudent, updateStudent, deleteStudent } from '../controllers/studentController';

const router = Router();

// Rutas CRUD para los estudiantes
router.get('/', getStudents);
router.get('/:id', getStudentById);
router.post('/', createStudent);
router.put('/:id', updateStudent);
router.delete('/:id', deleteStudent);

export default router;














