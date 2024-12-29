import React from "react";
import { Routes, Route } from "react-router-dom";
import "./App.css";
import Home from "./templates/Home";
import AdminAztlan from "./templates/AdminAztlan";
import Navbar from "./components/Navbar"; // Nuevo componente de navbar

function App() {
  return (
    <div className="App">
      {/* Header con el Navbar */}
      <header>
        <Navbar />
      </header>

      {/* Body de la aplicación */}
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/admin-aztlan" element={<AdminAztlan />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
