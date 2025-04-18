import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from '@mui/material';
import App from './App';
import AnalysisReport from './components/AnalysisReport';
import { theme } from './theme/theme';
import './index.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <Router>
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="/report" element={<AnalysisReport />} />
        </Routes>
      </Router>
    </ThemeProvider>
  </React.StrictMode>
);
