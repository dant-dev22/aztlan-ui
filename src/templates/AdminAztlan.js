import React, { useState, useEffect } from 'react';
import {
  Container,
  CircularProgress,
  Button,
  TextField,
  Box,
  Typography,
  Dialog,
  DialogContent,
  DialogActions,
  Select,
  MenuItem,
} from '@mui/material';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown'; // Ícono para el dropdown
import ParticipantsTable from '../components/ParticipantsTable';
import { generateCSV, downloadCSV } from './csvUtils';
import { fetchParticipants, handleSearchChange, handleDownloadCSV } from '../utils/participantsUtils';

const API_URL = "https://vjfpbq4jbiz5uyarfu7z7ahlhi0xbhmi.lambda-url.us-east-1.on.aws";

function AdminAztlan() {
  const [participants, setParticipants] = useState([]);
  const [filteredParticipants, setFilteredParticipants] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(
    Boolean(sessionStorage.getItem("isAuthenticated"))
  );
  const [credentials, setCredentials] = useState({ username: "", password: "" });
  const [error, setError] = useState("");
  const [selectedFilter, setSelectedFilter] = useState(""); // Estado para el filtro seleccionado

  useEffect(() => {
    if (isAuthenticated) {
      fetchParticipants(API_URL, setLoading, setParticipants, setFilteredParticipants);
    }
  }, [isAuthenticated]);

  useEffect(() => {
    handleSearchChange(searchQuery, participants, setFilteredParticipants);
  }, [searchQuery, participants]);

  const handleLogin = () => {
    const validUsername = "admin";
    const validPassword = "JcA-Dh7";

    if (credentials.username === validUsername && credentials.password === validPassword) {
      setIsAuthenticated(true);
      sessionStorage.setItem("isAuthenticated", "true");
      setError("");
    } else {
      setError("Usuario o contraseña incorrectos.");
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    sessionStorage.removeItem("isAuthenticated");
  };

  const handleDownloadWithFilter = () => {
    if (!selectedFilter) {
      alert("Por favor, selecciona un filtro antes de descargar.");
      return;
    }
    handleDownloadCSV(filteredParticipants, setLoading, generateCSV, downloadCSV, selectedFilter);
  };

  return (
    <Container>
      {!isAuthenticated ? (
        <Dialog open={!isAuthenticated}>
          <DialogContent>
            <Typography variant="h6" gutterBottom>
              Iniciar sesión
            </Typography>
            <TextField
              label="Usuario"
              fullWidth
              variant="outlined"
              margin="dense"
              value={credentials.username}
              onChange={(e) =>
                setCredentials({ ...credentials, username: e.target.value })
              }
            />
            <TextField
              label="Contraseña"
              type="password"
              fullWidth
              variant="outlined"
              margin="dense"
              value={credentials.password}
              onChange={(e) =>
                setCredentials({ ...credentials, password: e.target.value })
              }
            />
            {error && (
              <Typography color="error" sx={{ marginTop: "0.5rem" }}>
                {error}
              </Typography>
            )}
          </DialogContent>
          <DialogActions>
            <Button
              onClick={handleLogin}
              variant="contained"
              sx={{
                backgroundColor: "#FF5722"
              }}>
              Ingresar
            </Button>
          </DialogActions>
        </Dialog>
      ) : (
        <>
          <Button
            variant="contained"
            color="secondary"
            onClick={handleLogout}
            sx={{ marginBottom: "1rem" }}
          >
            Cerrar sesión
          </Button>
          <TextField
            label="Buscar por nombre, academia o años entrenando"
            variant="outlined"
            fullWidth
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            sx={{ marginBottom: '1rem' }}
            placeholder="Busca por nombre, academia o años entrenando"
          />

          {/* Dropdown y botón en la misma fila */}
          <Box sx={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
            {/* Dropdown compacto */}
            <Select
              value={selectedFilter}
              onChange={(e) => setSelectedFilter(e.target.value)}
              displayEmpty
              sx={{
                width: '200px', // Ancho reducido
                backgroundColor: '#f5f5f5', // Fondo gris claro
                borderRadius: '4px', // Bordes redondeados
                '& .MuiSelect-select': {
                  padding: '10px 32px 10px 12px', // Padding ajustado
                },
              }}
              IconComponent={ArrowDropDownIcon} // Ícono personalizado
            >
              <MenuItem value={"blanca"} disabled >Selecciona un filtro</MenuItem>
              <MenuItem value={"blanca"}>Blanca</MenuItem>
              <MenuItem value={"azul"}>Azul</MenuItem>
              <MenuItem value={"morada"}>Morada</MenuItem>
              <MenuItem value={"cafe"}>Café</MenuItem>
              <MenuItem value={"negra"}>Negra</MenuItem>
              <MenuItem value={"gris"}>Gris</MenuItem>
              <MenuItem value={"amarilla"}>Amarilla</MenuItem>
              <MenuItem value={"naranja"}>Naranja</MenuItem>
              <MenuItem value={"verde"}>Verde</MenuItem> 
              <MenuItem value={"todos"}>Todos</MenuItem> 

            </Select>

            {/* Botón de descarga */}
            <Button
              variant="contained"
              onClick={handleDownloadWithFilter}
              sx={{
                backgroundColor: "#FF5722",
                padding: '10px 20px', // Padding ajustado
              }}
              disabled={loading || !selectedFilter}
            >
              {loading ? <CircularProgress size={24} /> : "Generar Lista"}
            </Button>
          </Box>

          {loading ? (
            <CircularProgress />
          ) : (
            <ParticipantsTable
              participants={filteredParticipants}
              page={page}
              rowsPerPage={rowsPerPage}
              downloadCSV={() => handleDownloadCSV(filteredParticipants, setLoading, generateCSV, downloadCSV, selectedFilter)}
              handleChangePage={(newPage) => setPage(newPage)}
              handleChangeRowsPerPage={(event) => {
                setRowsPerPage(parseInt(event.target.value, 10));
                setPage(0);
              }}
              setParticipants={setParticipants}
            />
          )}
        </>
      )}
    </Container>
  );
}

export default AdminAztlan;