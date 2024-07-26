// src/components/LearningStyleFelderSilvermanForm.tsx
import React, { useState } from 'react';
import axios from 'axios';
import { classifyLearningStyleFelderSilverman } from '../utils/learningStyleClassifierFelderSilveraman';
import { Box, Button, Container, Typography, Alert, Grid, LinearProgress, FormControl, FormLabel, RadioGroup, FormControlLabel, Radio, Card, CardContent, Accordion, AccordionSummary, AccordionDetails } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { questions } from '../components/Data/questions';

const QUESTIONS_PER_PAGE = 5;

const LearningStyleFelderSilvermanForm: React.FC = () => {
  const [responses, setResponses] = useState<number[]>(Array(questions.length).fill(0));
  const [learningStyle, setLearningStyle] = useState<string[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState<number>(0);

  const handleChange = (index: number, value: number) => {
    const newResponses = [...responses];
    newResponses[index] = value;
    setResponses(newResponses);
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setError(null); // Clear previous errors

    try {
      const style = classifyLearningStyleFelderSilverman(responses);
      setLearningStyle(style);

      const { data } = await axios.post('/api/students/updateLearningStyle', { responses: style });
      console.log('Learning style updated:', data);
    } catch (error: any) {
      setError(error.message);
    }
  };

  const handleNextPage = () => {
    setCurrentPage(currentPage + 1);
  };

  const handlePrevPage = () => {
    setCurrentPage(currentPage - 1);
  };

  const totalPages = Math.ceil(responses.length / QUESTIONS_PER_PAGE);
  const startQuestionIndex = currentPage * QUESTIONS_PER_PAGE;
  const endQuestionIndex = startQuestionIndex + QUESTIONS_PER_PAGE;
  const questionsToDisplay = questions.slice(startQuestionIndex, endQuestionIndex);

  const progress = (responses.filter(response => response !== 0).length / responses.length) * 100;

  return (
    <Container maxWidth="md">
      <Box mt={4} mb={4}>
        <Typography variant="h4" component="h2" gutterBottom>
          Learning Style Inventory
        </Typography>
        <Accordion>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography variant="h6">Instrucciones para completar el formulario</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography align="left">
              Este formulario está diseñado para identificar su estilo de aprendizaje según el modelo de Felder-Silverman.
              <ul>
                <li>Para cada pregunta, seleccione la opción que mejor describa su preferencia.</li>
                <li>Las preguntas están distribuidas en varias páginas, puede avanzar y retroceder usando los botones correspondientes.</li>
                <li>Su progreso se mostrará en una barra de progreso en la parte superior del formulario.</li>
              </ul>
            </Typography>
          </AccordionDetails>
        </Accordion>
        <LinearProgress variant="determinate" value={progress} sx={{ mb: 2 }} />
        <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            {questionsToDisplay.map((question, index) => (
              <Grid item xs={12} key={startQuestionIndex + index}>
                <Card variant="outlined" sx={{ backgroundColor: '#f9f9f9', borderRadius: 2 }}>
                  <CardContent>
                    <FormControl component="fieldset" fullWidth>
                      <FormLabel component="legend" sx={{ fontWeight: 'bold', color: '#333', mb: 2, textAlign: 'left' }}>
                        {`${startQuestionIndex + index + 1}. ${question.question}`}
                      </FormLabel>
                      <RadioGroup
                        row
                        value={responses[startQuestionIndex + index]}
                        onChange={(e) => handleChange(startQuestionIndex + index, parseInt(e.target.value))}
                      >
                        {question.options.map((option, optionIndex) => (
                          <FormControlLabel
                            key={optionIndex}
                            value={optionIndex + 1}
                            control={<Radio color="primary" />}
                            label={`${String.fromCharCode(65 + optionIndex)}. ${option}`}
                            sx={{ mb: 1 }}
                          />
                        ))}
                      </RadioGroup>
                    </FormControl>
                    <Accordion>
                      <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                        <Typography variant="body2">Ayuda</Typography>
                      </AccordionSummary>
                      <AccordionDetails>
                        <Typography variant="body2" sx={{ textAlign: 'left' }}>
                          Aquí puede agregar una explicación adicional o ejemplos que ayuden a entender mejor la pregunta.
                        </Typography>
                      </AccordionDetails>
                    </Accordion>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
          <Box mt={4} mb={2} display="flex" justifyContent="space-between">
            <Button
              variant="contained"
              disabled={currentPage === 0}
              onClick={handlePrevPage}
              sx={{ backgroundColor: '#1976d2', '&:hover': { backgroundColor: '#115293' } }}
            >
              Anterior
            </Button>
            {currentPage < totalPages - 1 ? (
              <Button
                variant="contained"
                onClick={handleNextPage}
                sx={{ backgroundColor: '#1976d2', '&:hover': { backgroundColor: '#115293' } }}
              >
                Siguiente
              </Button>
            ) : (
              <Button
                type="submit"
                variant="contained"
                color="primary"
                sx={{ backgroundColor: '#1976d2', '&:hover': { backgroundColor: '#115293' } }}
              >
                Enviar
              </Button>
            )}
          </Box>
        </form>
        {error && (
          <Box mt={2}>
            <Alert severity="error">{error}</Alert>
          </Box>
        )}
        {learningStyle.length > 0 && (
          <Box mt={4}>
            <Typography variant="h5" component="h3" gutterBottom>
              Su Estilo de Aprendizaje
            </Typography>
            <ul>
              {learningStyle.map((style, index) => (
                <li key={index}>{style}</li>
              ))}
            </ul>
          </Box>
        )}
      </Box>
    </Container>
  );
};

export default LearningStyleFelderSilvermanForm;



