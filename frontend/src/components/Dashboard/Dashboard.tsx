// src/pages/Dashboard/Dashboard.tsx
// src/pages/Dashboard/Dashboard.tsx

import React, { useState, useEffect } from 'react';
import { Box, CssBaseline, Fade } from '@mui/material';
import Navbar from '../../components/NavBar/NavBar'; // Importar el Navbar
import Sidebar from '../../components/Sidebar/Sidebar';
import Footer from '../../components/Footer/Footer';
import HomePage from '../../pages/HomePage';
import AnalyticsPage from '../../pages/Analytics/Analytics';
import SettingsPage from '../../pages/Settings/Settings';
import AboutPage from '../../pages/AboutPage/AboutPage';
import JoinUsPage from '../../pages/JoinUsPage/JoinUsPage';
import SearchResultsPage from '../../pages/SearchResultsPage/SearchResultsPage';
import UserManagementPage from '../../pages/UserManagementPage/UserManagementPage';
import LearningStyleFelderSilvermanForm from '../../components/LearningStyleFelderSilvermanForm';
import DashboardMetrics from '../../components/DashboardMetrics/DashboardMetrics';
import TeacMetrics from '../../components/DashboardMetrics/TeacMetrics';
import './Dashboard.css'; // Asegúrate de tener este archivo CSS para el diseño del Dashboard

interface DashboardProps {
  children?: React.ReactNode;
}

const Dashboard: React.FC<DashboardProps> = ({ children }) => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState<string>('home'); // Estado para la página actual

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <HomePage />;
      case 'analytics':
        return <DashboardMetrics />;
      case 'teacanalytics':
        return <TeacMetrics />;
      case 'settings':
        return <SettingsPage />;
      case 'about':
        return <AboutPage />;
      case 'join':
        return <JoinUsPage />;
      case 'search':
        return <SearchResultsPage />;
      case 'userManagement':
        return <UserManagementPage />;
      case 'learningStyleFelderSilverman':
        return <LearningStyleFelderSilvermanForm />;
      default:
        return <HomePage />;
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [currentPage]);

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', bgcolor: 'background.default' }}>
      <CssBaseline />
      <Navbar handleDrawerToggle={handleDrawerToggle} /> {/* Reemplaza el Header con el Navbar */}
      <Box sx={{ display: 'flex', flexGrow: 1 }}>
        <Sidebar mobileOpen={mobileOpen} handleDrawerToggle={handleDrawerToggle} onPageChange={setCurrentPage} />
        <Box component="main" sx={{ flexGrow: 1, p: 3, mt: 2, transition: 'transform 0.3s ease-in-out', bgcolor: 'background.paper' }}>
          {/* Fade transition for page content */}
          <Fade in={true} timeout={500}>
            <div>
              {renderPage()}
            </div>
          </Fade>
        </Box>
      </Box>
      <Footer />
    </Box>
  );
};

export default Dashboard;


















