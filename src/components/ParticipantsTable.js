import React from 'react';
import { Button, Container, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TablePagination, Paper } from '@mui/material';

const ParticipantsTable = ({ participants, page, rowsPerPage, downloadCSV, handleChangePage, handleChangeRowsPerPage }) => {
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
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Paginación */}
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