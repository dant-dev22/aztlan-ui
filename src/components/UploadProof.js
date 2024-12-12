import React, { useState } from "react";
import axios from "axios";
import {
  Button,
  Container,
  Typography,
  TextField,
  Box,
  Alert,
} from "@mui/material";

const UploadProof = ({ onBack }) => {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage("");

    const formData = new FormData(e.target);
    const participantId = formData.get("id");
    const proofFile = formData.get("proof");

    if (!participantId || !proofFile) {
      setErrorMessage("Todos los campos son obligatorios.");
      return;
    }

    try {
      const data = new FormData();
      data.append("file", proofFile);

      await axios.post(
        `http://127.0.0.1:8000/participants/${participantId}/upload`,
        data,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      setIsSubmitted(true);
    } catch (error) {
      console.error(error.response);
      setErrorMessage(
        error.response?.data?.detail || "Ocurrió un error al subir el comprobante."
      );
    }
  };

  return (
    <Container maxWidth="sm" sx={{ padding: "2rem", textAlign: "center", backgroundColor: "#a1a1a0"}}>
      {isSubmitted ? (
        <Typography variant="h6" sx={{ color: "green" }}>
          Tu comprobante ha sido enviado
        </Typography>
      ) : (
        <form onSubmit={handleSubmit}>
          <Box sx={{ marginBottom: "1rem" }}>
          <TextField
            fullWidth
            label="ID de Registro"
            name="id"
            variant="outlined"
            required
            sx={{
              borderColor: "#595959",
              '&:hover .MuiOutlinedInput-root': {
                backgroundColor: "#b5b5b4",
              },
            }}
          />
          </Box>
          <Box sx={{ marginBottom: "1rem" }}>
            <Button
              variant="outlined"
              component="label"
              fullWidth
              sx={{
                padding: "0.75rem",
                border: "2px dashed #ccc",
                borderRadius: "8px",
                textTransform: "none",
                fontSize: "1rem",
                color: "#555",
                '&:hover': {
                  backgroundColor: "#b5b5b4",
                },
              }}
            >
              Subir Comprobante
              <input
                type="file"
                id="proof"
                name="proof"
                accept=".jpg,.jpeg,.png"
                hidden
                required
              />
            </Button>
          </Box>
          {errorMessage && (
            <Alert severity="error" sx={{ marginBottom: "1rem" }}>
              {errorMessage}
            </Alert>
          )}
          <Box sx={{ display: "flex", justifyContent: "center", gap: "1rem" }}>
            <Button type="submit" variant="contained" sx={{ backgroundColor: "#FF5722"}}>
              Enviar
            </Button>
            <Button
              type="button"
              variant="contained"
              color="secondary"
              onClick={onBack}
            >
              Volver
            </Button>
          </Box>
        </form>
      )}
    </Container>
  );
};

export default UploadProof;