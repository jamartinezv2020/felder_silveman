// src/pages/Dashboard/Dashboard.tsx

import React, { useState, useEffect } from 'react';
import { Box, Toolbar } from '@mui/material';
import Header from '../../components/Header/Header';
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
import DashboardMetrics from '../../components/DashboardMetrics/DashboardMetrics'; // Importa el nuevo componente
import TeacMetrics from '../../components/DashboardMetrics/TeacMetrics'; // Importa el nuevo componente

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
        return <DashboardMetrics />; // Usa el nuevo componente aquí
      case 'teacanalytics':
        return <TeacMetrics />; // Usa el nuevo componente aquí
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
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Header handleDrawerToggle={handleDrawerToggle} />
      <Box sx={{ display: 'flex', flexGrow: 1 }}>
        <Sidebar mobileOpen={mobileOpen} handleDrawerToggle={handleDrawerToggle} onPageChange={setCurrentPage} />
        <Box component="main" sx={{ flexGrow: 1, p: 3, mt: 2 }}>
          {renderPage()}
        </Box>
      </Box>
      <Footer />
    </Box>
  );
};

export default Dashboard;












