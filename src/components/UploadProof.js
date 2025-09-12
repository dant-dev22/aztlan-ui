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
  const [preview, setPreview] = useState(null); // Estado para la vista previa de la imagen
  const [fileSize, setFileSize] = useState(null); // Estado para el tamaño de la imagen

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
        setPreview(null); // Limpiar vista previa
        setFileSize(null); // Limpiar tamaño
      } else if (file.size > maxSize) {
        setFileError("El archivo no puede ser mayor a 6MB.");
        e.target.value = ""; // Reseteamos el input
        setPreview(null); // Limpiar vista previa
        setFileSize(null); // Limpiar tamaño
      } else {
        setFileError(""); // Si todo está bien, limpiamos el error
        setPreview(URL.createObjectURL(file)); // Crear URL para la vista previa
        setFileSize((file.size / 1024 / 1024).toFixed(2)); // Calcular tamaño en MB
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage("");
    setFileError("");

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
      const API_URL = "https://vjfpbq4jbiz5uyarfu7z7ahlhi0xbhmi.lambda-url.us-east-1.on.aws";

      await axios.post(
        `${API_URL}/participants/${participantId}/payment-proof`,
        data,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      setIsSubmitted(true);
    } catch (error) {
      console.error("soy el error", error.response);
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
              No recuerdas tu aztlan ID? Revisa en tu bandeja de entrada/spam un correo con el titulo "Registro Aztlan Grappling" contáctanos al correo torneoaztlangrappling@gmail.com.
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

          {preview && (
            <Box
              sx={{
                marginTop: "1rem",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <img
                src={preview}
                alt="Vista previa"
                style={{
                  maxWidth: "100%",
                  maxHeight: "200px",
                  marginBottom: "0.5rem",
                  borderRadius: "8px",
                  border: "1px solid #ccc",
                }}
              />
              <Typography variant="body2" sx={{ color: "#555" }}>
                Tamaño del archivo: {fileSize} MB
              </Typography>
            </Box>
          )}

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
              sx={{ backgroundColor: "#2196F3" }}
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
