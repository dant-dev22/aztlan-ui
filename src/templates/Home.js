import React, { useState } from "react";
import Form from "../components/Form";
import UploadProof from "../components/UploadProof";

const Home = () => {
  const [view, setView] = useState("menu"); // 'menu', 'register', or 'uploadProof'

  const handleViewChange = (newView) => {
    setView(newView);
  };

  return (
    <div style={{ padding: "2rem", fontFamily: "Arial, sans-serif" }}>
      <h1 style={{ textAlign: "center" }}>Torneo de BJJ - Registro</h1>
      {view === "menu" && (
        <div style={{ textAlign: "center" }}>
          <button
            style={{
              padding: "1rem 2rem",
              margin: "1rem",
              backgroundColor: "#1976d2",
              color: "white",
              border: "none",
              borderRadius: "4px",
              cursor: "pointer",
            }}
            onClick={() => handleViewChange("register")}
          >
            Registrarse
          </button>
          <button
            style={{
              padding: "1rem 2rem",
              margin: "1rem",
              backgroundColor: "#f50057",
              color: "white",
              border: "none",
              borderRadius: "4px",
              cursor: "pointer",
            }}
            onClick={() => handleViewChange("uploadProof")}
          >
            Subir Comprobante
          </button>
        </div>
      )}
      {view === "register" && <Form />}
      {view === "uploadProof" && <UploadProof onBack={() => handleViewChange("menu")} />}
    </div>
  );
};

export default Home;