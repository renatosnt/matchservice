import {
  AppBar,
  Button,
  Card,
  CardContent,
  CardMedia,
  Container,
  Grid,
  Toolbar,
  Typography,
} from "@mui/material";
import { SetStateAction, useState } from "react";
import Header from "./Header";
import { ServiceModal } from "./ServiceModal";
const services = [
  {
    id: 1,
    image: "https://via.placeholder.com/150",
    title: "Serviço",
    description: "Descrição do Serviço",
  },
  {
    id: 2,
    image: "https://via.placeholder.com/150",
    title: "Serviço",
    description: "Descrição do Serviço",
  },
  {
    id: 3,
    image: "https://via.placeholder.com/150",
    title: "Serviço",
    description: "Descrição do Serviço",
  },
  {
    id: 4,
    image: "https://via.placeholder.com/150",
    title: "Serviço",
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

  return (
    <Container>
      <AppBar position="static" color="transparent" elevation={0}>
        <Toolbar>
          <Grid container justifyContent="right" alignItems="center">
            <Grid item>
              <Button variant="contained" color="primary">
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
        {services.map((service) => (
          <Grid item key={service.id} xs={12} sm={6} md={3}>
            <Card onClick={() => handleClickOpen(service)}>
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
