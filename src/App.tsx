import React from 'react';
import { ChakraProvider, ColorModeScript } from '@chakra-ui/react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';
import UploadPage from './pages/UploadPage';
import ResultsPage from './pages/ResultsPage';
import InterviewPage from './pages/InterviewPage';
import theme from './theme';
import { ResumeProvider } from './context/ResumeContext';
import styles from './styles/App.module.css';

function App() {
  return (
    <React.StrictMode>
      <ColorModeScript initialColorMode={theme.config.initialColorMode} />
      <ChakraProvider theme={theme}>
        <ResumeProvider>
          <Router>
            <Navbar />
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/upload" element={<UploadPage />} />
              <Route path="/results" element={<ResultsPage />} />
              <Route path="/interview" element={<InterviewPage />} />
            </Routes>
          </Router>
        </ResumeProvider>
      </ChakraProvider>
    </React.StrictMode>
  );
}

export default App; 