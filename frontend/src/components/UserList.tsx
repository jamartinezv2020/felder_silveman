import React from 'react';
import { User } from '../models/User'; // Ajusta la ruta según la ubicación de tu interfaz User
import { Box, Typography, Button, Divider } from '@mui/material';

interface UserListProps {
  users: User[];
  onDelete: (userId: string) => void;
}

const UserList: React.FC<UserListProps> = ({ users, onDelete }) => {
  return (
    <Box mt={4}>
      <Typography variant="h4" gutterBottom>
        Lista de Usuarios Registrados
      </Typography>
      {users.map((user) => (
        <Box key={user._id} mb={2} p={2} bgcolor="background.paper" boxShadow={2}>
          <Typography variant="h5">{user.username}</Typography>
          <Typography variant="body1" color="text.secondary">
            Email: {user.email}
          </Typography>
          {/* Aquí puedes mostrar más detalles del usuario según tus necesidades */}
          <Button variant="contained" color="error" onClick={() => onDelete(user._id)}>
            Eliminar
          </Button>
          <Divider sx={{ mt: 2 }} />
        </Box>
      ))}
    </Box>
  );
};

export default UserList;
