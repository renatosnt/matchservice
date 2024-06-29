import React from "react";
import {
    Dialog,
    DialogContent,
    DialogActions,
    Grid,
    CardMedia,
    Typography,
    Button,
    Box,
} from "@mui/material";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import { LocalizationProvider, StaticDatePicker } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import ptBR from "date-fns/locale/pt-BR";

export const ServiceModal = ({ open, handleClose, service }) => {
    const [selectedDate, setSelectedDate] = React.useState(new Date());

    return (
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
                    </Box>
                </DialogContent>
            )}
            <DialogActions>
                <Button onClick={handleClose} color="secondary">
                    Fechar
                </Button>
                <Button onClick={() => alert("Agendado")} color="primary">
                    Agendar
                </Button>
            </DialogActions>
        </Dialog>
    );
};
