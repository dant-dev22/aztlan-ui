// ./components/Footer.js
import React from "react";
import { Box, IconButton, Link } from "@mui/material";
import InstagramIcon from "@mui/icons-material/Instagram";
import FacebookIcon from "@mui/icons-material/Facebook";
import YouTubeIcon from "@mui/icons-material/YouTube";

const Footer = () => {
  return (
    <Box
      sx={{
        bottom: 0,
        left: 0,
        width: "100%",
        backgroundColor: "gray", // Fondo transparente
        color: "white", // Texto blanco para contraste
        padding: "1rem 0",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 1000,
      }}
    >
      <Link
        href="https://www.instagram.com/aztlan_bjj"
        target="_blank"
        sx={{ margin: "0 1rem" }}
      >
        <IconButton
          sx={{
            color: "white",
            transition: "all 0.3s ease",
            "&:hover": {
              color: "#E1306C", // rosa de Instagram
              filter: "drop-shadow(0 0 8px #E1306C)",
              transform: "scale(1.2)",
            },
          }}
        >
          <InstagramIcon />
        </IconButton>
      </Link>

      <Link
        href="https://www.facebook.com/profile.php?id=100090876214567"
        target="_blank"
        sx={{ margin: "0 1rem" }}
      >
        <IconButton
          sx={{
            color: "white",
            transition: "all 0.3s ease",
            "&:hover": {
              color: "#1877F2", // azul de Facebook
              filter: "drop-shadow(0 0 8px #1877F2)",
              transform: "scale(1.2)",
            },
          }}
        >
          <FacebookIcon />
        </IconButton>
      </Link>

      <Link
        href="https://www.youtube.com/@AztlanBjj"
        target="_blank"
        sx={{ margin: "0 1rem" }}
      >
        <IconButton
          sx={{
            color: "white",
            transition: "all 0.3s ease",
            "&:hover": {
              color: "#FF0000", // rojo de YouTube
              filter: "drop-shadow(0 0 8px #FF0000)",
              transform: "scale(1.2)",
            },
          }}
        >
          <YouTubeIcon />
        </IconButton>
      </Link>
    </Box>
  );
};

export default Footer;