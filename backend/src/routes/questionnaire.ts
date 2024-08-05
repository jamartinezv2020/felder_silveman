import express from 'express';
import { getQuestionnaire, submitQuestionnaireResponses } from '../controllers/questionnaireController';
//import { authenticateToken } from '../middleware/authMiddleware';
import { authMiddleware, authenticateToken } from '../middleware/authMiddleware';


const router = express.Router();

// Ruta para obtener el cuestionario
router.get('/', authenticateToken, getQuestionnaire);

// Ruta para enviar las respuestas del cuestionario
router.post('/submit', authenticateToken, submitQuestionnaireResponses);

export default router;

