import { createTheme } from '@mui/material';

export const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#00f5d4',
      light: '#80fff2',
      dark: '#00c4b8',
      contrastText: '#121212',
    },
    secondary: {
      main: '#7209b7',
      light: '#9c42d6',
      dark: '#4a0077',
      contrastText: '#ffffff',
    },
    background: {
      default: '#0a0b0e',
      paper: 'rgba(16, 18, 24, 0.95)',
    },
    divider: 'rgba(255, 255, 255, 0.08)',
    custom: {
      neon: '#00f5d4',
      glow: 'rgba(0, 245, 212, 0.3)',
      glassFill: 'rgba(255, 255, 255, 0.03)',
      glassStroke: 'rgba(255, 255, 255, 0.1)',
    },
  },
  typography: {
    fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
      fontSize: '3.5rem',
      backgroundImage: 'linear-gradient(45deg, #00f5d4, #7209b7)',
      backgroundClip: 'text',
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
      fontWeight: 800,
      letterSpacing: '-0.02em',
      textShadow: '0 0 40px rgba(0, 245, 212, 0.5)',
    },
    h6: {
      letterSpacing: '0.1em',
      textTransform: 'uppercase',
    },
  },
  shape: {
    borderRadius: 16,
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          textTransform: 'none',
          padding: '14px 28px',
          transition: 'all 0.3s ease',
          background: 'rgba(255, 255, 255, 0.03)',
          backdropFilter: 'blur(10px)',
          border: '1px solid rgba(255, 255, 255, 0.1)',
          '&:hover': {
            transform: 'translateY(-2px)',
            boxShadow: '0 8px 20px rgba(0, 245, 212, 0.2)',
          },
        },
        contained: {
          background: 'linear-gradient(45deg, #00f5d4, #7209b7)',
          '&:hover': {
            background: 'linear-gradient(45deg, #00c4b8, #4a0077)',
          },
        },
        outlined: {
          borderColor: 'rgba(255, 255, 255, 0.1)',
          '&:hover': {
            borderColor: '#00f5d4',
            backgroundColor: 'rgba(0, 245, 212, 0.1)',
          },
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          background: 'rgba(16, 18, 24, 0.95)',
          backdropFilter: 'blur(20px)',
          borderRadius: 24,
          border: '1px solid rgba(255, 255, 255, 0.05)',
          boxShadow: '0 4px 30px rgba(0, 0, 0, 0.1)',
          '&:hover': {
            boxShadow: '0 8px 40px rgba(0, 245, 212, 0.1)',
          },
        },
      },
    },
    MuiLinearProgress: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          background: 'rgba(255, 255, 255, 0.05)',
          backdropFilter: 'blur(10px)',
        },
        bar: {
          borderRadius: 8,
          background: 'linear-gradient(90deg, #00f5d4, #7209b7)',
        },
      },
    },
    MuiCssBaseline: {
      styleOverrides: {
        '*': {
          scrollbarWidth: 'thin',
          scrollbarColor: '#00f5d4 rgba(255, 255, 255, 0.05)',
        },
        '*::-webkit-scrollbar': {
          width: '8px',
          height: '8px',
        },
        '*::-webkit-scrollbar-track': {
          background: 'rgba(255, 255, 255, 0.05)',
          borderRadius: '4px',
        },
        '*::-webkit-scrollbar-thumb': {
          background: 'linear-gradient(45deg, #00f5d4, #7209b7)',
          borderRadius: '4px',
        },
      },
    },
  },
});