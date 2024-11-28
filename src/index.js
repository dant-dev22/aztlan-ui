import React from "react";
import ReactDOM from "react-dom";
import { CssBaseline, ThemeProvider, createTheme } from "@mui/material";
import { Provider } from "react-redux";
import { store } from "./store";
import Home from "./templates/Home";

// Crear un tema personalizado (opcional)
const theme = createTheme({
  palette: {
    primary: {
      main: "#1976d2", // Azul predeterminado de Material-UI
    },
    secondary: {
      main: "#f50057", // Rosa predeterminado
    },
  },
});

ReactDOM.render(
  <Provider store={store}>
    <ThemeProvider theme={theme}>
      <CssBaseline /> {/* Reinicia los estilos básicos */}
      <Home />
    </ThemeProvider>
  </Provider>,
  document.getElementById("root")
);