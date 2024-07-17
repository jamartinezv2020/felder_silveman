// src/pages/Home.tsx
import React from 'react';
import { Container, Typography, Box, Paper } from '@mui/material';
import Dashboard from '../../components/Dashboard/Dashboard';

const Home: React.FC = () => {
  return (
    <Dashboard>
      <Container maxWidth="md">
        <Box mt={5} mb={5}>
          <Paper elevation={3} sx={{ p: 4 }}>
            <Typography variant="h4" gutterBottom>
              Página Principal
            </Typography>
            <Typography variant="body1">
              Bienvenido a la página principal de la aplicación. Aquí puedes encontrar información relevante y accesos rápidos a las diferentes secciones de la plataforma.
            </Typography>
          </Paper>
        </Box>
      </Container>
    </Dashboard>
  );
};

export default Home;


