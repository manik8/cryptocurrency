// src/Components/organisms/Header/index.tsx

import React from 'react';
import { AppBar, Toolbar, Typography, IconButton, Switch } from '@mui/material';
import { ThemeProps } from '../../../interfaces';
import { neutralRoutes } from '../../../routes/index';

const Header: React.FC<ThemeProps> = ({ darkMode, setDarkMode }) => {
  const handleThemeChange = () => {
    setDarkMode(!darkMode);
  };

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1, cursor: 'pointer' }} onClick={() => window.open(neutralRoutes.home, '_self')}>
          Cryptocurrency Dashboard
        </Typography>
        <Switch checked={darkMode} onChange={handleThemeChange} />
      </Toolbar>
    </AppBar>
  );
};

export default Header;
