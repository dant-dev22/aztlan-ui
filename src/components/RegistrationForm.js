import React from 'react';
import { Box, Typography, Grid, TextField, Button, FormControl, InputLabel, Select, MenuItem, FormHelperText } from '@mui/material';
const inputStyles = {
    backgroundColor: "white", // Fondo blanco
    borderColor: "#FF6F00", // Contorno naranja
    "& .MuiInputLabel-root": { color: "#FF6F00" }, // Color de la etiqueta en naranja
    "& .MuiOutlinedInput-root": {
      "& fieldset": {
        borderColor: "#FF6F00", // Color de borde del campo
      },
      "&:hover fieldset": {
        borderColor: "#FF6F00", // Color de borde al hacer hover
      },
    },
};

const RegistrationForm = ({ formData, handleChange, error, success, handleSubmit, onBack }) => {
  console.log(success,"soy success")
  console.log(formData,"soy formdata")
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
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Nombre"
            name="name"
            value={formData.name}
            onChange={handleChange}
            error={!!error?.name}
            helperText={error?.name}
            variant="outlined"
            sx={inputStyles}
          />
        </Grid>
        <Grid item xs={12}>
            <TextField
              fullWidth
              label="Peso"
              name="weight"
              type="number"
              value={formData.weight}
              onChange={handleChange}
              error={!!error?.weight}
              helperText={error?.weight}
              variant="outlined"
              sx={inputStyles}
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
              error={!!error?.academy}
              helperText={error?.academy}
              variant="outlined"
              sx={inputStyles}
            />
          </Grid>
  
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Estatura"
              name="height"
              type="number"
              value={formData.height}
              onChange={handleChange}
              error={!!error?.height}
              helperText={error?.height}
              variant="outlined"
              sx={inputStyles}
            />
        </Grid>

        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Fecha de Nacimiento"
            name="birth_date"
            type="date"
            value={formData.birth_date}
            onChange={handleChange}
            error={!!error?.birth_date}
            helperText={error?.birth_date}
            InputLabelProps={{ shrink: true }}
            sx={inputStyles}
          />
        </Grid>

        <Grid item xs={12}>
            <TextField
              fullWidth
              label="Categoria(Años entrenando)"
              name="category"
              type="number"
              value={formData.category}
              onChange={handleChange}
              error={!!error?.category}
              helperText={error?.category}
              variant="outlined"
              sx={inputStyles}
            />
        </Grid>

        <Grid item xs={12}>
          <Box sx={{ display: "flex", justifyContent: "center", gap: "1rem" }}>
            <Button type="submit" variant="contained" color="primary">
              Enviar
            </Button>
            <Button type="button" onClick={onBack} variant="contained" color="secondary">
              Volver
            </Button>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default RegistrationForm;
