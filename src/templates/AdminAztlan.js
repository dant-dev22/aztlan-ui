import React, { useState, useEffect } from 'react';
import { Container, CircularProgress, Button, TextField } from '@mui/material';
import ParticipantsTable from '../components/ParticipantsTable';
import { generateCSV, downloadCSV } from './csvUtils';

const API_URL = "https://vjfpbq4jbiz5uyarfu7z7ahlhi0xbhmi.lambda-url.us-east-1.on.aws"; // Nuevo endpoint

function AdminAztlan() {
  const [participants, setParticipants] = useState([]);
  const [filteredParticipants, setFilteredParticipants] = useState([]); // Estado para participantes filtrados
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState(""); // Estado para la búsqueda

  const fetchParticipants = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${API_URL}/participants`);
      if (!response.ok) {
        throw new Error('Error al obtener los participantes');
      }

      const data = await response.json();
      setParticipants(data);
      setFilteredParticipants(data); // Inicialmente mostrar todos los participantes
    } catch (error) {
      console.error('Error al obtener los participantes:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  // Filtrar los participantes según el nombre
  useEffect(() => {
    if (searchQuery === "") {
      setFilteredParticipants(participants); // Si no hay texto de búsqueda, mostrar todos
    } else {
      const filtered = participants.filter(participant =>
        participant.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredParticipants(filtered);
    }
  }, [searchQuery, participants]);

  const handleDownloadCSV = () => {
    setLoading(true);
    try {
      const csvContent = generateCSV(filteredParticipants);
      downloadCSV('participantes.csv', csvContent);
    } catch (error) {
      console.error('Error al generar el archivo CSV:', error);
      alert('Hubo un problema al generar el archivo CSV. Por favor, inténtalo de nuevo.');
    } finally {
      setLoading(false);
    }
  };

  const handleChangePage = (newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0); 
  };

  useEffect(() => {
    fetchParticipants();
  }, []);

  return (
    <Container>
      <TextField
        label="Buscar por nombre"
        variant="outlined"
        fullWidth
        value={searchQuery}
        onChange={handleSearchChange}
        sx={{ marginBottom: '1rem' }}
      />
      
      <Button
        variant="contained"
        color="primary"
        onClick={handleDownloadCSV}
        disabled={loading} 
      >
        {loading ? <CircularProgress size={24} /> : "Descargar CSV"}
      </Button>
      
      {loading ? (
        <CircularProgress />
      ) : (
        <ParticipantsTable
          participants={filteredParticipants} // Usar los participantes filtrados
          page={page}
          rowsPerPage={rowsPerPage}
          downloadCSV={handleDownloadCSV}
          handleChangePage={handleChangePage}
          handleChangeRowsPerPage={handleChangeRowsPerPage}
          setParticipants={setParticipants}
        />
      )}
    </Container>
  );
}

export default AdminAztlan;