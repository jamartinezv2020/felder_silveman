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
  onPageChange: (page: string) => void;
}

const drawerWidth = 240;

const Sidebar: React.FC<SidebarProps> = ({ mobileOpen, handleDrawerToggle, onPageChange }) => {
  const handlePageChange = (page: string) => {
    onPageChange(page);
    handleDrawerToggle();
  };

  const drawer = (
    <div>
      <Toolbar />
      <Divider />
      <List>
        {[
          { text: 'Home', icon: <HomeIcon />, page: 'home' },
          { text: 'Analytics', icon: <BarChartIcon />, page: 'analytics' },
          { text: 'TeacMetrics', icon: <BarChartIcon />, page: 'teacanalytics' },
          { text: 'Settings', icon: <SettingsIcon />, page: 'settings' },
          { text: 'About', icon: <InfoIcon />, page: 'about' },
          { text: 'Join Us', icon: <GroupAddIcon />, page: 'join' },
          { text: 'Search', icon: <SearchIcon />, page: 'search' },
          { text: 'User Management', icon: <PeopleIcon />, page: 'userManagement' },
          { text: 'Learning Style', icon: <AssignmentIndIcon />, page: 'learningStyleFelderSilverman' },
        ].map(({ text, icon, page }) => (
          <ListItem button onClick={() => handlePageChange(page)} key={text} sx={{ '&:hover': { bgcolor: 'primary.light' } }}>
            <ListItemIcon>{icon}</ListItemIcon>
            <ListItemText primary={text} />
          </ListItem>
        ))}
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
          keepMounted: true,
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
          '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth, top: '64px' },
        }}
        open
      >
        {drawer}
      </Drawer>
    </Box>
  );
};

export default Sidebar;










