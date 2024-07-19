// Ubicación: src/App.tsx

import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './AuthContext';
import LoginForm from './components/LoginForm';
import PrivateRoute from './components/PrivateRoute';
import Dashboard from './components/Dashboard/Dashboard';
import AboutPage from './pages/AboutPage/AboutPage';
import JoinUsPage from './pages/JoinUsPage/JoinUsPage'; // Asegúrate de crear este componente
import SearchResultsPage from './pages/SearchResultsPage/SearchResultsPage'; // Asegúrate de crear este componente
import UserManagementPage from './pages/UserManagementPage/UserManagementPage'; // Importa la página de gestión de usuarios




const App: React.FC = () => {
  return (
    
      <AuthProvider>
        <Router>
        <Routes>
          <Route path="/login" element={<LoginForm />} />
          <Route path="/dashboard" element={<PrivateRoute component={Dashboard} path="/dashboard" />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/join" element={<JoinUsPage />} />
          <Route path="/search" element={<SearchResultsPage />} />
          <Route path="/" element={<Navigate to="/login" />} />
          <Route path="/admin/users" element={<UserManagementPage />} />
        </Routes>
      
    </Router>
    </AuthProvider>
  );
};

export default App;







