import React, { useState } from "react";
import Form from "../components/Form";
import UploadProof from "../components/UploadProof";
import { Box, Button, Typography } from "@mui/material";

const Home = () => {
  const [view, setView] = useState("menu");

  const handleViewChange = (newView) => {
    setView(newView);
  };

  return (
    <Box
      sx={{
        position: "relative",
        width: "100vw",
        height: "100vh",
        overflow: "hidden",
      }}
    >
      {/* Imagen de fondo */}
      <Box
        component="img"
        src="https://aztlang-grappling-images.s3.us-east-1.amazonaws.com/assets/bg-image-aztlan.jpeg"
        alt="Aztlan Grappling Background"
        sx={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          objectFit: "cover",
          zIndex: -1,
          opacity: 0.9, // puedes ajustar la opacidad si quieres resaltar los botones
        }}
      />

      {/* Contenido principal */}
      <Box
        sx={{
          position: "relative",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          textAlign: "center",
          color: "#fff",
          backdropFilter: "brightness(0.9)", // mejora contraste del texto con fondo
        }}
      >
        <Typography
          variant="h3"
          sx={{ mb: 4, fontWeight: "bold", textShadow: "2px 2px 4px rgba(0,0,0,0.7)" }}
        >
          Aztlan Grappling 2025
        </Typography>

        {view === "menu" && (
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              gap: "2rem", // separación entre botones
            }}
          >
            <Button
              variant="contained"
              sx={{
                padding: "1rem 2rem",
                backgroundColor: "#FF5722",
                color: "white",
                borderRadius: "8px",
                fontSize: "1rem",
                boxShadow: "0 4px 10px rgba(0,0,0,0.3)",
              }}
              onClick={() => handleViewChange("register")}
            >
              Registrarse
            </Button>

            <Button
              variant="contained"
              sx={{
                padding: "1rem 2rem",
                backgroundColor: "#FFC107",
                color: "white",
                borderRadius: "8px",
                fontSize: "1rem",
                boxShadow: "0 4px 10px rgba(0,0,0,0.3)",
              }}
              onClick={() => handleViewChange("uploadProof")}
            >
              Terminar Registro
            </Button>
          </Box>
        )}

        {view === "register" && (
          <Form onBack={() => handleViewChange("menu")} />
        )}
        {view === "uploadProof" && (
          <UploadProof onBack={() => handleViewChange("menu")} />
        )}
      </Box>
    </Box>
  );
};

export default Home;
