// Home.js
import React, { useState, useMemo } from "react";
import Form from "../components/Form";
import UploadProof from "../components/UploadProof";
import { Box, Button, Typography } from "@mui/material";
import { keyframes } from "@emotion/react";

const Home = () => {
  const [view, setView] = useState("menu");
  const handleViewChange = (newView) => setView(newView);

  const title = "Torneo Aztlán 2025";

  // Configuración del "latido"
  const pulseDuration = 8.2; // segundos por ciclo
  const stagger = 0.06; // segundos entre letras

  // keyframes del pulso: escala y sombra
  const pulse = useMemo(
    () => keyframes`
      0% {
        transform: scale(1);
        text-shadow: 0 0 0 rgba(0,0,0,0);
      }
      45% {
        transform: scale(1.32);
        text-shadow: 0 8px 9px black, 0 2px 6px orange;
      }
      100% {
        transform: scale(1);
        text-shadow: 0 0 0 rgba(0,0,0,0);
      }
    `,
    []
  );

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
          opacity: 0.9,
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
          backdropFilter: "brightness(0.9)",
          px: 2,
        }}
      >
        {/* Título: accesible con aria-label, visualmente renderizado letra a letra */}
        <Typography
          variant="h3"
          component="h1"
          aria-label={title}
          sx={{
            mb: 4,
            fontWeight: "700",
            fontFamily: '"League Spartan", "Roboto", sans-serif', // <- aquí
            fontSize: '3rem',
            display: "inline-block",
            whiteSpace: "nowrap",
          }}
        >
          <Box
            component="span"
            sx={{
              // contenedor inline para las letras
              display: "inline-block",
              lineHeight: 1,
            }}
          >
            {Array.from(title).map((char, i) => {
              const isSpace = char === " ";
              // delay escalonado por índice (puedes usar negative delays si quieres fase adelantada)
              const delay = (i * stagger).toFixed(3) + "s";

              // estilos por letra
              const letterSx = {
                display: "inline-block",
                transformOrigin: "center center",
                // aplica la animación solo si no es espacio
                animation: isSpace
                  ? "none"
                  : `${pulse} ${pulseDuration}s cubic-bezier(.4,.0,.2,1) ${delay} infinite`,
                willChange: "transform, text-shadow",
                // tamaño y espaciado (ajusta según tu tipografía)
                fontSize: { xs: "1.6rem", sm: "2rem", md: "3.5rem" },
                marginRight: isSpace ? "0.45rem" : 0,
                fontFamily: '"League Spartan", "Roboto", sans-serif',
                // color y sombra base (sutileza)
                color: "white",
                // suaviza el borde de la letra para el transform
                WebkitFontSmoothing: "antialiased",
                MozOsxFontSmoothing: "grayscale",
              };

              // para accesibilidad: cada span visual debe ser aria-hidden para no leer letra por letra
              return (
                <Box
                  component="span"
                  key={`char-${i}-${char}`}
                  aria-hidden="true"
                  sx={letterSx}
                >
                  {char === " " ? "\u00A0" : char}
                </Box>
              );
            })}
          </Box>
        </Typography>

        {view === "menu" && (
          <Box sx={{ display: "flex", justifyContent: "center", gap: "2rem" }}>
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
                backgroundColor: "#1976D2",
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

        {view === "register" && <Form onBack={() => handleViewChange("menu")} />}
        {view === "uploadProof" && <UploadProof onBack={() => handleViewChange("menu")} />}
      </Box>
    </Box>
  );
};

export default Home;
