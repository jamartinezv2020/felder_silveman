// src/pages/Analytics.tsx
import React from 'react';
import { Container, Typography, Box, Paper } from '@mui/material';
import Dashboard from '../../components/Dashboard/Dashboard';

const Analytics: React.FC = () => {
  return (
    <Dashboard>
      <Container maxWidth="md">
        <Box mt={5} mb={5}>
          <Paper elevation={3} sx={{ p: 4 }}>
            <Typography variant="h4" gutterBottom>
              Página de Análisis
            </Typography>
            <Typography variant="body1">
              Bienvenido a la sección de análisis. Aquí puedes visualizar las métricas y datos importantes relacionados con la aplicación.
            </Typography>
            {/* Agrega aquí los gráficos y elementos de análisis */}
          </Paper>
        </Box>
      </Container>
    </Dashboard>
  );
};

export default Analytics;

