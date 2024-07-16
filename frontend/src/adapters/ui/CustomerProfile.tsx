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
  Paper,
} from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import { makeStyles } from "@mui/styles";
import { getAllServices, getUserById } from "../api/api";
import { Service } from "../../application/ServiceModalProps";
import { ScheduleModal } from "./ScheduleModal";

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

export default function CustomerProfile() {
  const classes = useStyles();
  const [userServices, setUserServices] = useState<Service[]>([]);
  const [userData, setUserData] = useState({
    name: "",
    profileId: "",
  });
  const [scheduleModalOpen, setScheduleModalOpen] = useState(false);

  useEffect(() => {
    const user = localStorage.getItem("user");
    console.log("Raw user from localStorage:", user);

    if (user) {
      try {
        const parsedUser = JSON.parse(user);
        console.log("Parsed user object:", parsedUser);
        let profileId = "";
        getUserById(parsedUser.id).then(
          (data) => (profileId = data.serviceProviderProfileId || ""),
        );
        if (parsedUser) {
          setUserData({
            name: parsedUser.realName || parsedUser.username,
            profileId: profileId, // TODO
          });
        } else {
          console.warn(
            "Parsed user data is not in the expected format:",
            parsedUser,
          );
        }
      } catch (error) {
        console.error("Failed to parse user from localStorage:", error);
      }
    } else {
      console.warn("No user found in localStorage.");
    }
  }, []);

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
            <a href="/services" style={{ textDecoration: "none" }}>
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
          <Grid
            container
            justifyContent="center"
            alignItems="center"
            spacing={16}
            mt={1}
          >
            <Grid item xs={12} sm={4} mt={4}>
              <Box
                display="flex"
                flexDirection="column"
                alignItems="center"
                justifyContent="center"
              >
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
                <Button
                  variant="contained"
                  color="primary"
                  sx={{ marginTop: 2 }}
                  onClick={() => setScheduleModalOpen(true)}
                >
                  Minha Agenda
                </Button>
              </Box>
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
    </div>
  );
}
