import React from 'react';
import { Routes, Route } from 'react-router-dom'; // Importar Routes y Route
import './App.css'; // Importar los estilos CSS
import Home from './templates/Home'; // Componente Home
import AdminAztlan from './templates/AdminAztlan';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/admin-aztlan" element={<AdminAztlan />} />
        </Routes>
      </header>
    </div>
  );
}

export default App;