import React from 'react';
import { Link, Routes, Route } from 'react-router-dom'; // Importar Routes y Route
import './App.css'; // Importar los estilos CSS

import Home from './templates/Home'; // Componente Home

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Routes>
          <Route path="/" element={<Home />} /> {/* Ruta para Home */}
        </Routes>
      </header>
    </div>
  );
}

export default App;