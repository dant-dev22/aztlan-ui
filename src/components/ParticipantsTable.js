import React, { useState, useEffect } from 'react';
import { Button, Container, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TablePagination, Paper, Switch, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import axios from 'axios';
import { timeToYears, calculateAge } from '../templates/csvUtils';

const ParticipantsTable = ({ participants, setParticipants }) => {
  const [paymentProofs, setPaymentProofs] = useState({});
  const [openModal, setOpenModal] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [selectedParticipant, setSelectedParticipant] = useState(null);
  const [participantToDelete, setParticipantToDelete] = useState(null);
  
  // Estado para la paginación
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  useEffect(() => {
    participants.forEach((participant) => {
      fetchPaymentProof(participant.aztlan_id);
    });
  }, [participants]);

  const fetchPaymentProof = async (aztlanId) => {
    try {
      const response = await fetch(`https://vjfpbq4jbiz5uyarfu7z7ahlhi0xbhmi.lambda-url.us-east-1.on.aws/participants/${aztlanId}/payment-proof-url`);
      if (response.status === 204) {
        console.log("No content, skipping JSON parsing.");
        return;
      }
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

  const updatePaymentStatus = async (aztlanId, isPaymentComplete) => {
    try {
      const response = await axios.put(`https://vjfpbq4jbiz5uyarfu7z7ahlhi0xbhmi.lambda-url.us-east-1.on.aws/participants/${aztlanId}/payment/${isPaymentComplete}`);
      if (response.status === 200) {
        setParticipants((prevParticipants) =>
          prevParticipants.map((p) =>
            p.aztlan_id === aztlanId ? { ...p, is_payment_complete: isPaymentComplete } : p
          )
        );
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

  const handleDelete = (participantId) => {
    setParticipantToDelete(participantId);
    setOpenDeleteModal(true);
  };

  const handleConfirmDelete = async () => {
    try {
      const response = await axios.delete(`https://vjfpbq4jbiz5uyarfu7z7ahlhi0xbhmi.lambda-url.us-east-1.on.aws/participants/${participantToDelete}`);
      if (response.status === 200) {
        setParticipants((prevParticipants) =>
          prevParticipants.filter((participant) => participant.aztlan_id !== participantToDelete)
        );
        alert('Participante eliminado con éxito.');
      } else {
        alert('Hubo un error al eliminar el participante.');
      }
    } catch (error) {
      console.error('Error al eliminar el participante:', error);
      alert('Hubo un error al eliminar el participante.');
    } finally {
      setOpenDeleteModal(false);
    }
  };

  const handleCloseDeleteModal = () => {
    setOpenDeleteModal(false);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  


  return (
    <Container>
      <TableContainer component={Paper}>
        <Table aria-label="participantes">
          <TableHead>
            <TableRow>
              <TableCell>Nombre</TableCell>
              <TableCell>Experiencia</TableCell>
              <TableCell>Cinta</TableCell>
              <TableCell>Peso</TableCell>
              <TableCell>Academia</TableCell>
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
                <TableCell>{participant.name}</TableCell>
                <TableCell>{timeToYears(participant.experience)}</TableCell>
                <TableCell>{participant.belt}</TableCell>
                <TableCell>{participant.weight}</TableCell>
                <TableCell>{participant.academy}</TableCell>
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
                    <a href={paymentProofs[participant.aztlan_id]} target="_blank" rel="noopener noreferrer">
                      Comprobante de pago
                    </a>
                  ) : (
                    'No disponible'
                  )}
                </TableCell>
                <TableCell>
                  <Button variant="outlined" color="secondary" onClick={() => handleDelete(participant.aztlan_id)}>
                    Eliminar
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog open={openModal} onClose={handleCloseModal}>
        <DialogTitle>Confirmar actualización</DialogTitle>
        <DialogContent>
          <Typography>¿Estás seguro de que deseas actualizar el estado de pago para el participante?</Typography>
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
      <Dialog open={openDeleteModal} onClose={handleCloseDeleteModal}>
        <DialogTitle>Confirmar eliminación</DialogTitle>
        <DialogContent>
          <Typography>¿Estás seguro de que deseas eliminar al participante?</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDeleteModal} color="secondary">
            No
          </Button>
          <Button onClick={handleConfirmDelete} color="primary">
            Sí
          </Button>
        </DialogActions>
      </Dialog>

      <TablePagination
        rowsPerPageOptions={[5, 10, 20]}
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
