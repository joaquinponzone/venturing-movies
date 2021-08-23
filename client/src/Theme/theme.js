import { createTheme } from "@material-ui/core/styles";

// A custom theme for this app
const theme = createTheme({
  palette: {
    primary: {
      main: "#333996",
      light: "#C5CAE9",
    },
    secondary: {
      main: "#f83245",
      light: "#f8324526",
    },
    selection: {
      main: "#E8EAF6",
    },
    background: {
      default: "#f4f5fd",
    },
  },
  props: {
    MuiIconButton: {
      disableRipple: true,
    },
  },
});

export default theme;
