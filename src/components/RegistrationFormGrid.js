import React from 'react';
import { Grid, TextField, Typography, MenuItem, Select, FormControl, InputLabel } from '@mui/material';

const FormGrid = ({ formData, error, handleChange, inputStyles }) => {
  // Helper para actualizar experience en meses
  const handleExperienceChange = (type, value) => {
    const years = parseInt(type === "years" ? value : formData.experience_years || 0, 10);
    const months = parseInt(type === "months" ? value : formData.experience_months || 0, 10);

    // Actualiza experience_total (meses) en formData
    handleChange({
      target: { name: "experience", value: years * 12 + months }
    });

    // Actualiza los campos de UI (años/meses)
    handleChange({
      target: { name: type === "years" ? "experience_years" : "experience_months", value }
    });
  };

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

      {/* Experiencia */}
      <Grid item xs={12}>
        <Typography variant="subtitle1" gutterBottom sx={{ color: 'black' }}>
          ¿Cuánto llevas entrenando?
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <TextField
              fullWidth
              label="Años"
              name="experience_years"
              type="number"
              inputProps={{ min: 0 }}
              value={formData.experience_years || ""}
              onChange={(e) => {
                let val = parseInt(e.target.value || 0, 10);
                if (val < 0) val = 0;
                handleExperienceChange("years", val);
              }}
              variant="outlined"
              sx={inputStyles}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              fullWidth
              label="Meses"
              name="experience_months"
              type="number"
              inputProps={{ min: 0, max: 11 }}
              value={formData.experience_months || ""}
              onChange={(e) => {
                let val = parseInt(e.target.value || 0, 10);
                if (val < 0) val = 0;
                if (val > 11) val = 11;
                handleExperienceChange("months", val);
              }}
              variant="outlined"
              sx={inputStyles}
            />
          </Grid>
        </Grid>
        {error?.experience && (
          <Typography color="error" variant="body2">
            {error.experience}
          </Typography>
        )}
      </Grid>

      <Grid item xs={6}>
        <FormControl fullWidth variant="outlined" sx={inputStyles}>
          <InputLabel>Cinta</InputLabel>
          <Select
            name="belt"
            value={formData.belt}
            onChange={handleChange}
            error={!!error?.belt}
          >
          <MenuItem value={"blanca"}>Blanca</MenuItem>
          <MenuItem value={"azul"}>Azul</MenuItem>
          <MenuItem value={"morada"}>Morada</MenuItem>
          <MenuItem value={"cafe"}>Café</MenuItem>
          <MenuItem value={"negra"}>Negra</MenuItem>
          <MenuItem value={"gris"}>Gris</MenuItem>
          <MenuItem value={"amarilla"}>Amarilla</MenuItem>
          <MenuItem value={"naranja"}>Naranja</MenuItem>
          <MenuItem value={"verde"}>Verde</MenuItem>  
          </Select>
        </FormControl>
      </Grid>
    </Grid>
  );
};

export default FormGrid;
