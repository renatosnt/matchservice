import React from "react";
import {
  Dialog,
  DialogContent,
  DialogActions,
  Typography,
  Button,
} from "@mui/material";

export const ConfirmModal = ({ open, handleClose, handleConfirm }) => {
  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogContent>
        <Typography variant="h6" component="p" gutterBottom>
          Deseja confirmar?
        </Typography>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="secondary" variant="contained">
          Cancelar
        </Button>
        <Button onClick={handleConfirm} color="primary" variant="contained">
          Concluir
        </Button>
      </DialogActions>
    </Dialog>
  );
};
