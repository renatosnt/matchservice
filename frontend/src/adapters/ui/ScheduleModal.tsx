import React, { useState, useEffect } from "react";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  Typography,
} from "@mui/material";
import { ServiceModalProps } from "../../application/ServiceModalProps";
import { ConfirmModal } from "./ConfirmModal";

export const ScheduleModal = ({ open, handleClose }: ServiceModalProps) => {
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [userType, setUserType] = useState<string | null>(null);

  useEffect(() => {
    const user = localStorage.getItem("user");
    if (user) {
      const parsedUser = JSON.parse(user).data;
      setUserType(parsedUser.type);
    }
  }, []);
  const handleConfirmClose = () => {
    setConfirmOpen(false);
  };

  const handleConfirmOpen = () => {
    setConfirmOpen(true);
  };
  const handleConfirm = () => {
    alert("Obrigado pela sua avaliação!");
    setConfirmOpen(false);
    handleClose();
  };
  const appointmentsWithYou = [
    {
      id: 1,
      name: "Pedro",
      date: "20/04/2024",
      status: "scheduled",
    },
    {
      id: 2,
      name: "Pedro",
      date: "15/04/2024",
      status: "scheduled",
    },
  ];

  const appointmentsByYou = [
    {
      id: 3,
      name: "Leticia",
      date: "02/01/2024",
      status: "done",
    },
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "scheduled":
        return <CalendarTodayIcon color="success" />;
      case "done":
        return <CalendarTodayIcon color="error" />;
      default:
        return <CalendarTodayIcon />;
    }
  };

  const renderAppointments = (appointments: any[], label: string) => (
    <>
      <Typography variant="h6" component="div" gutterBottom>
        {label}
      </Typography>
      <Box mb={2}>
        {appointments.map((appointment) => (
          <Box
            key={appointment.id}
            display="flex"
            alignItems="center"
            justifyContent="space-between"
            bgcolor="grey.100"
            p={2}
            mb={1}
            borderRadius={1}
          >
            <Box display="flex" alignItems="center">
              {getStatusIcon(appointment.status)}
              <Typography ml={1}>
                Agendado com {appointment.name} para {appointment.date}
              </Typography>
            </Box>
            <Box display="flex" alignItems="center">
              <Button
                variant="contained"
                color="error"
                size="small"
                sx={{ mr: 1 }}
              >
                Cancelar
              </Button>
              <Button
                variant="contained"
                color="success"
                size="small"
                onClick={() => handleConfirmOpen()}
              >
                Concluir
              </Button>
            </Box>
          </Box>
        ))}
        <ConfirmModal
          open={confirmOpen}
          handleClose={handleConfirmClose}
          handleConfirm={handleConfirm}
          text="Como foi sua experiência?"
          rate={true}
        />
      </Box>
    </>
  );

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth>
      <DialogContent>
        {userType === "ServiceProvider"
          ? renderAppointments(appointmentsWithYou, "Agendado com você:")
          : null}
        {userType === "Customer"
          ? renderAppointments(appointmentsByYou, "Você agendou com:")
          : null}
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary">
          Fechar
        </Button>
      </DialogActions>
    </Dialog>
  );
};
