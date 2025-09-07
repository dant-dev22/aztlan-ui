// Home.js
import React, { useState, useMemo, useEffect } from "react";
import Form from "../components/Form";
import UploadProof from "../components/UploadProof";
import { Box, Button, Typography } from "@mui/material";
import { keyframes } from "@emotion/react";
import { motion, useAnimation } from "framer-motion";

const MotionButton = motion(Button);

const Home = () => {
  const [view, setView] = useState("menu");
  const [interacted, setInteracted] = useState(false); // marca si usuario interactuó
  const controls1 = useAnimation();
  const controls2 = useAnimation();

  const handleViewChange = (newView) => setView(newView);

  const title = "Torneo Aztlán 2025";

  // Configuración del "latido"
  const pulseDuration = 8.2; // segundos por ciclo
  const stagger = 0.06; // segundos entre letras

  // keyframes del pulso: escala y sombra (usando emotion)
  const pulse = useMemo(
    () => keyframes`
      0% {
        transform: scale(1);
        text-shadow: 0 0 0 rgba(0,0,0,0);
      }
      45% {
        transform: scale(1.32);
        text-shadow: 0 8px 19px gray, 0 2px 6px orange;
      }
      100% {
        transform: scale(1);
        text-shadow: 0 0 0 rgba(0,0,0,0);
      }
    `,
    []
  );

  // Detecta preferencia de reduced-motion (segura con SSR)
  const prefersReducedMotion =
    typeof window !== "undefined" && window.matchMedia
      ? window.matchMedia("(prefers-reduced-motion: reduce)").matches
      : false;

  // Inicia la animación con framer-motion tras 3s sin interacción
  useEffect(() => {
    if (prefersReducedMotion) return; // no animar si el usuario lo pidió

    let timer;
    let stopTimeout;

    if (view === "menu" && !interacted) {
      timer = setTimeout(() => {
        // Inicio de la secuencia: cada control hará 3 saltos (repeat: 2 -> total 3 ejecuciones)
        controls1.start({
          y: [0, -8, 0],
          scale: [1, 1.02, 1],
          transition: { duration: 0.9, ease: "easeInOut", repeat: 2, repeatDelay: 0 },
        });

        controls2.start({
          y: [0, -8, 0],
          scale: [1, 1.02, 1],
          transition: { duration: 0.9, ease: "easeInOut", repeat: 2, repeatDelay: 0, delay: 0.18 },
        });

        // Después de ~ (0.9 * 3) segundos + small buffer, forzamos stop y marcamos interacción para no re-trigger
        stopTimeout = setTimeout(() => {
          controls1.stop();
          controls2.stop();
          setInteracted(true); // evitar que la animación vuelva a dispararse
        }, (0.9 * 3) * 1000 + 250);
      }, 2000);
    }

    return () => {
      clearTimeout(timer);
      clearTimeout(stopTimeout);
    };
  }, [view, interacted, controls1, controls2, prefersReducedMotion]);

  // Listeners para detectar interacción "real" (no mousemove)
  useEffect(() => {
    if (interacted) return;

    const stop = () => {
      // Detenemos animaciones y marcamos que hubo interacción
      controls1.stop();
      controls2.stop();
      setInteracted(true);
    };

    window.addEventListener("scroll", stop, { passive: true });
    window.addEventListener("touchstart", stop, { passive: true });
    window.addEventListener("pointerdown", stop, { passive: true });
    window.addEventListener("keydown", stop, { passive: true });

    return () => {
      window.removeEventListener("scroll", stop);
      window.removeEventListener("touchstart", stop);
      window.removeEventListener("pointerdown", stop);
      window.removeEventListener("keydown", stop);
    };
  }, [interacted, controls1, controls2]);

  // Click en botón: marca interacción, detiene animaciones y cambia vista
  const handleButtonClick = (nextView) => {
    controls1.stop();
    controls2.stop();
    setInteracted(true);
    handleViewChange(nextView);
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
            fontFamily: '"League Spartan", "Roboto", sans-serif',
            fontSize: "3rem",
            display: "inline-block",
            whiteSpace: "nowrap",
          }}
        >
          <Box component="span" sx={{ display: "inline-block", lineHeight: 1 }}>
            {Array.from(title).map((char, i) => {
              const isSpace = char === " ";
              const delay = (i * stagger).toFixed(3) + "s";

              const letterSx = {
                display: "inline-block",
                transformOrigin: "center center",
                animation: isSpace
                  ? "none"
                  : `${pulse} ${pulseDuration}s cubic-bezier(.4,.0,.2,1) ${delay} infinite`,
                willChange: "transform, text-shadow",
                fontSize: { xs: "1.6rem", sm: "2rem", md: "3.5rem" },
                marginRight: isSpace ? "0.45rem" : 0,
                fontFamily: '"League Spartan", "Roboto", sans-serif',
                color: "white",
                WebkitFontSmoothing: "antialiased",
                MozOsxFontSmoothing: "grayscale",
              };

              return (
                <Box component="span" key={`char-${i}-${char}`} aria-hidden="true" sx={letterSx}>
                  {char === " " ? "\u00A0" : char}
                </Box>
              );
            })}
          </Box>
        </Typography>

        {view === "menu" && (
          <Box sx={{ display: "flex", justifyContent: "center", gap: "2rem" }}>
            <MotionButton
              variant="contained"
              onClick={() => handleButtonClick("register")}
              animate={controls1}
              sx={{
                padding: "1rem 2rem",
                backgroundColor: "#FF5722",
                color: "white",
                borderRadius: "8px",
                fontSize: "1rem",
                boxShadow: "0 4px 10px rgba(0,0,0,0.3)",
                // Respeta reduced-motion: no animar si user lo pidió
                ...(prefersReducedMotion && { transform: "none" }),
                willChange: "transform",
              }}
            >
              Registrarse
            </MotionButton>

            <MotionButton
              variant="contained"
              onClick={() => handleButtonClick("uploadProof")}
              animate={controls2}
              sx={{
                padding: "1rem 2rem",
                backgroundColor: "#1976D2",
                color: "white",
                borderRadius: "8px",
                fontSize: "1rem",
                boxShadow: "0 4px 10px rgba(0,0,0,0.3)",
                ...(prefersReducedMotion && { transform: "none" }),
                willChange: "transform",
              }}
            >
              Terminar Registro
            </MotionButton>
          </Box>
        )}

        {view === "register" && <Form onBack={() => handleViewChange("menu")} />}
        {view === "uploadProof" && <UploadProof onBack={() => handleViewChange("menu")} />}
      </Box>
    </Box>
  );
};

export default Home;
