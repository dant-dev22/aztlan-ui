import React, { useState } from "react";
import Form from "../components/Form";
import UploadProof from "../components/UploadProof";
import logo from "../assets/img/aztlannobg.png"; 
import { Box, Button, Typography } from "@mui/material";
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

const Home = () => {
  const [view, setView] = useState("menu");

  const handleViewChange = (newView) => {
    setView(newView);
  };

  return (
    <Box
      sx={{
        padding: "2rem",
        fontFamily: "Arial, sans-serif",
        transition: "opacity 0.5s ease-in-out",
        textAlign: "center",
      }}
    >
      <Box
        sx={{
          textAlign: "center",
          width: "100%",
          maxWidth: "20rem",
          margin: "0 auto",
        }}
      >
        <img
          src={logo}
          alt="Aztlan Grappling Logo"
          style={{
            width: "100%",
            height: "auto",
          }}
        />
      </Box>

      <Typography variant="h4" sx={{ color: "#1C1C1C", margin: "1rem 0", animation: `${fadeIn} 1s ease-in-out`,}}>
        Aztlan Grappling 2025
      </Typography>

      {view === "menu" && (
        <Box>
          <Button
            variant="contained"
            sx={{
              padding: "1rem 2rem",
              margin: "1rem",
              backgroundColor: "#FF5722",
              color: "white",
              borderRadius: "4px",
            }}
            onClick={() => handleViewChange("register")}
          >
            Registrarse
          </Button>

        </Box>
      )}

      {view === "register" && <Form onBack={() => handleViewChange("menu")} />}
      {view === "uploadProof" && <UploadProof onBack={() => handleViewChange("menu")} />}
    </Box>
  );
};

export default Home;
