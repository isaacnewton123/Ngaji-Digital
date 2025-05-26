import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Box from '@mui/material/Box';
import Home from './pages/Home';
import NahwuChat from './pages/NahwuChat';
import About from './pages/About';
import Header from './components/Header';
import Footer from './components/Footer';
import ThemeProvider from './components/ThemeProvider';

function App() {
  // Create an array of navigation items to pass to Header
  const navItems = [
    { label: 'Home', path: '/' },
    { label: 'AI Nahwu', path: '/nahwu-chat' },
    { label: 'About', path: '/about' },
  ];

  return (
    <ThemeProvider>
      <Router>
        <Box sx={{ 
          display: 'flex', 
          flexDirection: 'column',
          minHeight: '100vh' 
        }}>
          <Header navItems={navItems} />
          <Box sx={{ flexGrow: 1 }}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/nahwu-chat" element={<NahwuChat />} />
              <Route path="/about" element={<About />} />
            </Routes>
          </Box>
          <Footer />
        </Box>
      </Router>
    </ThemeProvider>
  );
}

export default App;
