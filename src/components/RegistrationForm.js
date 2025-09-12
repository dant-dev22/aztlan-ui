import React, { useEffect, useState } from "react";
import { Box, Typography, Button, keyframes } from "@mui/material";
import FormFields from "./FormFields";

// Keyframes del brinco
const bounce = keyframes`
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-0.25rem); } /* 4px aprox */
`;

const inputStyles = {
  backgroundColor: "#F5F5F5",
  color: "red",
  borderRadius: "1rem",
  borderColor: "#4f4f4f",
  "& .MuiInputLabel-root": { color: "#4f4f4f" },
  "& .MuiOutlinedInput-root": {
    "& fieldset": { borderColor: "#595959" },
    "&:hover fieldset": { borderColor: "#595959" },
  },
};

const buttonStyles = {
  backgroundColor: "#2196F3",
};

const RegistrationForm = ({ formData, handleChange, error, handleSubmit, onBack }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isBouncing, setIsBouncing] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  useEffect(() => {
    // Cada 3 segundos activamos el brinco por 3 segundos
    const interval = setInterval(() => {
      setIsBouncing(true);
      const timeout = setTimeout(() => setIsBouncing(false), 3000); // dura 3 segundos
      return () => clearTimeout(timeout);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{
        maxWidth: 500,
        margin: "0 auto",
        padding: 2,
        border: "1px solid #ddd",
        borderRadius: 2,
        backgroundColor: "rgba(128, 128, 128, 0.6)",
        boxShadow: 2,
        opacity: isVisible ? 1 : 0,
        transition: "opacity 0.5s ease-in-out",
      }}
    >
      <Typography
        variant="h6"
        align="center"
        gutterBottom
        sx={{
          color: "white",
          backgroundColor: "black",
          padding: 1,
          borderRadius: 3,
          marginBottom: 1,
          fontWeight: "bold",
          fontSize: "1.6rem",
          fontFamily: "'Bebas Neue', sans-serif",
          display: "inline-block",
        }}
      >
        Registrate y Participa
      </Typography>

      {error && (
        <Typography color="error" variant="body2" align="center" gutterBottom>
          {error}
        </Typography>
      )}

      <FormFields formData={formData} handleChange={handleChange} error={error} inputStyles={inputStyles} />

      <Box sx={{ display: "flex", justifyContent: "center", gap: "1rem", marginTop: 2 }}>
        <Button
          type="submit"
          variant="contained"
          sx={{
            backgroundColor: "#FF5722",
            animation: isBouncing ? `${bounce} 0.6s ease-in-out infinite` : "none",
          }}
        >
          Enviar
        </Button>
        <Button
          type="button"
          onClick={onBack}
          variant="contained"
          sx={{
            ...buttonStyles,
            animation: isBouncing ? `${bounce} 0.6s ease-in-out infinite` : "none",
          }}
        >
          Volver
        </Button>
      </Box>
    </Box>
  );
};

export default RegistrationForm;