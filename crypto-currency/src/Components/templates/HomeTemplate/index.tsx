import React from 'react';
import Header from '../../organisms/Header';
import CryptoTable from '../../organisms/CryptoTable';
import { CssBaseline, ThemeProvider, createTheme } from '@mui/material';

const HomeTemplate: React.FC = () => {
  const [darkMode, setDarkMode] = React.useState<boolean>(false);

  const theme = createTheme({
    palette: {
      mode: darkMode ? 'dark' : 'light',
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Header setDarkMode={setDarkMode} darkMode={darkMode} />
      <CryptoTable />
      {/* Rest of your app components */}
    </ThemeProvider>
  );
};

export default HomeTemplate;

