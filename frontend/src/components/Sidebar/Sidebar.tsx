// src/components/Sidebar/Sidebar.tsx

import React from 'react';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import HomeIcon from '@mui/icons-material/Home';
import BarChartIcon from '@mui/icons-material/BarChart';
import SettingsIcon from '@mui/icons-material/Settings';
import InfoIcon from '@mui/icons-material/Info';
import GroupAddIcon from '@mui/icons-material/GroupAdd';
import SearchIcon from '@mui/icons-material/Search';
import PeopleIcon from '@mui/icons-material/People';
import AssignmentIndIcon from '@mui/icons-material/AssignmentInd';
import Divider from '@mui/material/Divider';
import Toolbar from '@mui/material/Toolbar';
import Box from '@mui/material/Box';

interface SidebarProps {
  mobileOpen: boolean;
  handleDrawerToggle: () => void;
  onPageChange: (page: string) => void; // Función para cambiar la página principal
}

const drawerWidth = 240;

const Sidebar: React.FC<SidebarProps> = ({ mobileOpen, handleDrawerToggle, onPageChange }) => {
  const handlePageChange = (page: string) => {
    onPageChange(page);
    handleDrawerToggle(); // Cerrar la barra lateral después de seleccionar una página (opcional)
  };

  const drawer = (
    <div>
      <Toolbar />
      <Divider />
      <List>
        <ListItem button onClick={() => handlePageChange('home')}>
          <ListItemIcon><HomeIcon /></ListItemIcon>
          <ListItemText primary="Home" />
        </ListItem>
        <ListItem button onClick={() => handlePageChange('analytics')}>
          <ListItemIcon><BarChartIcon /></ListItemIcon>
          <ListItemText primary="Analytics" />
        </ListItem>
        <ListItem button onClick={() => handlePageChange('teacanalytics')}>
          <ListItemIcon><BarChartIcon /></ListItemIcon>
          <ListItemText primary="TeacMetrics" />
        </ListItem>
        <ListItem button onClick={() => handlePageChange('settings')}>
          <ListItemIcon><SettingsIcon /></ListItemIcon>
          <ListItemText primary="Settings" />
        </ListItem>
        <ListItem button onClick={() => handlePageChange('about')}>
          <ListItemIcon><InfoIcon /></ListItemIcon>
          <ListItemText primary="About" />
        </ListItem>
        <ListItem button onClick={() => handlePageChange('join')}>
          <ListItemIcon><GroupAddIcon /></ListItemIcon>
          <ListItemText primary="Join Us" />
        </ListItem>
        <ListItem button onClick={() => handlePageChange('search')}>
          <ListItemIcon><SearchIcon /></ListItemIcon>
          <ListItemText primary="Search" />
        </ListItem>
        <ListItem button onClick={() => handlePageChange('userManagement')}>
          <ListItemIcon><PeopleIcon /></ListItemIcon>
          <ListItemText primary="User Management" />
        </ListItem>
        <ListItem button onClick={() => handlePageChange('learningStyleFelderSilverman')}>
          <ListItemIcon><AssignmentIndIcon /></ListItemIcon>
          <ListItemText primary="Learning Style" />
        </ListItem>
      </List>
    </div>
  );

  return (
    <Box component="nav" sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}>
      <Drawer
        variant="temporary"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{
          keepMounted: true, // Mejora el rendimiento en dispositivos móviles.
        }}
        sx={{
          display: { xs: 'block', sm: 'none' },
          '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
        }}
      >
        {drawer}
      </Drawer>
      <Drawer
        variant="permanent"
        sx={{
          display: { xs: 'none', sm: 'block' },
          '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth, top: '64px' }, // Ajusta el top para alinear con el Header
        }}
        open
      >
        {drawer}
      </Drawer>
    </Box>
  );
};

export default Sidebar;









