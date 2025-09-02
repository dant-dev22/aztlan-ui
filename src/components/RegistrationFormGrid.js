import React from 'react';
import { Grid, TextField, Typography, MenuItem, Select, FormControl, InputLabel } from '@mui/material';

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
          label="Experiencia"
          name="experience"
          type="number"
          value={formData.experience}
          onChange={handleChange}
          error={!!error?.experience}
          helperText={error?.experience}
          variant="outlined"
          sx={inputStyles}
        />
      </Grid>

      <Grid item xs={12}>
        <FormControl fullWidth variant="outlined" sx={inputStyles}>
          <Select
            name="Cinturón"
            value={formData.belt || "Blanco"}
            onChange={handleChange}
            error={!!error?.belt}
          >
            <MenuItem value={"blanco"}>Blanco</MenuItem>
            <MenuItem value={"azul"}>Azul</MenuItem>
            <MenuItem value={"amarillo"}>Amarillo</MenuItem>
          </Select>
        </FormControl>
      </Grid>
    </Grid>
  );
};

export default FormGrid;
