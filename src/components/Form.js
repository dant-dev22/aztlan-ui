import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { updateField, resetForm } from "../features/formSlice";
import { Box, Button, Grid, TextField, Typography } from "@mui/material";

// Función para manejar el envío del formulario
const Form = () => {
  const dispatch = useDispatch();
  const formData = useSelector((state) => state.form.formData); // Datos del formulario desde Redux

  // Estado para manejo de errores y éxito
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  // Función para manejar los cambios en los campos del formulario
  const handleChange = (e) => {
    const { name, value } = e.target;
    dispatch(updateField({ name, value }));
  };

  // Función para validar el formulario antes de enviarlo
  const validateForm = () => {
    if (!formData.name || !formData.birth_date || !formData.weight || !formData.academy || !formData.height || !formData.category) {
      return false;
    }
    return true;
  };

  // Función para manejar el submit del formulario y enviar los datos a la API
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      setError("Por favor, completa todos los campos.");
      return;
    }

    try {
      // Enviar los datos del formulario a la API
      const response = await fetch("http://localhost:8000/participants/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: formData.name,
          birth_date: formData.birth_date,
          weight: formData.weight,
          academy: formData.academy,
          height: formData.height,
          category: formData.category,
        }), // Enviar los datos del formulario como JSON
      });

      if (response.ok) {
        const data = await response.json();
        console.log("Formulario enviado con éxito:", data); // Ver respuesta
        dispatch(resetForm()); // Reseteamos el formulario después de enviar
        setSuccess(true); // Mostrar mensaje de éxito
        setError(null); // Limpiar el error si hay éxito
      } else {
        setError("Error al enviar los datos, inténtalo de nuevo.");
      }
    } catch (error) {
      setError("Error al enviar los datos, inténtalo de nuevo.");
      console.error("Error al enviar los datos:", error);
    }
  };

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
        Registro para Torneo BJJ
      </Typography>

      {error && (
        <Typography color="error" variant="body2" align="center" gutterBottom>
          {error}
        </Typography>
      )}

      {success && (
        <Typography color="success" variant="body2" align="center" gutterBottom>
          Registro realizado con éxito.
        </Typography>
      )}

      <Grid container spacing={2}>
        {/* Campo de Nombre */}
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Nombre"
            name="name"
            value={formData.name}
            onChange={handleChange}
            variant="outlined"
          />
        </Grid>

        {/* Campo de Fecha de Nacimiento */}
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Fecha de Nacimiento"
            name="birth_date"
            type="date"
            value={formData.birth_date}
            onChange={handleChange}
            InputLabelProps={{ shrink: true }} // Necesario para mostrar el label correctamente en campos de fecha
          />
        </Grid>

        {/* Campo de Peso */}
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Peso"
            name="weight"
            type="number"
            value={formData.weight}
            onChange={handleChange}
            variant="outlined"
          />
        </Grid>

        {/* Campo de Academia */}
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Academia"
            name="academy"
            value={formData.academy}
            onChange={handleChange}
            variant="outlined"
          />
        </Grid>

        {/* Campo de Estatura */}
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Estatura"
            name="height"
            type="number"
            value={formData.height}
            onChange={handleChange}
            variant="outlined"
          />
        </Grid>

        {/* Campo de Categoría (años entrenando) */}
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Categoría (años entrenando)"
            name="category"
            value={formData.category}
            onChange={handleChange}
            variant="outlined"
          />
        </Grid>

        {/* Botón de Enviar */}
        <Grid item xs={12}>
          <Button type="submit" variant="contained" color="primary" fullWidth>
            Enviar
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Form;