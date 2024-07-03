import Header from "./Header";
import React, { useEffect, useState } from "react";
import {
  AppBar,
  Box,
  Button,
  Grid,
  Toolbar,
  alpha,
  Card,
  CardContent,
  CardMedia,
  Typography,
  Avatar,
  Container,
  CardActions,
  Paper,
} from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import WorkIcon from "@mui/icons-material/Work";
import { makeStyles } from "@mui/styles";
import { ScheduleModal } from "./ScheduleModal";
import { EditServiceModal } from "./EditServiceModal";
import { NewServiceModal } from "./NewServiceModal";
import { searchServices } from "../api/api"; // Import the API call
import { Service } from "../../application/ServiceModalProps";

const useStyles = makeStyles({
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: "20px",
  },
  profileSection: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    marginBottom: "20px",
  },
  profilePhoto: {
    width: "150px",
    height: "150px",
    marginBottom: "10px",
  },
  buttons: {
    marginTop: "10px",
    "& button": {
      margin: "5px 0",
    },
  },
  serviceSection: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  serviceCard: {
    maxWidth: "345px",
  },
  serviceMedia: {
    height: "200px",
  },
});

export default function Profile() {
  const classes = useStyles();
  const [scheduleModalOpen, setScheduleModalOpen] = useState(false);
  const [newServiceModalOpen, setNewServiceModalOpen] = useState(false);
  const [editServiceModalOpen, setEditServiceModalOpen] = useState(false);
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const [userServices, setUserServices] = useState<Service[]>([]);
  const [userData, setUserData] = useState({
    name: "",
    profession: "",
    profileId: "",
  });

  useEffect(() => {
    // Get user data from localStorage
    const user = localStorage.getItem("user");
    if (user) {
      const parsedUser = JSON.parse(user);
      setUserData({
        name: parsedUser.realName || parsedUser.username,
        profession: parsedUser.profession || "Profissão não informada",
        profileId: parsedUser.profileId,
      });
      // Fetch user services
      fetchUserServices(parsedUser.profileId);
    }
  }, []);

  const fetchUserServices = async (profileId: string) => {
    try {
      const services = await searchServices({ profileId });
      setUserServices(services);
    } catch (error) {
      console.error("Failed to fetch user services:", error);
    }
  };

  return (
    <div>
      <AppBar
        position="fixed"
        color="transparent"
        elevation={0}
        sx={{
          backgroundColor: "White",
          borderBottom: "1px solid #E0E0E0",
          boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
        }}
      >
        <Toolbar>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <a href="/" style={{ textDecoration: "none" }}>
              <Typography
                variant="h5"
                component="div"
                sx={{
                  fontWeight: "bold",
                }}
              >
                <span style={{ color: "#333333" }}>Match</span>
                <span style={{ color: "#0575E6" }}>Service</span>
              </Typography>
            </a>
          </Box>
          <Grid container justifyContent="right" alignItems="center">
            <Grid item xs>
              <Box
                sx={{
                  position: "relative",
                  borderRadius: "20px",
                  backgroundColor: alpha("#fff", 0.15),
                  "&:hover": {
                    backgroundColor: alpha("#fff", 0.25),
                  },
                  marginLeft: 0,
                  width: "100%",
                }}
              >
                <Box
                  sx={{
                    paddingLeft: "20px",
                    height: "40px",
                    position: "absolute",
                    pointerEvents: "none",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                ></Box>
              </Box>
            </Grid>
            <Grid item>
              <Header />
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
      <Container maxWidth="lg">
        <Paper
          elevation={3}
          sx={{
            padding: 4,
          }}
        >
          <Grid container spacing={16} mt={1}>
            <Grid item xs={12} sm={4} mt={4}>
              <Box display="flex" flexDirection="column" alignItems="center">
                <Avatar
                  alt={userData.name}
                  sx={{
                    width: 150,
                    height: 150,
                    marginBottom: 2,
                  }}
                />
                <Box display="flex" alignItems="center" mb={1}>
                  <PersonIcon />
                  <Typography variant="h6" ml={1}>
                    {userData.name}
                  </Typography>
                </Box>
                <Box display="flex" alignItems="center">
                  <WorkIcon />
                  <Typography variant="subtitle1" ml={1}>
                    {userData.profession}
                  </Typography>
                </Box>
                <Button
                  variant="contained"
                  color="primary"
                  fullWidth
                  sx={{ marginTop: 2 }}
                  onClick={() => setScheduleModalOpen(true)}
                >
                  Agenda
                </Button>
              </Box>
            </Grid>
            <Grid item xs={12} sm={8}>
              <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                mb={2}
              >
                <Typography variant="h5">Seus Serviços</Typography>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => setNewServiceModalOpen(true)}
                >
                  Novo Serviço
                </Button>
              </Box>
              {userServices.map((service) => (
                <Card key={service.id} sx={{ marginBottom: 2 }}>
                  <CardMedia
                    component="img"
                    height="140"
                    image={service.image}
                    alt={service.title}
                  />
                  <CardContent>
                    <Typography gutterBottom variant="h6" component="div">
                      {service.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {service.description}
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <Button
                      size="small"
                      variant="contained"
                      color="primary"
                      onClick={() => {
                        setSelectedService(service);
                        setEditServiceModalOpen(true);
                      }}
                    >
                      Editar
                    </Button>
                  </CardActions>
                </Card>
              ))}
            </Grid>
          </Grid>
        </Paper>
      </Container>

      <ScheduleModal
        open={scheduleModalOpen}
        handleClose={() => setScheduleModalOpen(false)}
        handleConfirm={function (): void {
          throw new Error("Function not implemented.");
        }}
        service={null}
      />
      <NewServiceModal
        open={newServiceModalOpen}
        handleClose={() => setNewServiceModalOpen(false)}
        handleConfirm={function (): void {
          throw new Error("Function not implemented.");
        }}
        service={null}
      />
      <EditServiceModal
        open={editServiceModalOpen}
        handleClose={() => setEditServiceModalOpen(false)}
        service={selectedService}
        handleConfirm={function (): void {
          throw new Error("Function not implemented.");
        }}
      />
    </div>
  );
}
