import React, { useState, ChangeEvent, FormEvent } from 'react';
import axios from 'axios';
import { TextField, Button, Typography, Box, Snackbar } from '@mui/material';

interface FormData {
  username: string;
  email: string;
  password: string;
}

const RegisterForm: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    username: '',
    email: '',
    password: '',
  });

  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');

  const { username, email, password } = formData;

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:5000/api/users/register', {
        username,
        email,
        password,
      });
      console.log(res.data); // Mensaje de confirmación del servidor
      setSnackbarMessage('Usuario registrado correctamente');
      setSnackbarOpen(true);
      setFormData({ username: '', email: '', password: '' }); // Limpiar el formulario después del registro exitoso
    } catch (err: any) {
      console.error(err.response?.data);
      setSnackbarMessage('Error al registrar usuario');
      setSnackbarOpen(true);
    }
  };

  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
  };

  return (
    <Box sx={{ maxWidth: 400, mx: 'auto' }}>
      <Typography variant="h5" gutterBottom>
        Registro de Usuario
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          fullWidth
          type="text"
          name="username"
          value={username}
          onChange={handleChange}
          label="Nombre de usuario"
          variant="outlined"
          margin="normal"
          required
        />
        <TextField
          fullWidth
          type="email"
          name="email"
          value={email}
          onChange={handleChange}
          label="Correo electrónico"
          variant="outlined"
          margin="normal"
          required
        />
        <TextField
          fullWidth
          type="password"
          name="password"
          value={password}
          onChange={handleChange}
          label="Contraseña"
          variant="outlined"
          margin="normal"
          required
        />
        <Button type="submit" variant="contained" color="primary">
          Registrar
        </Button>
      </form>
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        message={snackbarMessage}
      />
    </Box>
  );
};

export default RegisterForm;



