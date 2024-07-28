// App.tsx or App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './Components/pages/Home';
import CryptoDetails from './Components/pages/CryptoDetails';

const App: React.FC = () => (
  <Router>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/details/:id" element={<CryptoDetails />} />
    </Routes>
  </Router>
);

export default App;
