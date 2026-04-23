import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router } from 'react-router-dom';
import App from './App';
import './index.css';
import { LikesProvider } from './context/LikesContext';
import { ThemeProvider } from './context/ThemeContext';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ThemeProvider>
      <LikesProvider>
        <Router>
          <App />
        </Router>
      </LikesProvider>
    </ThemeProvider>
  </React.StrictMode>,
);
