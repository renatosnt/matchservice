import React, { useState } from "react";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import {
  Service,
  ServiceModalProps,
} from "../../application/ServiceModalProps";
import { createService } from "../api/api"; // Import the createService function

export const NewServiceModal = ({ open, handleClose }: ServiceModalProps) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [error, setError] = useState<string | null>(null);

  const handleSave = async () => {
    setError(null);
    try {
      // Get the user from local storage to use their ID
      const user = localStorage.getItem("user");
      if (user) {
        const parsedUser = JSON.parse(user);

        const newService = {
          title,
          description,
          category: "Other",
          locationSate: "SP",
          locationCity: "São Paulo",
        } as any;

        // Call the createService function
        await createService(newService);

        // Clear the form and close the modal
        setTitle("");
        setDescription("");
        handleClose();
      } else {
        setError("User not found");
      }
    } catch (error: any) {
      setError(error.message || "Failed to create service");
    }
  };

  return (
    <>
      <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth>
        <DialogContent>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Título do Serviço"
                variant="outlined"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                margin="normal"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                multiline
                minRows={4}
                label="Descrição do Serviço"
                variant="outlined"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                margin="normal"
              />
            </Grid>
            {error && (
              <Grid item xs={12}>
                <Typography color="error">{error}</Typography>
              </Grid>
            )}
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancelar
          </Button>
          <Button onClick={handleSave} color="primary">
            Salvar
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};
