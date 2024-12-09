import React from "react";
import ReactDOM from "react-dom";
import { CssBaseline, ThemeProvider, createTheme } from "@mui/material";
import { Provider } from "react-redux";
import { store } from "./store";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"; // Importar react-router-dom
import AdminAztlan from "./templates/AdminAztlan";

import App from "./App"; // Importamos el componente App

ReactDOM.render(
  <Provider store={store}>
      <CssBaseline /> {/* Reinicia los estilos básicos */}
      <Router>
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="/admin-aztlan" element={<AdminAztlan />} />
        </Routes>
      </Router>
  </Provider>,
  document.getElementById("root")
);