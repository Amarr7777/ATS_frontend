import React, { useRef } from 'react';
import { ChakraProvider, ColorModeScript } from '@chakra-ui/react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';
import UploadPage from './pages/UploadPage';
import ResultsPage from './pages/ResultsPage';
import InterviewPage from './pages/InterviewPage';
import theme from './theme';
import { ResumeProvider } from './context/ResumeContext';
import styles from './styles/App.module.css';

function AppContent() {
  const tryItNowRef = useRef<HTMLButtonElement>(null);
  const location = useLocation();

  const handleScrollToTryItNow = () => {
    if (tryItNowRef.current) {
      const navbarHeight = 64; // Adjust based on your navbar height
      const offsetTop = tryItNowRef.current.getBoundingClientRect().top + window.scrollY - navbarHeight;
      window.scrollTo({ top: offsetTop, behavior: 'smooth' });
    }
  };

  return (
    <>
      <Navbar onGetStartedClick={location.pathname === '/' ? handleScrollToTryItNow : undefined} />
      <Routes>
        <Route path="/" element={<HomePage tryItNowRef={tryItNowRef} />} />
        <Route path="/upload" element={<UploadPage />} />
        <Route path="/results" element={<ResultsPage />} />
        <Route path="/interview" element={<InterviewPage />} />
      </Routes>
    </>
  );
}

function App() {
  return (
    <React.StrictMode>
      <ColorModeScript initialColorMode={theme.config.initialColorMode} />
      <ChakraProvider theme={theme}>
        <ResumeProvider>
          <Router>
            <AppContent />
          </Router>
        </ResumeProvider>
      </ChakraProvider>
    </React.StrictMode>
  );
}

export default App;