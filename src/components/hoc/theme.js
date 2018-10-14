import { createMuiTheme } from '@material-ui/core/styles';

export const theme = createMuiTheme({
  typography: {
    useNextVariants: true,
    fontFamily: 'Josefin Sans',
    body1: {
      fontFamily: 'Montserrat',
      fontWeight: 400
    },
    h1: {
      fontFamily: 'Josefin Sans',
      fontWeight: 700,
      fontSize: 50,
    },
  },
  palette: {
    primary: {
      main: '#64b5f6',
    },
    secondary: {
      main: '#ff7043',
    },
  },
});