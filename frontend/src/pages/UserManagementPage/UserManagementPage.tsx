// src/pages/admin/UserManagementPage.tsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import UserList from '../../components/UserList';
import { User } from '../../models/User';

const UserManagementPage: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('Token no encontrado');
      }
      const response = await axios.get('http://localhost:5000/api/users', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUsers(response.data);
      setError(null); // Reset error state if request is successful
    } catch (error: any) {
      if (error.response && error.response.status === 404) {
        setError('No se encontraron usuarios.');
      } else if (error.message === 'Token no encontrado') {
        setError('Token no encontrado. Por favor, inicia sesión nuevamente.');
      } else {
        setError('Error al obtener usuarios: ' + (error.message || error));
      }
      console.error('Error al obtener usuarios:', error.message || error);
    }
  };

  const handleDeleteUser = async (userId: string) => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('Token no encontrado');
      }
      await axios.delete(`http://localhost:5000/api/users/${userId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUsers(users.filter(user => user._id !== userId));
      setError(null); // Reset error state if request is successful
    } catch (error: any) {
      if (error.response && error.response.status === 404) {
        setError('Usuario no encontrado.');
      } else if (error.message === 'Token no encontrado') {
        setError('Token no encontrado. Por favor, inicia sesión nuevamente.');
      } else {
        setError('Error al eliminar usuario: ' + (error.message || error));
      }
      console.error('Error al eliminar usuario:', error.message || error);
    }
  };

  return (
    <div>
      <h1>Administración de Usuarios</h1>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <UserList users={users} onDelete={handleDeleteUser} />
    </div>
  );
};

export default UserManagementPage;
