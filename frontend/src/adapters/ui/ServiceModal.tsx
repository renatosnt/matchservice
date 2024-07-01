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
} from "@mui/material";
import { useState } from "react";
import { ServiceModalProps } from "../../application/ServiceModalProps";
import BasicDateCalendar from "./Calendar";
import { ConfirmModal } from "./ConfirmModal";
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
              <Grid item xs={12} sm={8}>
                <Typography variant="h6" component="p" gutterBottom>
                  <strong>Serviço:</strong> {service.title}
                </Typography>
                <Typography variant="h6" component="p" gutterBottom>
                  <strong>Prestador:</strong> {service.provider}
                </Typography>
                <Button
                  variant="contained"
                  color="success"
                  style={{ marginBottom: "16px" }}
                >
                  Entrar em contato
                </Button>
                <Typography
                  variant="body2"
                  color="textSecondary"
                  component="p"
                  gutterBottom
                >
                  <CalendarTodayIcon /> Visualizado 34 vezes
                </Typography>
              </Grid>
            </Grid>
            <Box mt={2}>
              <Typography variant="h6" component="h3">
                Descrição:
              </Typography>
              <Typography variant="body2" component="p">
                {service.description}
              </Typography>
            </Box>
            <Box mt={2}>
              <Typography variant="h6" component="h3">
                Agenda
              </Typography>
              <BasicDateCalendar />
            </Box>
          </DialogContent>
        )}
        <DialogActions>
          <Button onClick={handleClose} color="secondary">
            Fechar
          </Button>
          <Button onClick={handleConfirmOpen} color="primary">
            Agendar
          </Button>
        </DialogActions>
      </Dialog>
      <ConfirmModal
        open={confirmOpen}
        handleClose={handleConfirmClose}
        handleConfirm={handleConfirm}
        service={service}
      />
    </>
  );
};
