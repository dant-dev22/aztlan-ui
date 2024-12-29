import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { store } from "./store";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"; // Importar react-router-dom

import App from "./App"; 
import AdminAztlan from "./templates/AdminAztlan";
import Aztlan2024 from "./components/Aztlan2024";

ReactDOM.render(
  <Provider store={store}>
      <Router>
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="/admin-aztlan" element={<AdminAztlan />} />
          <Route path="/aztlan-2024" element={<Aztlan2024 />} />
        </Routes>
      </Router>
  </Provider>,
  document.getElementById("root")
);