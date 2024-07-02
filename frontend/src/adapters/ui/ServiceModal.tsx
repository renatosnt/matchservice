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
  CardContent,
  Card,
} from "@mui/material";
import { useState } from "react";
import { ServiceModalProps } from "../../application/ServiceModalProps";
import BasicDateCalendar from "./Calendar";
import { ConfirmModal } from "./ConfirmModal";
import WorkIcon from "@mui/icons-material/Work";
import PersonIcon from "@mui/icons-material/Person";
import VisibilityIcon from "@mui/icons-material/Visibility";
export const ServiceModal = ({
  open,
  handleClose,
  service,
}: ServiceModalProps) => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [confirmOpen, setConfirmOpen] = useState(false);
  const handleConfirmClose = () => {
    setConfirmOpen(false);
  };

  const handleConfirmOpen = () => {
    setConfirmOpen(true);
  };

  const handleConfirm = () => {
    alert("Agendado");
    setConfirmOpen(false);
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
                  image={service.image}
                  title={service.title}
                  style={{ borderRadius: "8px" }}
                />
              </Grid>
              <Grid item xs={12} sm={8} container alignItems="center">
                <Grid item xs={8} container direction="column">
                  <Grid container spacing={1} alignItems="center">
                    <Grid item>
                      <WorkIcon style={{ color: "black" }} />
                    </Grid>
                    <Grid item>
                      <Typography variant="h6" component="p">
                        {service.title}
                      </Typography>
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
                  <Grid
                    container
                    spacing={1}
                    alignItems="center"
                    style={{ marginTop: "8px" }}
                  >
                    <Grid item>
                      <VisibilityIcon style={{ color: "#ccc" }} />
                    </Grid>
                    <Grid item>
                      <Typography
                        variant="body2"
                        color="textSecondary"
                        component="p"
                      >
                        Visualizado 34 vezes
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
                  <Typography variant="body2" component="p">
                    {service.description}
                  </Typography>
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
          <Box padding={2}>
            <Button
              onClick={handleClose}
              color="error"
              sx={{
                marginRight: "1rem",
              }}
            >
              Fechar
            </Button>
            <Button
              onClick={handleConfirmOpen}
              color="success"
              variant="contained"
              sx={{
                marginRight: "1rem",
              }}
            >
              Agendar
            </Button>
          </Box>
        </DialogActions>
      </Dialog>
      <ConfirmModal
        open={confirmOpen}
        handleClose={handleConfirmClose}
        handleConfirm={handleConfirm}
        service={service}
        text="Deseja agendar este serviço?"
      />
    </>
  );
};
