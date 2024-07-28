import React from 'react';
import Header from '../../organisms/Header';
import { CssBaseline, ThemeProvider, createTheme } from '@mui/material';
import CryptoChart from '../../organisms/CryptoChart';

const CryptoTemplate: React.FC = () => {
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
      <CryptoChart />
     </ThemeProvider>
  );
};

export default CryptoTemplate;

