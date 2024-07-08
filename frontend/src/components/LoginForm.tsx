// src/components/LoginForm.tsx

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { login, register, recoverPassword } from '../services/authService';
import { TextField, Button, Container, Typography, Box, Link } from '@mui/material';

/**
 * Componente de formulario de autenticación.
 * Permite a los usuarios iniciar sesión, registrarse y recuperar la contraseña.
 * 
 * @returns {JSX.Element} - El componente AuthForm.
 */
const AuthForm: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [mode, setMode] = useState<'login' | 'register' | 'recover'>('login');
  const navigate = useNavigate();

  /**
   * Maneja el envío del formulario basado en el modo actual (login, register, recover).
   * 
   * @param {React.FormEvent} e - Evento de envío del formulario.
   */
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    let success = false;

    if (mode === 'login') {
      success = await login(email, password);
      if (success) {
        navigate('/dashboard');
      } else {
        alert('Login failed');
      }
    } else if (mode === 'register') {
      success = await register(email, password, {}); // Pasando un objeto vacío como tercer argumento
      if (success) {
        alert('Registration successful. Please log in.');
        setMode('login');
      } else {
        alert('Registration failed');
      }
    } else if (mode === 'recover') {
      success = await recoverPassword(email);
      if (success) {
        alert('Password recovery email sent');
        setMode('login');
      } else {
        alert('Password recovery failed');
      }
    }
  };

  return (
    <Container maxWidth="sm">
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          mt: 8,
        }}
      >
        <Typography component="h1" variant="h5">
          {mode === 'login' && 'Login'}
          {mode === 'register' && 'Register'}
          {mode === 'recover' && 'Recover Password'}
        </Typography>
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          {mode !== 'recover' && (
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          )}
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            {mode === 'login' && 'Login'}
            {mode === 'register' && 'Register'}
            {mode === 'recover' && 'Send Recovery Email'}
          </Button>
          <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
            {mode === 'login' ? (
              <>
                <Link href="#" variant="body2" onClick={() => setMode('register')}>
                  {"Don't have an account? Register"}
                </Link>
                <Link href="#" variant="body2" onClick={() => setMode('recover')}>
                  {"Forgot password?"}
                </Link>
              </>
            ) : (
              <Link href="#" variant="body2" onClick={() => setMode('login')}>
                {"Back to Login"}
              </Link>
            )}
          </Box>
        </Box>
      </Box>
    </Container>
  );
};

export default AuthForm;





