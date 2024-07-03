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
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  SelectChangeEvent,
} from "@mui/material";
import { SetStateAction, useState } from "react";
import Header from "./Header";
import { ServiceModal } from "./ServiceModal";

const services = [
  {
    id: 1,
    image: "https://picsum.photos/300?random=1",
    title: "Serviço de Limpeza",
    description:
      "Profissionais qualificados para realizar a limpeza de residências e escritórios.",
    provider: "Ana Paula Silva",
    category: "Limpeza",
  },
  {
    id: 2,
    image: "https://picsum.photos/300?random=2",
    title: "Almoxarife",
    description: "Gerenciamento de estoques e organização de almoxarifados.",
    provider: "Carlos Alberto Pereira",
    category: "Logística",
  },
  {
    id: 3,
    image: "https://picsum.photos/300?random=3",
    title: "Fotógrafo",
    description:
      "Serviços de fotografia para eventos, ensaios fotográficos e comerciais.",
    provider: "Mariana Rocha",
    category: "Fotografia",
  },
  {
    id: 4,
    image: "https://picsum.photos/300?random=4",
    title: "Babá",
    description: "Cuidados infantis profissionais para bebês e crianças.",
    provider: "Juliana Costa",
    category: "Cuidados Infantis",
  },
  {
    id: 5,
    image: "https://picsum.photos/300?random=5",
    title: "Personal Trainer",
    description:
      "Acompanhamento personalizado para treinos e atividades físicas.",
    provider: "Roberto Martins",
    category: "Fitness",
  },
  {
    id: 6,
    image: "https://picsum.photos/300?random=6",
    title: "Jardineiro",
    description: "Serviços de jardinagem para manutenção e criação de jardins.",
    provider: "Pedro Santos",
    category: "Jardinagem",
  },
  {
    id: 7,
    image: "https://picsum.photos/300?random=7",
    title: "Pintor",
    description: "Pintura residencial e comercial com acabamento profissional.",
    provider: "Ricardo Lima",
    category: "Construção",
  },
  {
    id: 8,
    image: "https://picsum.photos/300?random=8",
    title: "Eletricista",
    description:
      "Instalações e reparos elétricos realizados por profissionais certificados.",
    provider: "Fernando Alves",
    category: "Manutenção",
  },
  {
    id: 9,
    image: "https://picsum.photos/300?random=9",
    title: "Encanador",
    description: "Serviços de encanamento para instalações e consertos.",
    provider: "André Souza",
    category: "Manutenção",
  },
  {
    id: 10,
    image: "https://picsum.photos/300?random=10",
    title: "Mecânico",
    description: "Reparos e manutenção de veículos com garantia de qualidade.",
    provider: "João Mendes",
    category: "Automotivo",
  },
  {
    id: 11,
    image: "https://picsum.photos/300?random=11",
    title: "Cabeleireiro",
    description: "Cortes de cabelo, penteados e tratamentos capilares.",
    provider: "Isabela Ferreira",
    category: "Beleza",
  },
  {
    id: 12,
    image: "https://picsum.photos/300?random=12",
    title: "Manicure",
    description:
      "Serviços de manicure e pedicure para cuidados e estética das unhas.",
    provider: "Tatiana Oliveira",
    category: "Beleza",
  },
  {
    id: 13,
    image: "https://picsum.photos/300?random=13",
    title: "Chef de Cozinha",
    description:
      "Preparação de refeições personalizadas e eventos gastronômicos.",
    provider: "Gustavo Ramos",
    category: "Gastronomia",
  },
  {
    id: 14,
    image: "https://picsum.photos/300?random=14",
    title: "Técnico de Informática",
    description: "Suporte técnico e manutenção de computadores e redes.",
    provider: "Lucas Figueiredo",
    category: "Tecnologia",
  },
  {
    id: 15,
    image: "https://picsum.photos/300?random=15",
    title: "Designer Gráfico",
    description:
      "Criação de artes visuais, logotipos e materiais publicitários.",
    provider: "Daniela Vieira",
    category: "Design",
  },
];

const categories = [
  "Limpeza",
  "Logística",
  "Fotografia",
  "Cuidados Infantis",
  "Fitness",
  "Jardinagem",
  "Construção",
  "Manutenção",
  "Automotivo",
  "Beleza",
  "Gastronomia",
  "Tecnologia",
  "Design",
];

export const ServiceList = () => {
  const [open, setOpen] = useState(false);
  const [selectedService, setSelectedService] = useState<{
    id: number;
    image: string;
    title: string;
    description: string;
    provider?: string;
    category?: string;
  } | null>(null);

  const handleClickOpen = (
    service: SetStateAction<{
      id: number;
      image: string;
      title: string;
      description: string;
      provider?: string;
      category?: string;
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
  const [selectedCategory, setSelectedCategory] = useState("");

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const handleCategoryChange = (event: SelectChangeEvent<string>) => {
    setSelectedCategory(event.target.value as string);
  };

  const filteredServices = services.filter((service) => {
    const titleMatch = service.title
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const descriptionMatch = service.description
      ?.toLowerCase()
      .includes(searchTerm.toLowerCase());
    const categoryMatch = selectedCategory
      ? service.category === selectedCategory
      : true;

    return (titleMatch || descriptionMatch) && categoryMatch;
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
                    marginRight: "2rem",
                  }}
                  value={searchTerm}
                  onChange={handleSearchChange}
                />
                <FormControl
                  variant="outlined"
                  sx={{
                    minWidth: 200,
                    borderRadius: 20,
                    marginTop: 4,
                    marginBottom: 4,
                  }}
                >
                  <InputLabel>Categoria</InputLabel>
                  <Select
                    value={selectedCategory}
                    onChange={handleCategoryChange}
                  >
                    <MenuItem value="">
                      <em>Todas</em>
                    </MenuItem>
                    {categories.map((category) => (
                      <MenuItem key={category} value={category}>
                        {category}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
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
