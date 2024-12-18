import React from 'react';
import { Grid, TextField, Typography } from '@mui/material';

const FormGrid = ({ formData, error, handleChange, inputStyles }) => {
  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <TextField
          fullWidth
          label="Nombre Completo"
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
          label="Peso(kg)"
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
          label="Correo Electrónico"
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          error={!!error?.email}
          helperText={error?.email}
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
        <Typography variant="body2" sx={{ display: 'block', marginTop: 0.5, color: 'text.secondary', textAlign: 'left' }}>
          - Principiante (0-2 año(s)) <br />
          - Intermedio (2-4 años) <br />
          - Avanzado (más de 4 años) <br />
          *Si tienes menos de un año entrenando, ingresa '1'
        </Typography>
        <TextField
          fullWidth
          label="Tiempo entrenando"
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
    </Grid>
  );
};

export default FormGrid;
