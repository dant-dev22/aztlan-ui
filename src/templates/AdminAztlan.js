import React, { useState, useEffect } from 'react';
import { Container, CircularProgress, Button, TextField, Box, Typography, Dialog, DialogContent, DialogActions } from '@mui/material';
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

  useEffect(() => {
    if (isAuthenticated) {
      fetchParticipants(API_URL, setLoading, setParticipants, setFilteredParticipants);
    }
  }, [isAuthenticated]);

  const handleLogin = () => {
    const validUsername = "admin";
    const validPassword = "JcA-Dh7";

    if (credentials.username === validUsername && credentials.password === validPassword) {
      setIsAuthenticated(true);
      sessionStorage.setItem("isAuthenticated", "true"); // Guardar estado en sessionStorage
      setError("");
    } else {
      setError("Usuario o contraseña incorrectos.");
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    sessionStorage.removeItem("isAuthenticated"); // Eliminar estado de sessionStorage
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
          
          <Button
            variant="contained"
            onClick={() => handleDownloadCSV(filteredParticipants, setLoading, generateCSV, downloadCSV)}
            sx={{
              backgroundColor: "#FF5722"
            }}
            disabled={loading}
          >
            {loading ? <CircularProgress size={24} /> : "Descargar CSV"}
          </Button>
          
          {loading ? (
            <CircularProgress />
          ) : (
            <ParticipantsTable
              participants={filteredParticipants}
              page={page}
              rowsPerPage={rowsPerPage}
              downloadCSV={() => handleDownloadCSV(filteredParticipants, setLoading, generateCSV, downloadCSV)}
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
