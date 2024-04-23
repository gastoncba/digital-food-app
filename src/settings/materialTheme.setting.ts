import { createTheme } from '@mui/material/styles';

export const themeMaterial = createTheme({
  typography: {
    fontFamily: 'Helvetica-Neue-Roman, sans-serif',

    h1: {
      lineHeight: '95%',
      letterSpacing: '-0.05em',
    },

    h2: {
      lineHeight: '95%',
      letterSpacing: '-0.05em',
    },

    h3: {
      lineHeight: '95%',
      letterSpacing: '-0.05em',
    },

    h4: {
      lineHeight: '95%',
      letterSpacing: '-0.05em',
    },

    h5: {
      lineHeight: '95%',
      letterSpacing: '-0.05em',
    },

    h6: {
      lineHeight: '95%',
      letterSpacing: '-0.05em',
    },

    button: {
      textTransform: 'capitalize',
    },
  },

  palette: {
    primary: {
      light: '#FFE7F5',
      main: '#FF17E9',
      dark: '#b210a3',
      contrastText: '#fff',
    },
    success: {
      main: '#1dbf17',
    },
    warning: {
      light: '#ef0f0f',
      main: '#c20a12',
    },
    text: {
      primary: '#121212',
    },
  },

  components: {},
});
