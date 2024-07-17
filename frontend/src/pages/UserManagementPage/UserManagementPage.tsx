import React, { useEffect, useState } from 'react';
import axios from 'axios';
import UserList from '../../components/UserList'; // Ajusta la importación según la ubicación de tu componente
import { User } from '../../models/User'; // Asegúrate de ajustar la ruta según la ubicación correcta de tu interfaz User

const UserManagementPage: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    fetchUsers(); // Carga los usuarios al montar el componente
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await axios.get('/api/users'); // Ajusta la ruta de acuerdo a tu API
      setUsers(response.data); // Suponiendo que tu API devuelve un array de usuarios
    } catch (error) {
      console.error('Error al obtener usuarios:', error);
    }
  };

  const handleDeleteUser = async (userId: string) => {
    try {
      await axios.delete(`/api/users/${userId}`); // Ajusta la ruta de acuerdo a tu API
      setUsers(users.filter(user => user._id !== userId)); // Actualiza el estado eliminando el usuario
    } catch (error) {
      console.error('Error al eliminar usuario:', error);
    }
  };

  return (
    <div>
      <h1>Administración de Usuarios</h1>
      <UserList users={users} onDelete={handleDeleteUser} />
    </div>
  );
};

export default UserManagementPage;

