import React, { useState } from 'react';
import { Button, Container, Typography } from '@mui/material';

function AdminAztlan() {
  const [participants, setParticipants] = useState([]);

  const handleDownload = async () => {
    try {
      // Hacemos la solicitud GET a la API para obtener todos los participantes
      const response = await fetch('http://localhost:8000/participants');
      if (!response.ok) {
        throw new Error('Error al obtener los participantes');
      }

      const data = await response.json();
      setParticipants(data); // Guardamos los participantes en el estado

      console.log('Participantes:', data); // Puedes hacer lo que necesites con los datos

      const csvData = data.map(participant => `${participant.id}, ${participant.weight},${participant.name},${participant.category},${participant.academy},${participant.birth_date},${participant.aztlan_id},${participant.is_payment_complete}`).join('\n');
      const blob = new Blob([csvData], { type: 'text/csv' });
      const link = document.createElement('a');
      link.href = URL.createObjectURL(blob);
      link.download = 'participantes.csv';
      link.click();
    } catch (error) {
      console.error('Error al descargar los registrados:', error);
    }
  };

  return (
    <Container
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
      }}
    >
      <section>
        <Typography variant="h4" gutterBottom align="center">
          Admin Aztlan
        </Typography>
        <Button 
          variant="contained" 
          color="primary" 
          fullWidth
          onClick={handleDownload} // Llamamos a la función handleDownload
        >
          Descargar Registrados
        </Button>
        {/* Puedes agregar más botones o contenido aquí según sea necesario */}
      </section>
    </Container>
  );
}

export default AdminAztlan;