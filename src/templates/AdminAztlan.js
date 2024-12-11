import React, { useState, useEffect } from 'react';
import { Container } from '@mui/material';
import ParticipantsTable from '../components/ParticipantsTable';

function AdminAztlan() {
  const [participants, setParticipants] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const fetchParticipants = async () => {
    try {
      const response = await fetch('http://localhost:8000/participants');
      if (!response.ok) {
        throw new Error('Error al obtener los participantes');
      }

      const data = await response.json();
      setParticipants(data);
    } catch (error) {
      console.error('Error al obtener los participantes:', error);
    }
  };

  const downloadCSV = () => {
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
    }
  };

  const handleChangePage = (event, newPage) => {
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
      <ParticipantsTable 
        participants={participants} 
        page={page} 
        rowsPerPage={rowsPerPage} 
        downloadCSV={downloadCSV} 
        handleChangePage={handleChangePage} 
        handleChangeRowsPerPage={handleChangeRowsPerPage} 
        setParticipants={setParticipants}
      />
    </Container>
  );
}

export default AdminAztlan;