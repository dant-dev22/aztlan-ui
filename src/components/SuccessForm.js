import React from "react";
import { Typography, Box } from "@mui/material";

const SuccessForm = ({ aztlanID }) => {
  console.log("soy el aztlanID", aztlanID)
  return (
    <Box textAlign="center" mt={4}>
      <Typography variant="h4" color="success.main" gutterBottom>
        ¡Felicidades!
      </Typography>
      <Typography variant="body1" color="textPrimary" gutterBottom>
        El primer paso de tu registro ha sido realizado con éxito. Recuerda completar tu registro subiendo tu comprobante de pago.
      </Typography>
      <Typography variant="body2" color="secondary">
        Este es tu ID, consérvalo: <strong style={{ fontSize: '1.5em' }}>{aztlanID}</strong>
      </Typography>
    </Box>
  );
};

export default SuccessForm;