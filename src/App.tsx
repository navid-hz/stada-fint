// src/App.tsx
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import Navbar from './components/Navbar';
import Home from './views/Home';
import Bookings from './views/Bookings';
import theme from './theme';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/bookings" element={<Bookings />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
