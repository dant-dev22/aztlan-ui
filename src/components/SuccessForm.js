import React from "react";
import { Typography, Box } from "@mui/material";

const SuccessForm = ({ aztlanID }) => {
  return (
    <Box textAlign="center" mt={4}>
      <Typography variant="h4" color="success.main" gutterBottom>
        ¡Felicidades!
      </Typography>
      <Typography variant="body1" color="black" gutterBottom>
        El primer paso de tu registro ha sido realizado con éxito. Recuerda completar tu registro subiendo tu comprobante de pago usando tu Aztlan ID.
      </Typography>
      <Typography variant="body2" color="black">
        Este es tu <strong style={{ fontSize: '1.5em' }}>Aztlan ID</strong>, consérvalo: <strong style={{ fontSize: '1.5em' }}>{aztlanID}</strong>
      </Typography>
    </Box>
  );
};

export default SuccessForm;