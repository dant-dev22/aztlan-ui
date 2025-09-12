import React from "react";
import { Box, Grid, Typography, Button } from "@mui/material";
import Navbar from "./Navbar";
import Footer from "./Footer"; 
import { keyframes } from "@emotion/react";

// Animación fade-in con ligera subida
const fadeInUp = keyframes`
  0% { opacity: 0; transform: translateY(20px); }
  100% { opacity: 1; transform: translateY(0); }
`;

// Animación de hover para tarjetas
const hoverLift = keyframes`
  0% { transform: translateY(0); }
  50% { transform: translateY(-4px); }
  100% { transform: translateY(0); }
`;

const Aztlan2024 = () => {
  const videos = [
    { title: "Valentina Reyes VS Alejandra Rosas 🤼", videoId: "pWVUQZCkOj8" },
    { title: "Martín Bazan VS Cristian Preciado 🔥", videoId: "NKmt2T7-7pc" },
    { title: "Josafat González VS Cristian Preciado 🔥", videoId: "I-vn2lBiidQ" },
    { title: "Final Absoluto Intermedios 🔥", videoId: "DqH8OIrgAbQ" },
    { title: "Final Absoluto Femenil 🔥", videoId: "Q1R6eLEGf6g" },
    { title: "Final Absoluto Avanzado 🔥", videoId: "ianXAmnUQ0s" },
  ];

  return (
    <Box sx={{ animation: `${fadeInUp} 1s ease-in-out` }}>
      <Navbar />

      <Box sx={{ padding: "3rem 2rem" }}>
        {/* Título principal */}
        <Typography
          variant="h3"
          sx={{
            textAlign: "center",
            mb: 4,
            fontFamily: "'Bebas Neue', sans-serif",
            fontWeight: "bold",
            fontSize: "3rem",
            color: "#FF5722",
            animation: `${fadeInUp} 1s ease-in-out`,
          }}
        >
          Aztlan 2024 - Videos
        </Typography>

        {/* Texto descriptivo */}
        <Typography
          variant="body1"
          sx={{
            textAlign: "center",
            mb: 5,
            fontFamily: "'Montserrat', sans-serif",
            fontSize: "1.2rem",
            color: "#333",
            fontStyle: "italic",
            lineHeight: 1.7,
          }}
        >
          Estos son algunos de nuestros combates de la última edición. Revive los mejores momentos y visita nuestro canal para más contenido.
        </Typography>

        {/* Botón canal de YouTube */}
        <Box sx={{ textAlign: "center", mb: 5 }}>
          <Button
            variant="contained"
            sx={{
              backgroundColor: "#FF5722",
              color: "#fff",
              fontFamily: "'Montserrat', sans-serif",
              fontWeight: "bold",
              fontSize: "1rem",
              px: 5,
              py: 1.5,
              borderRadius: "1rem",
              boxShadow: "0 6px 20px rgba(0,0,0,0.18)",
              transition: "all 0.3s ease",
              "&:hover": {
                backgroundColor: "#e64a19",
                boxShadow: "0 10px 25px rgba(0,0,0,0.25)",
                transform: "translateY(-3px)",
              },
            }}
            href="https://www.youtube.com/@AztlanBjj"
            target="_blank"
            rel="noopener noreferrer"
          >
            Canal de YouTube
          </Button>
        </Box>

        {/* Grid de videos */}
        <Grid container spacing={4} justifyContent="center">
          {videos.map((video, index) => {
            const videoThumbnailUrl = `https://img.youtube.com/vi/${video.videoId}/hqdefault.jpg`;

            return (
              <Grid
                item
                xs={12}
                sm={6}
                md={4}
                key={index}
                sx={{ animation: `${fadeInUp} 0.8s ease-in-out`, animationDelay: `${index * 0.15}s`, animationFillMode: "both" }}
              >
                <Box
                  sx={{
                    textAlign: "center",
                    borderRadius: "1rem",
                    overflow: "hidden",
                    backgroundColor: "#F5F5F5",
                    boxShadow: "0 6px 20px rgba(0,0,0,0.1)",
                    transition: "all 0.3s ease",
                    "&:hover": {
                      animation: `${hoverLift} 0.6s ease-in-out`,
                      boxShadow: "0 12px 28px rgba(0,0,0,0.2)",
                      transform: "scale(1.03)",
                    },
                  }}
                >
                  <a
                    href={`https://www.youtube.com/watch?v=${video.videoId}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ textDecoration: "none" }}
                  >
                    <img
                      src={videoThumbnailUrl}
                      alt={video.title}
                      style={{
                        width: "100%",
                        height: "auto",
                        borderBottom: "3px solid #FF5722",
                      }}
                    />
                    <Typography
                      variant="h6"
                      sx={{
                        padding: "0.75rem",
                        fontFamily: "'Bebas Neue', sans-serif",
                        color: "#333",
                        fontSize: "1.25rem",
                      }}
                    >
                      {video.title}
                    </Typography>
                  </a>
                </Box>
              </Grid>
            );
          })}
        </Grid>
      </Box>

      <Footer />
    </Box>
  );
};

export default Aztlan2024;
