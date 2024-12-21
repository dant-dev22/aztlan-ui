import React, { useState, useEffect } from 'react';
import { Container, CircularProgress, Button, TextField } from '@mui/material';
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

  useEffect(() => {
    fetchParticipants(API_URL, setLoading, setParticipants, setFilteredParticipants);
  }, []);

  useEffect(() => {
    handleSearchChange(searchQuery, participants, setFilteredParticipants);
  }, [searchQuery, participants]);

  return (
    <Container>
      <TextField
        label="Buscar por nombre, academia o años entrenando"
        variant="outlined"
        fullWidth
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)} // Actualiza el searchQuery directamente
        sx={{ marginBottom: '1rem' }}
        placeholder="Busca por nombre, academia o años entrenando"
      />
      
      <Button
        variant="contained"
        color="primary"
        onClick={() => handleDownloadCSV(filteredParticipants, setLoading, generateCSV, downloadCSV)}
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
    </Container>
  );
}

export default AdminAztlan;