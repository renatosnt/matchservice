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
  text,
}: ServiceModalProps) => {
  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogContent>
        <Typography variant="h6" component="p" gutterBottom>
          {text}
        </Typography>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="error" variant="text">
          Cancelar
        </Button>
        <Button onClick={handleConfirm} color="success" variant="contained">
          Concluir
        </Button>
      </DialogActions>
    </Dialog>
  );
};
