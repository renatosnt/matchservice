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
import { useState, useEffect } from "react";
import { ServiceModalProps } from "../../application/ServiceModalProps";
import BasicDateCalendar from "./Calendar";
import { ConfirmModal } from "./ConfirmModal";
import WorkIcon from "@mui/icons-material/Work";
import PersonIcon from "@mui/icons-material/Person";
import { getProfileById, getUserById } from "../api/api"; // Import the API calls

export const ServiceModal = ({
  open,
  handleClose,
  service,
}: ServiceModalProps) => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [userType, setUserType] = useState<string | null>(null);
  const [providerName, setProviderName] = useState("");
  const [location, setLocation] = useState("");
  const [basePrice, setBasePrice] = useState("");

  useEffect(() => {
    const user = localStorage.getItem("user");
    console.log("Raw user from localStorage:", user);
    if (user) {
      try {
        const parsedUser = JSON.parse(user);
        console.log("Parsed user object:", parsedUser);

        if (parsedUser && parsedUser.type) {
          setUserType(parsedUser.type);
          console.log("User type set to:", parsedUser.type);
        } else {
          console.warn("Parsed user does not have a type property.");
        }
      } catch (error) {
        console.error("Failed to parse user from localStorage:", error);
      }
    } else {
      console.warn("No user found in localStorage.");
    }

    if (service && service.creatorProfileId) {
      fetchProviderDetails(service.creatorProfileId);
    }
  }, [service]);

  const fetchProviderDetails = async (profileId: string) => {
    try {
      const profile = await getProfileById(profileId);
      const user = await getUserById(profile.userId); // Assuming profile contains userId
      console.log(profile);
      setProviderName(user.realName);
      setLocation(`${profile.locationCity}`);
      setBasePrice(profile.basePrice);
    } catch (error) {
      console.error("Failed to fetch provider details:", error);
    }
  };

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
      <Dialog
        open={open}
        onClose={handleClose}
        maxWidth="md"
        fullWidth
        data-testid="service-modal"
      >
        {service && (
          <DialogContent>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={4}>
                <CardMedia
                  component="img"
                  alt={service.title}
                  height="140"
                  image="https://via.placeholder.com/350"
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
                      <Typography
                        variant="h6"
                        component="p"
                        data-testid="service-title"
                      >
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
                      <Typography
                        variant="h6"
                        component="p"
                        data-testid="provider-name"
                      >
                        {providerName}
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
                      <Typography
                        variant="body1"
                        component="p"
                        data-testid="service-location"
                      >
                        Localização: {service.locationCity}
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
                      <Typography
                        variant="body1"
                        component="p"
                        data-testid="service-basePrice"
                      >
                        Preço Base: R$ {basePrice}
                      </Typography>
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item xs={4} container justifyContent="center">
                  {userType === "Customer" && (
                    <Button
                      variant="contained"
                      style={{
                        padding: "6px 12px",
                        borderRadius: "20px",
                        backgroundColor: "#232426",
                        color: "#fff",
                      }}
                      data-testid="contact-button"
                    >
                      Entrar em contato
                    </Button>
                  )}
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
              data-testid="close-button"
            >
              Fechar
            </Button>
            {
              <Button
                onClick={handleConfirmOpen}
                color="success"
                variant="contained"
                sx={{
                  marginRight: "1rem",
                }}
                data-testid="confirm-button"
              >
                Agendar
              </Button>
            }
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
