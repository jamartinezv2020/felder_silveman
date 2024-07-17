// src/App.tsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import PrivateRoute from './components/PrivateRoute';
import Dashboard from './components/Dashboard/Dashboard';
import AddDataForm from './components/AddDataForm';
import LoginForm from './components/LoginForm';
import AboutPage from './pages/AboutPage/AboutPage';
import JoinUsPage from './pages/JoinUsPage/JoinUsPage'; // Asegúrate de crear este componente
import SearchResultsPage from './pages/SearchResultsPage/SearchResultsPage'; // Asegúrate de crear este componente
import UserManagementPage from './pages/UserManagementPage/UserManagementPage'; // Importa la página de gestión de usuarios
import { AuthProvider } from './AuthContext';

const App: React.FC = () => {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          <Route path="/login" element={<LoginForm />} /> {/* Assuming register form is also handled by LoginForm */}
          <Route path="/dashboard" element={<PrivateRoute component={Dashboard} />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/join" element={<JoinUsPage />} />
          <Route path="/search" element={<SearchResultsPage />} />
          <Route path="/add" element={<AddDataForm />} />
          <Route path="/" element={<LoginForm />} />
          <Route path="/admin/users" element={<UserManagementPage />} />
        </Routes>
      </AuthProvider>
    </Router>
  );
};

export default App;





