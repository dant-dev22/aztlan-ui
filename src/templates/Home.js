import React, { useState } from "react";
import Form from "../components/Form";
import UploadProof from "../components/UploadProof";

const Home = () => {
  const [view, setView] = useState("menu"); // 'menu', 'register', or 'uploadProof'

  const handleViewChange = (newView) => {
    setView(newView);
  };

  return (
    <div
      style={{
        padding: "2rem",
        fontFamily: "Arial, sans-serif",
        transition: "opacity 0.5s ease-in-out",
      }}
    >
      <h1 style={{ textAlign: "center", color: "#1C1C1C" }}>Aztlan Grappling 2025</h1>
      {view === "menu" && (
        <div style={{ textAlign: "center" }}>
          <button
            style={{
              padding: "1rem 2rem",
              margin: "1rem",
              backgroundColor: "#FF5722",
              color: "white",
              border: "none",
              borderRadius: "4px",
              cursor: "pointer",
            }}
            onClick={() => handleViewChange("register")}
          >
            Registrarse
          </button>
          <div>
            <p style={{ margin: "1rem 0", color: "#333" }}>
              ¿No has subido tu comprobante? Completa tu registro subiendo tu comprobante aquí:
            </p>
            <button
              style={{
                padding: "1rem 2rem",
                margin: "1rem",
                backgroundColor: "#FFC107",
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
        </div>
      )}
      {view === "register" && <Form onBack={() => handleViewChange("menu")} />}
      {view === "uploadProof" && <UploadProof onBack={() => handleViewChange("menu")} />}
    </div>
  );
};

export default Home;
