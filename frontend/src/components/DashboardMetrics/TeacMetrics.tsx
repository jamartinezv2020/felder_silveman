// src/components/DashboardMetrics/TeacMetrics.tsx

import React, { useEffect, useState } from 'react';
import { Box, Typography, Grid, Paper } from '@mui/material';
import { Line, Bar, Pie } from 'react-chartjs-2';
import axios from 'axios';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, BarElement, Title, Tooltip, Legend, ArcElement, Filler } from 'chart.js';

// Configuración de Chart.js
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement, // Necesario para los gráficos de pastel
  Filler // Necesario para la opción 'fill'
);

const TeacMetrics: React.FC = () => {
  const [userStats, setUserStats] = useState<any>(null);
  const [studentStats, setStudentStats] = useState<any>(null);
  const [learningStyleStats, setLearningStyleStats] = useState<any>(null);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Ajusta las URLs según la configuración del servidor Express
        const userResponse = await axios.get('http://localhost:5000/api/users/metrics');
        const studentResponse = await axios.get('http://localhost:5000/api/students/metrics');
        const learningStyleResponse = await axios.get('http://localhost:5000/api/questionnaire/learningStyles');

        setUserStats(userResponse.data);
        setStudentStats(studentResponse.data);
        setLearningStyleStats(learningStyleResponse.data);
      } catch (error) {
        console.error('Error al obtener datos', error);
        setError('Error al obtener datos');
      }
    };

    fetchData();
  }, []);

  if (!userStats || !studentStats || !learningStyleStats) {
    return <Typography variant="h6">Cargando datos...</Typography>;
  }

  const lineChartData = {
    labels: userStats.months,
    datasets: [
      {
        label: 'Número de Usuarios Nuevos',
        data: userStats.values,
        borderColor: '#4CAF50',
        backgroundColor: 'rgba(76, 175, 80, 0.2)',
        fill: true
      }
    ]
  };

  const barChartData = {
    labels: studentStats.categories,
    datasets: [
      {
        label: 'Número de Estudiantes por Categoría',
        data: studentStats.values,
        backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0']
      }
    ]
  };

  const pieChartData = {
    labels: learningStyleStats.styles,
    datasets: [
      {
        label: 'Distribución de Estilos de Aprendizaje',
        data: learningStyleStats.values,
        backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0']
      }
    ]
  };

  return (
    <Box sx={{ flexGrow: 1, p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Métricas del Dashboard
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} md={4}>
          <Paper elevation={3} sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              Usuarios Nuevos
            </Typography>
            <Line data={lineChartData} />
          </Paper>
        </Grid>
        <Grid item xs={12} md={4}>
          <Paper elevation={3} sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              Estudiantes por Categoría
            </Typography>
            <Bar data={barChartData} />
          </Paper>
        </Grid>
        <Grid item xs={12} md={4}>
          <Paper elevation={3} sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              Estilos de Aprendizaje
            </Typography>
            <Pie data={pieChartData} />
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default TeacMetrics;
