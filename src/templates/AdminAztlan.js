import React, { useState, useEffect } from 'react';
import { Container, CircularProgress, Button } from '@mui/material';
import ParticipantsTable from '../components/ParticipantsTable';

const API_URL = "https://vjfpbq4jbiz5uyarfu7z7ahlhi0xbhmi.lambda-url.us-east-1.on.aws"; // Nuevo endpoint

function AdminAztlan() {
  const [participants, setParticipants] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [loading, setLoading] = useState(false); // Estado de carga

  const fetchParticipants = async () => {
    setLoading(true); // Activar el loading cuando se inicie la carga
    try {
      const response = await fetch(`${API_URL}/participants`); // Usar el nuevo endpoint
      if (!response.ok) {
        throw new Error('Error al obtener los participantes');
      }

      const data = await response.json();
      setParticipants(data);
    } catch (error) {
      console.error('Error al obtener los participantes:', error);
    } finally {
      setLoading(false); // Desactivar el loading cuando se termine de cargar
    }
  };

  const downloadCSV = () => {
    setLoading(true); // Activar el loading cuando se esté generando el CSV
    try {
      const csvData = participants.map(participant =>
        `${participant.id}, ${participant.weight},${participant.name},${participant.category},${participant.academy},${participant.birth_date},${participant.aztlan_id},${participant.is_payment_complete}`
      ).join('\n');

      const blob = new Blob([csvData], { type: 'text/csv' });
      const link = document.createElement('a');
      link.href = URL.createObjectURL(blob);
      link.download = 'participantes.csv';
      link.click();
    } catch (error) {
      console.error('Error al generar el archivo CSV:', error);
    } finally {
      setLoading(false); // Desactivar el loading cuando se termine de generar el CSV
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
      <Button
        variant="contained"
        color="primary"
        onClick={downloadCSV}
        disabled={loading} // Deshabilitar el botón mientras se está generando el CSV
      >
        {loading ? <CircularProgress size={24} /> : "Descargar CSV"}
      </Button>
      
      {loading ? (
        <CircularProgress />
      ) : (
        <ParticipantsTable 
          participants={participants} 
          page={page} 
          rowsPerPage={rowsPerPage} 
          downloadCSV={downloadCSV} 
          handleChangePage={handleChangePage} 
          handleChangeRowsPerPage={handleChangeRowsPerPage} 
          setParticipants={setParticipants}
        />
      )}
    </Container>
  );
}

export default AdminAztlan;