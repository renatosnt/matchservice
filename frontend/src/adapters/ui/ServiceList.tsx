import SearchIcon from "@mui/icons-material/Search";
import {
  AppBar,
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  Container,
  Grid,
  InputBase,
  Toolbar,
  Typography,
  alpha,
} from "@mui/material";
import { SetStateAction, useState } from "react";
import Header from "./Header";
import { ServiceModal } from "./ServiceModal";

const services = [
  {
    id: 1,
    image: "https://via.placeholder.com/150",
    title: " Teste de Serviço",
    description: "Bruna Teste de descrição",
  },
  {
    id: 2,
    image: "https://via.placeholder.com/150",
    title: "Almoxarife Serviço",
    description: "O melhor almoxarife",
  },
  {
    id: 3,
    image: "https://via.placeholder.com/150",
    title: "Fotografo",
    description: "Descrição do Serviço",
  },
  {
    id: 4,
    image: "https://via.placeholder.com/150",
    title: "Faxineira",
    description: "Descrição do Serviço",
  },
  {
    id: 5,
    image: "https://via.placeholder.com/150",
    title: "Serviço",
    description: "Descrição do Serviço",
  },
  {
    id: 6,
    image: "https://via.placeholder.com/150",
    title: "Serviço",
    description: "Descrição do Serviço",
  },
  {
    id: 7,
    image: "https://via.placeholder.com/150",
    title: "Serviço",
    description: "Descrição do Serviço",
  },
  {
    id: 8,
    image: "https://via.placeholder.com/150",
    title: "Serviço",
    description: "Descrição do Serviço",
  },
];

export const ServiceList = () => {
  const [open, setOpen] = useState(false);
  const [selectedService, setSelectedService] = useState<{
    id: number;
    image: string;
    title: string;
    description: string;
    provider?: string;
  } | null>(null);

  const handleClickOpen = (
    service: SetStateAction<{
      id: number;
      image: string;
      title: string;
      description: string;
      provider?: string;
    } | null>,
  ) => {
    setSelectedService(service);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedService(null);
  };

  const [searchTerm, setSearchTerm] = useState("");

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const filteredServices = services.filter((service) => {
    const titleMatch = service.title
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const descriptionMatch = service.description
      ?.toLowerCase()
      .includes(searchTerm.toLowerCase());

    return titleMatch || descriptionMatch;
  });

  return (
    <Container>
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
          <Grid container justifyContent="right" alignItems="center">
            <Grid item xs>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  width: "100%",
                  height: "60px",
                  borderRadius: "8px",
                  padding: "10px",
                  boxSizing: "border-box",
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    paddingRight: "10px",
                  }}
                >
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
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    pointerEvents: "none",
                    paddingRight: "10px",
                    marginLeft: "8rem",
                  }}
                >
                  <SearchIcon />
                </Box>
                <InputBase
                  placeholder="Procurar por serviço"
                  inputProps={{ "aria-label": "search" }}
                  fullWidth
                  sx={{
                    paddingLeft: "10px",
                    paddingRight: "10px",
                    height: "100%",
                    backgroundColor: "white",
                    borderRadius: "4px",
                    boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
                    marginRight: "8rem",
                  }}
                  value={searchTerm}
                  onChange={handleSearchChange}
                />
              </Box>
            </Grid>
            <Grid item>
              <Button
                variant="contained"
                color="primary"
                sx={{
                  borderRadius: 20,
                }}
              >
                Anunciar Serviço
              </Button>
            </Grid>
            <Grid item>
              <Header />
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
      <Grid container spacing={4} sx={{ mt: 12 }}>
        {filteredServices.map((service) => (
          <Grid item key={service.id} xs={12} sm={6} md={3}>
            <Card
              onClick={() => handleClickOpen(service)}
              sx={{ cursor: "pointer" }}
            >
              <CardMedia
                component="img"
                alt={service.title}
                height="140"
                image={service.image}
                title={service.title}
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="h2">
                  {service.title}
                </Typography>
                <Typography variant="body2" color="textSecondary" component="p">
                  {service.description}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
      <ServiceModal
        open={open}
        handleClose={handleClose}
        service={selectedService}
        handleConfirm={function (): void {
          throw new Error("Function not implemented.");
        }}
      />
    </Container>
  );
};
