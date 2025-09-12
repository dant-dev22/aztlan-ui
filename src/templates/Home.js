// Home.js
import React, { useState, useMemo, useEffect } from "react";
import Form from "../components/Form";
import UploadProof from "../components/UploadProof";
import { Box, Button, Typography } from "@mui/material";
import { keyframes } from "@emotion/react";
import { motion, useAnimation, AnimatePresence, useReducedMotion } from "framer-motion";

const MotionButton = motion(Button);
const MotionBox = motion(Box);

const Home = () => {
  const [view, setView] = useState("menu");
  const [interacted, setInteracted] = useState(false);
  const controls1 = useAnimation();
  const controls2 = useAnimation();

  const handleViewChange = (newView) => setView(newView);

  const title = "Torneo Aztlán 2025";

  // Pulse del título
  const pulseDuration = 2.2;
  const stagger = 0.06;
  const pulse = useMemo(
    () => keyframes`
      0% {
        transform: scale(1);
        text-shadow: 0 0 0 rgba(0,0,0,0);
      }
      45% {
        transform: scale(1.05);
        text-shadow:
          0 0.5rem 0.55rem black,  
          0 0.125rem 0.375rem orange;
      }
      100% {
        transform: scale(1);
        text-shadow: 0 0 0 rgba(0,0,0,0);
      }
    `,
    []
  );

  const shouldReduceMotion = useReducedMotion();

  // Botones bounce
  useEffect(() => {
    if (shouldReduceMotion) return;

    let timer;
    let stopTimeout;
    if (view === "menu" && !interacted) {
      timer = setTimeout(() => {
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

        stopTimeout = setTimeout(() => {
          controls1.stop();
          controls2.stop();
          setInteracted(true);
        }, (0.9 * 3) * 1000 + 250);
      }, 3000);
    }
    return () => {
      clearTimeout(timer);
      clearTimeout(stopTimeout);
    };
  }, [view, interacted, controls1, controls2, shouldReduceMotion]);

  useEffect(() => {
    if (interacted) return;
    const stop = () => {
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

  const handleButtonClick = (nextView) => {
    controls1.stop();
    controls2.stop();
    setInteracted(true);
    handleViewChange(nextView);
  };

  const panelVariants = {
    hidden: { opacity: 0, y: 18, scale: 0.985 },
    visible: { opacity: 1, y: 0, scale: 1 },
    exit: { opacity: 0, y: -10, scale: 0.99 },
  };

  const panelTransition = { duration: 0.45, ease: [0.22, 1, 0.36, 1] };

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

      {/* Contenedor principal con título + espacio reservado */}
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
        {/* Contenedor que reserva espacio para paneles */}
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            minHeight: 320, // <- ajusta según tamaño del título + panel para evitar salto
          }}
        >
          <Typography
            variant="h3"
            component="h1"
            aria-label={title}
            sx={{
              mb: 0,
              fontWeight: "8rem",
              fontSize: view === "register" ? "0rem" : "1rem", // 👈 tamaño dinámico
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
                  animation: isSpace ? "none" : `${pulse} ${pulseDuration}s cubic-bezier(.2,.1,.0,1) ${delay} infinite`,
                  willChange: "transform, text-shadow",
                  fontSize: 
                    view === "register"
                        ? { xs: "2.0rem", sm: "1.4rem", md: "3rem" }
                        : { xs: "2.0rem", sm: "2rem", md: "9rem" },
                  marginRight: isSpace ? "0.45rem" : 0,
                  fontWeight: "bold",
                  fontFamily: "'Bebas Neue', sans-serif",
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

          {/* Menu */}
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
                  fontFamily: "'Montserrat', sans-serif",
                  fontStyle: "light",
                  fontSize: "1.0rem",  
                  boxShadow: "0 4px 10px rgba(0,0,0,0.3)",
                  ...(shouldReduceMotion && { transform: "none" }),
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
                  fontFamily: "'Montserrat', sans-serif",
                  fontStyle: "light",
                  fontSize: "1.0rem",  
                  boxShadow: "0 4px 10px rgba(0,0,0,0.3)",
                  ...(shouldReduceMotion && { transform: "none" }),
                  willChange: "transform",
                }}
              >
                Terminar Registro
              </MotionButton>
            </Box>
          )}

          {/* Paneles animados */}
          <AnimatePresence mode="wait" initial={false}>
            {view === "register" && (
              <MotionBox
                key="register-panel"
                initial={shouldReduceMotion ? false : "hidden"}
                animate={shouldReduceMotion ? false : "visible"}
                exit={shouldReduceMotion ? false : "exit"}
                variants={panelVariants}
                transition={panelTransition}
                sx={{ mt: 2, width: "100%", maxWidth: 760, px: 2 }}
              >
                <Form onBack={() => handleViewChange("menu")} />
              </MotionBox>
            )}

            {view === "uploadProof" && (
              <MotionBox
                key="upload-panel"
                initial={shouldReduceMotion ? false : "hidden"}
                animate={shouldReduceMotion ? false : "visible"}
                exit={shouldReduceMotion ? false : "exit"}
                variants={panelVariants}
                transition={panelTransition}
                sx={{ mt: 2, width: "100%", maxWidth: 760, px: 2 }}
              >
                <UploadProof onBack={() => handleViewChange("menu")} />
              </MotionBox>
            )}
          </AnimatePresence>
        </Box>
      </Box>
    </Box>
  );
};

export default Home;
