import React, { useState, useEffect } from 'react';
import { Button, Container, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TablePagination, Paper, Switch, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import axios from 'axios';

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
  const [paymentStatus, setPaymentStatus] = useState({});
  const [openModal, setOpenModal] = useState(false);  // Estado para controlar el modal
  const [selectedParticipant, setSelectedParticipant] = useState(null); // Participante seleccionado para la actualización

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
    participants.forEach((participant) => {
      fetchPaymentProof(participant.aztlan_id);
    });
  }, [participants]);

  // Función para actualizar el estado del pago
  const updatePaymentStatus = async (aztlanId, isPaymentComplete) => {
    try {
      const response = await axios.put(`https://vjfpbq4jbiz5uyarfu7z7ahlhi0xbhmi.lambda-url.us-east-1.on.aws/participants/${aztlanId}/payment-status/${isPaymentComplete}`);
      if (response.status === 200) {
        setPaymentStatus((prevStatus) => ({
          ...prevStatus,
          [aztlanId]: isPaymentComplete
        }));
        alert('Estado de pago actualizado con éxito');
      } else {
        alert('Hubo un error al actualizar el estado de pago');
      }
    } catch (error) {
      console.error('Error al actualizar el estado de pago:', error);
      alert('Hubo un error al actualizar el estado de pago');
    }
  };

  const handleSwitchChange = (event, participant) => {
    setSelectedParticipant(participant); 
    setOpenModal(true); 
  };

  const handleConfirmUpdate = () => {
    const isPaymentComplete = selectedParticipant.is_payment_complete === 1 ? 0 : 1;
    updatePaymentStatus(selectedParticipant.aztlan_id, isPaymentComplete);
    setOpenModal(false);
  };

  

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const handleDelete = async (participantId) => {
    try {
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
                <TableCell>
                  <Switch
                    checked={participant.is_payment_complete === 1}
                    onChange={(event) => handleSwitchChange(event, participant)}
                    name="paymentStatus"
                    inputProps={{ 'aria-label': 'payment status switch' }}
                  />
                </TableCell>
 
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

      <Dialog
        open={openModal}
        onClose={handleCloseModal}
      >
        <DialogTitle>Confirmar actualización</DialogTitle>
        <DialogContent>
          <Typography variant="body1">
            ¿Estás seguro de que deseas actualizar el estado de pago para el participante?
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseModal} color="secondary">
            No
          </Button>
          <Button onClick={handleConfirmUpdate} color="primary">
            Sí
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default ParticipantsTable;