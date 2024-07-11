import {
  AppBar,
  Box,
  Button,
  Container,
  Grid,
  Toolbar,
  Typography,
} from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";

import backgroundImage from "../../infrastructure/assets/Working remotely.png";

const Home: React.FC = () => {
  return (
    <Box
      data-testid="cypress-title"
      sx={{ flexGrow: 1, overflow: "hidden", backgroundColor: "#F2FAFA" }}
    >
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
          <Grid container justifyContent="center">
            <Button
              component={Link}
              to="/login"
              color="inherit"
              sx={{
                mr: 2,
                textTransform: "none",
                fontWeight: "bold",
                fontSize: 16,
                color: "#1E88E5",
              }}
            >
              Encontrar Serviços
            </Button>
            <Button
              component={Link}
              to="/login"
              color="inherit"
              sx={{
                mr: 2,
                textTransform: "none",
                fontWeight: "bold",
                fontSize: 16,
                color: "gray",
              }}
            >
              Entrar
            </Button>
            <Button
              component={Link}
              to="/register"
              color="inherit"
              sx={{
                textTransform: "none",
                fontWeight: "bold",
                fontSize: 16,
                color: "gray",
                marginRight: 2,
              }}
            >
              Cadastrar
            </Button>
            <Button
              component={Link}
              to="/login"
              variant="contained"
              sx={{
                backgroundColor: "#1E88E5",
                textTransform: "none",
                fontWeight: "bold",
                fontSize: 16,
                borderRadius: 20,
              }}
            >
              Oferecer Serviços
            </Button>
          </Grid>
        </Toolbar>
      </AppBar>

      <Box sx={{ mt: 8, position: "relative" }}>
        <Grid container spacing={0} sx={{ height: "calc(100vh - 64px)" }}>
          <Grid
            item
            xs={12}
            md={6}
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <img
              src={backgroundImage}
              alt="Working remotely"
              style={{ maxWidth: "100%", height: "auto" }}
            />
          </Grid>

          <Grid
            item
            xs={12}
            md={6}
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              textAlign: "center",
            }}
          >
            <Container maxWidth="sm">
              <Box sx={{ p: { xs: 2, md: 4 } }}>
                <Typography
                  variant="h3"
                  component="h1"
                  sx={{ fontWeight: "bold", mb: 2, textAlign: "justify" }}
                >
                  Conecte-se &{" "}
                  <Box component="span" sx={{ display: "block" }}>
                    Cresça
                  </Box>
                </Typography>
                <Typography
                  variant="body1"
                  paragraph
                  sx={{ mb: 4, textAlign: "justify", color: "gray" }}
                >
                  Descubra a maneira mais fácil de agendar serviços locais,
                  promovendo conexões significativas entre usuários e
                  prestadores.
                </Typography>
              </Box>
            </Container>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default Home;
