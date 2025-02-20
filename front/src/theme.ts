import { createTheme } from "@mui/material";

const theme = createTheme({
  cssVariables: true,
  palette: {
    mode: 'dark',
    primary: {
      main: '#3acc67',
      dark: '#009249',
      light: '#7cf98f'
    },
    secondary: {
      main: '#29dcf7',
      dark: '#1b9fae',
      light: '#57e9fd'
    },
  },
});

export default theme;