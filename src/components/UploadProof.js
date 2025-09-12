import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Button,
  Container,
  Typography,
  TextField,
  Box,
  Alert,
  Card,
  CardContent,
} from "@mui/material";
import UploadFileIcon from "@mui/icons-material/UploadFile";

const UploadProof = ({ onBack }) => {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [fileError, setFileError] = useState("");
  const [isVisible, setIsVisible] = useState(false);
  const [preview, setPreview] = useState(null);
  const [fileSize, setFileSize] = useState(null);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const validFormats = ["image/jpeg", "image/jpg"];
      const maxSize = 6 * 1024 * 1024;

      if (!validFormats.includes(file.type)) {
        setFileError("El archivo debe ser en formato JPG o JPEG.");
        e.target.value = "";
        setPreview(null);
        setFileSize(null);
      } else if (file.size > maxSize) {
        setFileError("El archivo no puede ser mayor a 6MB.");
        e.target.value = "";
        setPreview(null);
        setFileSize(null);
      } else {
        setFileError("");
        setPreview(URL.createObjectURL(file));
        setFileSize((file.size / 1024 / 1024).toFixed(2));
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
        { headers: { "Content-Type": "multipart/form-data" } }
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
    <Container maxWidth="sm" sx={{ mt: 4 }}>
      <Card
        sx={{
          borderRadius: 3,
          boxShadow: 4,
          opacity: isVisible ? 1 : 0,
          transition: "opacity 0.5s ease-in",
          backgroundColor: "rgba(245, 245, 245, 0.8)",
        }}
      >
        <CardContent sx={{ p: 4, textAlign: "center" }}>
          {isSubmitted ? (
            <Typography variant="h6" sx={{ color: "green", fontWeight: "bold" }}>
              ✅ Tu comprobante ha sido enviado
            </Typography>
          ) : (
            <form onSubmit={handleSubmit}>
              <h1
                style={{
                  marginBottom: "1rem",
                  fontWeight: "bold",
                  fontSize: "2rem",
                  fontFamily: "'Bebas Neue', sans-serif",
                  textAlign: "center",
                }}
              >
               Estás a un paso de terminar tu registro 
              </h1>

              <Box sx={{ mb: 3 }}>
                <TextField
                  fullWidth
                  label="Aztlan ID"
                  name="id"
                  variant="outlined"
                  required
                  sx={{
                    backgroundColor: "white",
                    borderRadius: 2,
                    fontFamily: "'Montserrat', sans-serif",
                    fontStyle: "extra light",
                    fontSize: "1.2rem",  
                  }}
                />
              </Box>
              <Typography
                variant="body1"
                sx={{
                  mb: 2,
                  color: "#333",         // un poco más oscuro
                  lineHeight: 1.7,
                  fontFamily: "'Montserrat', sans-serif",
                  fontStyle: "light",
                  fontSize: "1.2rem",      // más grande que body2
                }}
              >
                El comprobante debe ser una imagen en formato <b>JPG o JPEG</b>,
                y no mayor a <b>6MB</b>.
                <br />
                <br />
                ¿No recuerdas tu Aztlan ID? Revisa tu correo (inbox/spam) con el
                asunto <i>"Registro Aztlan Grappling"</i> o escríbenos a{" "}
                <b>torneoaztlangrappling@gmail.com</b>.
              </Typography>


              <Box sx={{ mb: 2 }}>
                <Button
                  variant="outlined"
                  component="label"
                  fullWidth
                  startIcon={<UploadFileIcon />}
                  sx={{
                    py: 1.5,
                    border: "2px dashed #888",
                    borderRadius: 2,
                    fontFamily: "'Montserrat', sans-serif",
                    fontStyle: "italic",
                    fontSize: "1.3rem",
                    backgroundColor: "white",
                    fontWeight: "bold",
                    color: "#333",
                    "&:hover": {
                      backgroundColor: "#FFCC80",
                      borderColor: "#FF9800",
                    },
                  }}
                >
                  Subir comprobante de pago
                  <input
                    type="file"
                    id="proof"
                    name="proof"
                    accept=".jpg,.jpeg"
                    hidden
                    required
                    onChange={handleFileChange}
                  />
                </Button>
                {fileError && (
                  <Alert severity="error" sx={{ mt: 2 }}>
                    {fileError}
                  </Alert>
                )}
              </Box>

              {preview && (
                <Box
                  sx={{
                    mt: 2,
                    p: 2,
                    borderRadius: 2,
                    boxShadow: 2,
                    backgroundColor: "white",
                  }}
                >
                  <img
                    src={preview}
                    alt="Vista previa"
                    style={{
                      maxWidth: "100%",
                      maxHeight: "200px",
                      borderRadius: "8px",
                      marginBottom: "0.5rem",
                    }}
                  />
                  <Typography variant="body2" sx={{ color: "#666" }}>
                    Tamaño del archivo: {fileSize} MB
                  </Typography>
                </Box>
              )}

              {errorMessage && (
                <Alert severity="error" sx={{ mt: 2 }}>
                  {errorMessage}
                </Alert>
              )}

              <Box sx={{ display: "flex", justifyContent: "center", gap: 2, mt: 3 }}>
                <Button
                  type="submit"
                  variant="contained"
                  sx={{
                    backgroundColor: "#FF5722",
                    px: 3,
                    fontFamily: "'Montserrat', sans-serif",
                    fontStyle: "light",
                    fontSize: "1.0rem",  
                    "&:hover": { backgroundColor: "#E64A19" },
                  }}
                >
                  Enviar
                </Button>
                <Button
                  type="button"
                  variant="contained"
                  sx={{
                    backgroundColor: "#2196F3",
                    px: 3,
                    fontFamily: "'Montserrat', sans-serif",
                    fontStyle: "light",
                    fontSize: "1.0rem",  
                    "&:hover": { backgroundColor: "#1976D2" },
                  }}
                  onClick={onBack}
                >
                  Volver
                </Button>
              </Box>
            </form>
          )}
        </CardContent>
      </Card>
    </Container>
  );
};

export default UploadProof;
