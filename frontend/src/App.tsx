// src/App.tsx

import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import PrivateRoute from './components/PrivateRoute';
import StudentList from './components/StudentList'; // Asegúrate de importar correctamente tus componentes
import LoginForm from './components/LoginForm';
import RegisterForm from './components/RegisterForm';

function App() {
  const [students, setStudents] = useState<any[]>([]); // Ajusta el tipo de datos según tu implementación
  const isAuthenticated = true; // Implementa tu lógica de autenticación real

  const handleDelete = (studentId: string) => {
    // Implementa tu lógica de eliminación
  };

  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginForm />} />
        <Route path="/register" element={<RegisterForm />} />
        <Route
          path="/dashboard"
          element={
            <PrivateRoute
              element={<StudentList students={students} onDelete={handleDelete} />}
              isAuthenticated={isAuthenticated}
            />
          }
        />
        <Route path="/" element={<LoginForm />} />
      </Routes>
    </Router>
  );
}

export default App;




