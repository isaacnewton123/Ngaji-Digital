import React from 'react';
import { createTheme, ThemeProvider as MuiThemeProvider, CssBaseline } from '@mui/material';
import { alpha } from '@mui/material/styles';

// Create a custom theme with refined colors and typography
const theme = createTheme({
  palette: {
    primary: {
      main: '#4267B2',
      light: '#6889D5',
      dark: '#2E4A8F',
      contrastText: '#ffffff',
    },
    secondary: {
      main: '#40A4C8',
      light: '#66BBDB',
      dark: '#2B80A2',
      contrastText: '#ffffff',
    },
    warning: {
      main: '#FFA726',
      light: '#FFB851',
      dark: '#F57C00',
      contrastText: 'rgba(0, 0, 0, 0.87)',
    },
    info: {
      main: '#29B6F6',
      light: '#4FC3F7',
      dark: '#0288D1',
      contrastText: 'rgba(0, 0, 0, 0.87)',
    },
    background: {
      default: '#F8F9FA',
      paper: '#FFFFFF',
    },
    text: {
      primary: '#263238',
      secondary: '#546E7A',
    },
    divider: 'rgba(0, 0, 0, 0.06)',
  },
  typography: {
    fontFamily: [
      'Inter',
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
    ].join(','),
    h1: {
      fontWeight: 700,
      fontSize: '3rem',
    },
    h2: {
      fontWeight: 700,
      fontSize: '2.5rem',
    },
    h3: {
      fontWeight: 600,
      fontSize: '2rem',
    },
    h4: {
      fontWeight: 600,
      fontSize: '1.5rem',
    },
    h5: {
      fontWeight: 600,
      fontSize: '1.25rem',
    },
    h6: {
      fontWeight: 600,
      fontSize: '1rem',
    },
    body1: {
      fontSize: '1rem',
      lineHeight: 1.6,
    },
    body2: {
      fontSize: '0.875rem',
      lineHeight: 1.6,
    },
    button: {
      textTransform: 'none',
      fontWeight: 500,
    },
  },
  shape: {
    borderRadius: 8,
  },
  shadows: [
    'none',
    `0 2px 4px 0 ${alpha('#000', 0.05)}`,
    `0 3px 6px 0 ${alpha('#000', 0.07)}`,
    `0 4px 8px 0 ${alpha('#000', 0.08)}`,
    `0 5px 10px 0 ${alpha('#000', 0.09)}`,
    `0 6px 12px 0 ${alpha('#000', 0.1)}`,
    `0 8px 16px 0 ${alpha('#000', 0.11)}`,
    `0 10px 20px 0 ${alpha('#000', 0.12)}`,
    `0 12px 24px 0 ${alpha('#000', 0.13)}`,
    `0 14px 28px 0 ${alpha('#000', 0.14)}`,
    `0 16px 32px 0 ${alpha('#000', 0.15)}`,
    `0 18px 36px 0 ${alpha('#000', 0.16)}`,
    `0 20px 40px 0 ${alpha('#000', 0.17)}`,
    `0 22px 44px 0 ${alpha('#000', 0.18)}`,
    `0 24px 48px 0 ${alpha('#000', 0.19)}`,
    `0 26px 52px 0 ${alpha('#000', 0.2)}`,
    `0 28px 56px 0 ${alpha('#000', 0.21)}`,
    `0 30px 60px 0 ${alpha('#000', 0.22)}`,
    `0 32px 64px 0 ${alpha('#000', 0.23)}`,
    `0 34px 68px 0 ${alpha('#000', 0.24)}`,
    `0 36px 72px 0 ${alpha('#000', 0.25)}`,
    `0 38px 76px 0 ${alpha('#000', 0.26)}`,
    `0 40px 80px 0 ${alpha('#000', 0.27)}`,
    `0 42px 84px 0 ${alpha('#000', 0.28)}`,
    `0 44px 88px 0 ${alpha('#000', 0.29)}`,
  ],
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          padding: '8px 16px',
          boxShadow: 'none',
          '&:hover': {
            boxShadow: 'none',
          },
        },
        contained: {
          '&:hover': {
            boxShadow: 'none',
          },
        },
        outlined: {
          borderWidth: 1.5,
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          boxShadow: `0 2px 8px 0 ${alpha('#000', 0.06)}`,
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          boxShadow: `0 2px 8px 0 ${alpha('#000', 0.06)}`,
        },
      },
    },
    MuiInputBase: {
      styleOverrides: {
        root: {
          fontSize: '0.95rem',
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          boxShadow: 'none',
        },
      },
    },
    MuiAlert: {
      styleOverrides: {
        root: {
          fontSize: '0.875rem',
          alignItems: 'center',
        },
        icon: {
          alignItems: 'center',
        },
      },
    },
  },
});

const ThemeProvider: React.FC<{children: React.ReactNode}> = ({ children }) => {
  return (
    <MuiThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </MuiThemeProvider>
  );
};

export default ThemeProvider; 