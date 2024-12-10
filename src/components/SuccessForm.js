import React from "react";
import { Typography, Button, Box } from "@mui/material";
import { useNavigate } from "react-router-dom"

const SuccessForm = () => {
  return (
    <Box textAlign="center" mt={4}>
      <Typography variant="h4" color="success.main" gutterBottom>
        ¡Registro realizado con éxito!
      </Typography>
    </Box>
  );
};

export default SuccessForm;