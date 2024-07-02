import React, { useState, useEffect } from "react";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import {
  Box,
  Button,
  CardMedia,
  Dialog,
  DialogActions,
  DialogContent,
  Grid,
  Typography,
  TextField,
} from "@mui/material";
import { ServiceModalProps } from "../../application/ServiceModalProps";
import BasicDateCalendar from "./Calendar";
import WorkIcon from "@mui/icons-material/Work";
import PersonIcon from "@mui/icons-material/Person";

export const EditServiceModal = ({
  open,
  handleClose,
  service,
}: ServiceModalProps) => {
  const [title, setTitle] = useState(service?.title || "");
  const [description, setDescription] = useState(service?.description || "");
  const [image, setImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState(service?.image || "");

  useEffect(() => {
    if (service) {
      setTitle(service.title);
      setDescription(service.description);
      setImagePreview(service.image);
    }
  }, [service]);

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
    // Aqui você pode adicionar a lógica para salvar as alterações
    console.log("Título:", title);
    console.log("Descrição:", description);
    if (image) {
      console.log("Imagem:", URL.createObjectURL(image));
    }
    handleClose();
  };

  return (
    <>
      <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth>
        {service && (
          <DialogContent>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={4}>
                <CardMedia
                  component="img"
                  alt={service.title}
                  height="140"
                  image={imagePreview}
                  title={service.title}
                  style={{ borderRadius: "8px" }}
                />
                <input
                  accept="image/*"
                  type="file"
                  onChange={handleImageChange}
                  style={{ display: "none" }}
                  id="upload-button"
                />
                <label htmlFor="upload-button">
                  <Button
                    variant="contained"
                    color="primary"
                    component="span"
                    style={{ marginTop: "10px" }}
                  >
                    Upload Nova Imagem
                  </Button>
                </label>
              </Grid>
              <Grid item xs={12} sm={8} container alignItems="center">
                <Grid item xs={8} container direction="column">
                  <Grid container spacing={1} alignItems="center">
                    <Grid item>
                      <WorkIcon style={{ color: "black" }} />
                    </Grid>
                    <Grid item>
                      <TextField
                        fullWidth
                        label="Título do Serviço"
                        variant="outlined"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                      />
                    </Grid>
                  </Grid>
                  <Grid
                    container
                    spacing={1}
                    alignItems="center"
                    style={{ marginTop: "8px" }}
                  >
                    <Grid item>
                      <PersonIcon style={{ color: "black" }} />
                    </Grid>
                    <Grid item>
                      <Typography variant="h6" component="p">
                        {service.provider}
                      </Typography>
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item xs={4} container justifyContent="center">
                  <Button
                    variant="contained"
                    style={{
                      padding: "6px 12px",
                      borderRadius: "20px",
                      backgroundColor: "#232426",
                      color: "#fff",
                    }}
                  >
                    Entrar em contato
                  </Button>
                </Grid>
              </Grid>
            </Grid>
            <Grid container spacing={4} mt={2}>
              <Grid item xs={12} md={6}>
                <Box
                  p={2}
                  border={1}
                  borderColor="grey.300"
                  borderRadius={2}
                  bgcolor="white"
                  display="flex"
                  flexDirection="column"
                  height="100%"
                  maxHeight="350px"
                  overflow="auto"
                >
                  <Typography variant="h6" component="h3">
                    Descrição:
                  </Typography>
                  <TextField
                    fullWidth
                    multiline
                    minRows={6}
                    variant="outlined"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                  />
                </Box>
              </Grid>
              <Grid item xs={12} md={6}>
                <Box
                  p={2}
                  border={1}
                  borderColor="grey.300"
                  borderRadius={2}
                  bgcolor="white"
                  display="flex"
                  flexDirection="column"
                  height="100%"
                  maxHeight="350px"
                  overflow="auto"
                >
                  <Typography variant="h6" component="h3">
                    Agenda
                  </Typography>
                  <BasicDateCalendar />
                </Box>
              </Grid>
            </Grid>
          </DialogContent>
        )}
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
