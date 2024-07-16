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
import { SetStateAction, useState, useEffect } from "react";
import Header from "./Header";
import { ServiceModal } from "./ServiceModal";
import { getAllServices } from "../api/api";

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

const cities = [
  "São Paulo",
  "Rio de Janeiro",
  "Belo Horizonte",
  "Curitiba",
  "Porto Alegre",
  "Salvador",
  "Brasília",
  "Fortaleza",
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
    locationCity?: string;
  } | null>(null);
  const [userType, setUserType] = useState<string | null>(null);
  const [services, setServices] = useState<any[]>([]);

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

    const fetchServices = async () => {
      try {
        const data = await getAllServices();
        setServices(data);
        console.log(data);
      } catch (error) {
        console.error("Failed to fetch services:", error);
      }
    };

    fetchServices();
  }, []);

  const handleClickOpen = (
    service: SetStateAction<{
      id: number;
      image: string;
      title: string;
      description: string;
      provider?: string;
      category?: string;
      locationCity?: string;
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
  const [selectedCity, setSelectedCity] = useState("");

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const handleCategoryChange = (event: SelectChangeEvent<string>) => {
    setSelectedCategory(event.target.value as string);
  };

  const handleCityChange = (event: SelectChangeEvent<string>) => {
    setSelectedCity(event.target.value as string);
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
    const cityMatch = selectedCity
      ? service.locationCity === selectedCity
      : true;

    return (titleMatch || descriptionMatch) && categoryMatch && cityMatch;
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
                    marginRight: 2,
                  }}
                >
                  <InputLabel>Categoria</InputLabel>
                  <Select
                    value={selectedCategory}
                    onChange={handleCategoryChange}
                    inputProps={{ "data-testid": "category-select" }}
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
                <FormControl
                  variant="outlined"
                  sx={{
                    minWidth: 200,
                    borderRadius: 20,
                    marginTop: 4,
                    marginBottom: 4,
                  }}
                >
                  <InputLabel>Cidade</InputLabel>
                  <Select
                    value={selectedCity}
                    onChange={handleCityChange}
                    inputProps={{ "data-testid": "city-select" }}
                  >
                    <MenuItem value="">
                      <em>Todas</em>
                    </MenuItem>
                    {cities.map((city) => (
                      <MenuItem key={city} value={city}>
                        {city}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Box>
            </Grid>
            <Grid item>
              {userType === "ServiceProvider" && (
                <Button
                  variant="contained"
                  color="primary"
                  sx={{
                    borderRadius: 20,
                  }}
                  href="/account"
                >
                  Anunciar Serviço
                </Button>
              )}
            </Grid>
            <Grid item>
              <Header />
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
      <Grid container spacing={4} sx={{ mt: 12 }}>
        {filteredServices.map((service) => (
          <Grid
            item
            key={service.id}
            xs={12}
            sm={6}
            md={3}
            data-testid="service-card"
          >
            <Card
              onClick={() => handleClickOpen(service)}
              sx={{ cursor: "pointer" }}
            >
              <CardMedia
                component="img"
                alt={service.title}
                height="140"
                image="https://via.placeholder.com/350"
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
