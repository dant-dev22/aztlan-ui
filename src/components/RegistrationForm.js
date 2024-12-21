import React, { useEffect, useState } from 'react';
import { Box, Typography, Button } from '@mui/material';
import FormFields from './FormFields';

const inputStyles = {
  backgroundColor: "#F5F5F5", // Fondo blanco
  borderColor: "#4f4f4f", // Contorno naranja
  "& .MuiInputLabel-root": { color: "#4f4f4f" },
  "& .MuiOutlinedInput-root": {
    "& fieldset": {
      borderColor: "#595959",
    },
    "&:hover fieldset": {
      borderColor: "#595959",
    },
  },
};

const buttonStyles = {
  backgroundColor: "#FFC107",
};

const RegistrationForm = ({ formData, handleChange, error, handleSubmit, onBack }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Este efecto hará que el formulario aparezca después de 100ms.
    setIsVisible(true);
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
        backgroundColor: "#D6D6D6",
        boxShadow: 2,
        opacity: isVisible ? 1 : 0,
        transition: "opacity 0.5s ease-in-out",
      }}
    >
      <Typography variant="h6" align="center" gutterBottom>
        Registro Torneo Feb-2025
      </Typography>

      {error && (
        <Typography color="error" variant="body2" align="center" gutterBottom>
          {error}
        </Typography>
      )}

      <FormFields
        formData={formData}
        handleChange={handleChange}
        error={error}
        inputStyles={inputStyles}
      />

      <Box sx={{ display: "flex", justifyContent: "center", gap: "1rem", marginTop: 2 }}>
        <Button type="submit" variant="contained" sx={{ backgroundColor: "#FF5722" }}>
          Enviar
        </Button>
        <Button type="button" onClick={onBack} variant="contained" sx={buttonStyles}>
          Volver
        </Button>
      </Box>
    </Box>
  );
};

export default RegistrationForm;