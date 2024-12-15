import React, { useState, useEffect } from "react";
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
  const [fileError, setFileError] = useState("");
  const [isVisible, setIsVisible] = useState(false); // Nuevo estado para el fade-in

  useEffect(() => {
    setIsVisible(true); // Activar fade-in cuando el componente se monta
  }, []);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const validFormats = ["image/jpeg", "image/jpg"];
      const maxSize = 6 * 1024 * 1024; // 6MB

      if (!validFormats.includes(file.type)) {
        setFileError("El archivo debe ser en formato JPG o JPEG.");
        e.target.value = ""; // Reseteamos el input
      } else if (file.size > maxSize) {
        setFileError("El archivo no puede ser mayor a 6MB.");
        e.target.value = ""; // Reseteamos el input
      } else {
        setFileError(""); // Si todo está bien, limpiamos el error
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage("");
    setFileError(""); // Limpiar cualquier error previo en archivo

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
    <Container
      maxWidth="sm"
      sx={{
        padding: "2rem",
        textAlign: "center",
        backgroundColor: "#D6D6D6",
        opacity: isVisible ? 1 : 0, // Aparece lentamente
        transition: "opacity 1s ease-in", // Transición de fade-in
      }}
    >
      {isSubmitted ? (
        <Typography variant="h6" sx={{ color: "green" }}>
          Tu comprobante ha sido enviado
        </Typography>
      ) : (
        <form onSubmit={handleSubmit}>
          <Box sx={{ marginBottom: "1rem" }}>
            <TextField
              fullWidth
              label="Aztlan ID"
              name="id"
              variant="outlined"
              required
              sx={{
                backgroundColor: "white",
                borderColor: "#595959",
              }}
            />
          </Box>

          <Box sx={{ marginBottom: "1rem", color: "black", fontSize: "1.0rem" }}>
            <Typography>
              El comprobante debe ser una imagen en formato JPG o JPEG, y no mayor a 6MB.
            </Typography>
            <Typography>
              No recuerdas tu aztlan ID? contáctanos al correo ejemplo@gmail.com.
            </Typography>
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
                backgroundColor: "#FFE0B2",
                color: "#555",
                '&:hover': {
                  backgroundColor: "#FFCC80",
                },
              }}
            >
              Subir comprobante
              <input
                type="file"
                id="proof"
                name="proof"
                accept=".jpg,.jpeg"
                hidden
                required
                onChange={handleFileChange} // Añadir validación del archivo
              />
            </Button>
            {fileError && (
              <Alert severity="error" sx={{ marginTop: "1rem" }}>
                {fileError}
              </Alert>
            )}
          </Box>

          {errorMessage && (
            <Alert severity="error" sx={{ marginBottom: "1rem" }}>
              {errorMessage}
            </Alert>
          )}

          <Box sx={{ display: "flex", justifyContent: "center", gap: "1rem" }}>
            <Button type="submit" variant="contained" sx={{ backgroundColor: "#FF5722" }}>
              Enviar
            </Button>
            <Button
              type="button"
              variant="contained"
              sx={{ backgroundColor: "#FFC107" }}
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