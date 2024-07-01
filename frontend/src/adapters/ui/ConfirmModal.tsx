import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  Typography,
} from "@mui/material";

import { ServiceModalProps } from "../../application/ServiceModalProps";

export const ConfirmModal = ({
  open,
  handleClose,
  service,
  handleConfirm,
}: ServiceModalProps) => {
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
