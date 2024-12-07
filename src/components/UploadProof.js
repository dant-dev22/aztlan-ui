import React, { useState } from "react";
import axios from "axios"; // Para manejar las solicitudes HTTP

const UploadProof = ({ onBack }) => {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState(""); // Para manejar errores

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage(""); // Resetear el mensaje de error

    // Obtener los datos del formulario
    const formData = new FormData(e.target);
    const participantId = formData.get("id");
    const proofFile = formData.get("proof");
    console.log(proofFile, "soy el prooffile")

    if (!participantId || !proofFile) {
      setErrorMessage("Todos los campos son obligatorios.");
      return;
    }

    try {
      // Crear un FormData para enviar el archivo
      const data = new FormData();
      data.append("file", proofFile);
      console.log(data, "soy la data que se envía")

      // Hacer la solicitud al backend
      await axios.post(
        `http://127.0.0.1:8000/participants/${participantId}/upload`, // Reemplaza con tu URL base si es diferente
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
    <div style={{ padding: "2rem", fontFamily: "Arial, sans-serif", textAlign: "center" }}>
      {isSubmitted ? (
        <p style={{ color: "green", fontSize: "1.2rem" }}>Tu comprobante ha sido enviado</p>
      ) : (
        <form onSubmit={handleSubmit} style={{ display: "inline-block", textAlign: "left" }}>
          <div style={{ marginBottom: "1rem" }}>
            <label htmlFor="id" style={{ display: "block", marginBottom: "0.5rem" }}>
              ID de Registro:
            </label>
            <input
              type="text"
              id="id"
              name="id"
              style={{
                padding: "0.5rem",
                width: "100%",
                border: "1px solid #ccc",
                borderRadius: "4px",
              }}
              required
            />
          </div>
          <div style={{ marginBottom: "1rem" }}>
            <label htmlFor="proof" style={{ display: "block", marginBottom: "0.5rem" }}>
              Subir Comprobante:
            </label>
            <input
              type="file"
              id="proof"
              name="proof"
              style={{ padding: "0.5rem", width: "100%" }}
              accept=".jpg,.jpeg,.png" // Validación de formatos aceptados
              required
            />
          </div>
          {errorMessage && (
            <p style={{ color: "red", fontSize: "0.9rem", marginBottom: "1rem" }}>
              {errorMessage}
            </p>
          )}
          <button
            type="submit"
            style={{
              padding: "0.75rem 1.5rem",
              backgroundColor: "#1976d2",
              color: "white",
              border: "none",
              borderRadius: "4px",
              cursor: "pointer",
            }}
          >
            Enviar
          </button>
          <button
            type="button"
            onClick={onBack}
            style={{
              padding: "0.75rem 1.5rem",
              marginLeft: "1rem",
              backgroundColor: "#f50057",
              color: "white",
              border: "none",
              borderRadius: "4px",
              cursor: "pointer",
            }}
          >
            Volver
          </button>
        </form>
      )}
    </div>
  );
};

export default UploadProof;