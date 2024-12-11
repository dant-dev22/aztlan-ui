import React from 'react';
import { Button, Container, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TablePagination, Paper } from '@mui/material';
import axios from 'axios';  // Importar axios para hacer solicitudes HTTP

const calculateAge = (birthDate) => {
  const birthDateObj = new Date(birthDate);
  const today = new Date();
  let age = today.getFullYear() - birthDateObj.getFullYear();
  const month = today.getMonth();
  const day = today.getDate();

  if (month < birthDateObj.getMonth() || (month === birthDateObj.getMonth() && day < birthDateObj.getDate())) {
    age--;
  }

  return age;
};

const ParticipantsTable = ({ participants, page, rowsPerPage, downloadCSV, handleChangePage, handleChangeRowsPerPage, setParticipants }) => {

  const handleDelete = async (participantId) => {
    try {
      console.log(participantId, "linea 27")
      await axios.delete(`http://localhost:8000/participants/${participantId}`);
      
      setParticipants(prevParticipants => prevParticipants.filter(participant => participant.id !== participantId));

      alert('Participante eliminado con éxito.');
    } catch (error) {
      console.error('Error al eliminar el participante:', error);
      alert('Hubo un error al eliminar el participante.');
    }
  };

  return (
    <Container
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        height: '100vh',
      }}
    >
      <Typography variant="h4" gutterBottom align="center">
        Admin Aztlan
      </Typography>
      <Button
        variant="contained"
        color="primary"
        fullWidth
        onClick={downloadCSV}
      >
        Descargar Registrados
      </Button>

      <TableContainer component={Paper}>
        <Table aria-label="participantes">
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Nombre</TableCell>
              <TableCell>Categoría</TableCell>
              <TableCell>Aztlan ID</TableCell>
              <TableCell>Pago Completo</TableCell>
              <TableCell>Edad</TableCell> {/* Nueva columna para la edad */}
              <TableCell>Acciones</TableCell> {/* Nueva columna para el botón eliminar */}
            </TableRow>
          </TableHead>
          <TableBody>
            {participants.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((participant) => (
              <TableRow key={participant.id}>
                <TableCell>{participant.id}</TableCell>
                <TableCell>{participant.name}</TableCell>
                <TableCell>{participant.category}</TableCell>
                <TableCell>{participant.aztlan_id}</TableCell>
                <TableCell>{participant.is_payment_complete ? 'Sí' : 'No'}</TableCell>
                <TableCell>{calculateAge(participant.birth_date)} años</TableCell>
                <TableCell>
                  {/* Botón de eliminar */}
                  <Button 
                    variant="outlined" 
                    color="secondary" 
                    onClick={() => handleDelete(participant.id)}
                  >
                    Eliminar
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <TablePagination
        rowsPerPageOptions={[10, 25, 50]}
        component="div"
        count={participants.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Container>
  );
};

export default ParticipantsTable;