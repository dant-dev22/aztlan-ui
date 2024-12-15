import React, { useState, useEffect } from 'react';
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
  const [paymentProofs, setPaymentProofs] = useState({});
  console.log(paymentProofs, "soy los payment proofs")

  const fetchPaymentProof = async (aztlanId) => {
    try {
      const response = await fetch(`https://vjfpbq4jbiz5uyarfu7z7ahlhi0xbhmi.lambda-url.us-east-1.on.aws/participants/${aztlanId}/payment-proof-url`);
      if (response.ok) {
        const data = await response.json();
        setPaymentProofs((prev) => ({
          ...prev,
          [aztlanId]: data.payment_proof_url,
        }));
      }
    } catch (error) {
      console.error('Error al obtener el comprobante de pago:', error);
    }
  };

  useEffect(() => {
    // Fetch de los comprobantes de pago de todos los participantes
    participants.forEach((participant) => {
      fetchPaymentProof(participant.aztlan_id);
    });
  }, [participants]);

  const handleDelete = async (participantId) => {
    try {
      // Cambiar la URL al nuevo endpoint
      const response = await axios.delete(`https://vjfpbq4jbiz5uyarfu7z7ahlhi0xbhmi.lambda-url.us-east-1.on.aws/participants/${participantId}`);
      
      if (response.status === 200) {
        setParticipants(prevParticipants => prevParticipants.filter(participant => participant.aztlan_id !== participantId));
        alert('Participante eliminado con éxito.');
      } else {
        alert('Hubo un error al eliminar el participante.');
      }
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
              <TableCell>Edad</TableCell>
              <TableCell>Comprobante</TableCell>
              <TableCell>Acciones</TableCell>
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
                  {paymentProofs[participant.aztlan_id] ? (
                    <a
                      href={paymentProofs[participant.aztlan_id]}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Comprobante de pago
                    </a>
                  ) : (
                    'No disponible'
                  )}
                </TableCell>                
                <TableCell>
                  <Button 
                    variant="outlined" 
                    color="secondary" 
                    onClick={() => handleDelete(participant.aztlan_id)}
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