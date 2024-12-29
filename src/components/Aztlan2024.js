import React from 'react';
import { Box, Grid, Typography, Button } from '@mui/material';
import Navbar from './Navbar';
import { keyframes } from "@emotion/react";

const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const Aztlan2024 = () => {
  const videos = [
    {
      title: "Valentina Reyes VS Alejandra Rosas 🤼",
      videoId: "pWVUQZCkOj8", // ID de video de YouTube
    },
    {
      title: "Martín Bazan VS Cristian Preciado 🔥",
      videoId: "NKmt2T7-7pc",
    },
    {
      title: "Josafat González VS Cristian Preciado 🔥",
      videoId: "I-vn2lBiidQ",
    },
    {
      title: "Final Absoluto Intermedios 🔥",
      videoId: "DqH8OIrgAbQ",
    },
    {
      title: "Final Absoluto Femenil 🔥",
      videoId: "Q1R6eLEGf6g",
    },
    {
      title: "Final Absoluto Avanzado 🔥",
      videoId: "ianXAmnUQ0s",
    },
  ];

  return (
    <Box sx={{ animation: `${fadeIn} 1s ease-in-out`}}>
      <Navbar />
      <Box sx={{ padding: '2rem' }}>
        <Typography variant="h4" sx={{ textAlign: 'center', marginBottom: '2rem', animation: `${fadeIn} 1s ease-in-out` }}>
          Aztlan 2024 - Videos
        </Typography>
        <Typography variant="body1" sx={{ textAlign: 'center', marginBottom: '2rem', fontStyle: 'italic' }}>
          Estos son algunos de nuestros combates de la última edición. Revive los mejores momentos y visita nuestro canal para más contenido.
        </Typography>
        <Box sx={{ textAlign: 'center', marginBottom: '2rem' }}>
          <Button
            variant="contained"
            sx={{
              backgroundColor: '#FF5722', // Color de fondo personalizado
              '&:hover': {
                backgroundColor: '#e64a19', // Color de fondo al pasar el ratón
              },
            }}
            href="https://www.youtube.com/@AztlanBjj"
            target="_blank"
            rel="noopener noreferrer"
          >
            Canal de YouTube
          </Button>
        </Box>
        <Grid container spacing={2} justifyContent="center">
          {videos.map((video, index) => {
            const videoThumbnailUrl = `https://img.youtube.com/vi/${video.videoId}/hqdefault.jpg`; // URL de la miniatura

            return (
              <Grid item xs={12} sm={6} md={4} key={index} sx={{ animation: `${fadeIn} 1s ease-in-out`}}>
                <Box
                 sx={{
                    textAlign: 'center',
                    borderRadius: '8px',
                    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
                    overflow: 'hidden',
                    transition: 'transform 0.3s ease, box-shadow 0.3s ease', // Transición suave
                    '&:hover': {
                      transform: 'scale(1.05)', // Efecto de zoom al hacer hover
                      boxShadow: '0 8px 16px rgba(0, 0, 0, 0.2)', // Más sombra en hover
                    },
                  }} 
                >
                  <a href={`https://www.youtube.com/watch?v=${video.videoId}`} target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none' }}>
                    <img
                      src={videoThumbnailUrl}
                      alt={video.title}
                      style={{
                        width: '100%',
                        height: 'auto',
                        borderBottom: '1px solid #ccc',
                      }}
                    />
                    <Typography variant="h6" sx={{ padding: '0.5rem' }}>
                      {video.title}
                    </Typography>
                  </a>
                </Box>
              </Grid>
            );
          })}
        </Grid>
      </Box>
    </Box>
  );
};

export default Aztlan2024;
