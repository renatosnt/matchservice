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
  MenuItem,
  FormControl,
  InputLabel,
  Select,
} from "@mui/material";
import { ServiceModalProps } from "../../application/ServiceModalProps";
import { createService } from "../api/api"; // Import the createService function

const categories = [
  "Limpeza",
  "Logística",
  "Fotografia",
  "Cuidados Infantis",
  "Fitness",
  "Jardinagem",
  "Construção",
  "Manutenção",
  "Automotivo",
  "Beleza",
  "Gastronomia",
  "Tecnologia",
  "Design",
];

const cities = [
  "São Paulo",
  "Rio de Janeiro",
  "Belo Horizonte",
  "Curitiba",
  "Porto Alegre",
  "Salvador",
  "Brasília",
  "Fortaleza",
];

export const NewServiceModal = ({
  open,
  handleClose,
  onSave,
}: ServiceModalProps & { onSave: () => void }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [locationCity, setLocationCity] = useState("");
  const [basePrice, setBasePrice] = useState("");
  const [error, setError] = useState<string | null>(null);

  const handleSave = async () => {
    setError(null);
    try {
      // Get the user from local storage to use their ID and token
      const user = localStorage.getItem("user");
      if (user) {
        const parsedUser = JSON.parse(user);

        const newService = {
          title,
          description,
          category,
          locationState: "SP",
          locationCity,
          basePrice,
        };

        // Call the createService function with the token
        await createService(newService, parsedUser.data.token);

        // Clear the form and close the modal
        setTitle("");
        setDescription("");
        setCategory("");
        setLocationCity("");
        setBasePrice("");
        handleClose();

        // Call the onSave function to trigger a re-render
        onSave();
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
            <Grid item xs={12}>
              <FormControl fullWidth margin="normal">
                <InputLabel>Categoria</InputLabel>
                <Select
                  value={category}
                  onChange={(e) => setCategory(e.target.value as string)}
                  label="Categoria"
                >
                  {categories.map((cat) => (
                    <MenuItem key={cat} value={cat}>
                      {cat}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <FormControl fullWidth margin="normal">
                <InputLabel>Cidade</InputLabel>
                <Select
                  value={locationCity}
                  onChange={(e) => setLocationCity(e.target.value as string)}
                  label="Cidade"
                >
                  {cities.map((city) => (
                    <MenuItem key={city} value={city}>
                      {city}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Preço Base"
                variant="outlined"
                type="number"
                value={basePrice}
                onChange={(e) => setBasePrice(e.target.value)}
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
