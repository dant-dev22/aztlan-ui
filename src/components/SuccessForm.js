import React from "react";
import { Typography, Box } from "@mui/material";
import UploadProof from "./UploadProof"; // Asegúrate de importar el componente UploadProof

const SuccessForm = ({ aztlanID, onBack }) => {
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

      {/* Nuevo texto antes de UploadProof */}
      <Typography variant="body1" color="black" gutterBottom mt={4}>
        Completa tu registro subiendo tu comprobante de pago.
      </Typography>

      {/* Aquí se renderiza el componente UploadProof */}
      <UploadProof onBack={onBack} />
    </Box>
  );
};

export default SuccessForm;