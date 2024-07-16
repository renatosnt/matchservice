import React, { useState } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  Typography,
  Rating,
} from "@mui/material";
import { ServiceModalProps } from "../../application/ServiceModalProps";

export const ConfirmModal = ({
  open,
  handleClose,
  service,
  handleConfirm,
  text,
  rate,
}: ServiceModalProps) => {
  const [rating, setRating] = useState<number | null>(null);

  return (
    <Dialog open={open} onClose={handleClose} data-testid="confirm-modal">
      <DialogContent>
        {rate ? (
          <Rating
            name="service-rating"
            value={rating}
            onChange={(event, newValue) => {
              setRating(newValue);
            }}
          />
        ) : (
          <Typography variant="h6" component="p" gutterBottom>
            {text}
          </Typography>
        )}
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
