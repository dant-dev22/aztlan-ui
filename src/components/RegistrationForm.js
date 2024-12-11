import React from 'react';
import { Box, Typography, Button } from '@mui/material';
import FormFields from './FormFields';
const inputStyles = {
    backgroundColor: "white", // Fondo blanco
    borderColor: "#FF6F00", // Contorno naranja
    "& .MuiInputLabel-root": { color: "#FF6F00" },
    "& .MuiOutlinedInput-root": {
      "& fieldset": {
        borderColor: "#FF6F00",
      },
      "&:hover fieldset": {
        borderColor: "#FF6F00",
      },
    },
};

const RegistrationForm = ({ formData, handleChange, error, handleSubmit, onBack }) => {
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
        boxShadow: 2,
      }}
    >
      <Typography variant="h4" align="center" gutterBottom>
        Registro Aztlan Grappling Feb-2025 
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
        <Button type="submit" variant="contained" color="primary">
          Enviar
        </Button>
        <Button type="button" onClick={onBack} variant="contained" color="secondary">
          Volver
        </Button>
      </Box>
    </Box>
  );
};

export default RegistrationForm;