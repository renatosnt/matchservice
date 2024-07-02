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
import { ServiceModalProps } from "../../application/ServiceModalProps";

export const NewServiceModal = ({ open, handleClose }: ServiceModalProps) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = () => {
    if (image) {
      const newService = {
        id: Date.now(), // Exemplo de ID único
        title,
        description,
        image: URL.createObjectURL(image),
        provider: "João", // Pode ser substituído pelo valor dinâmico do provedor
      };
      console.log("Novo Serviço:", newService);
      handleClose();
    } else {
      alert("Por favor, envie uma imagem para o serviço.");
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
              <input
                accept="image/*"
                type="file"
                onChange={handleImageChange}
                style={{ display: "none" }}
                id="upload-button"
              />
              <label htmlFor="upload-button">
                <Button variant="contained" color="primary" component="span">
                  Upload da Imagem
                </Button>
              </label>
              {imagePreview && (
                <Box mt={2} textAlign="center">
                  <img
                    src={imagePreview}
                    alt="Pré-visualização da Imagem"
                    style={{ maxHeight: "200px" }}
                  />
                </Box>
              )}
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
