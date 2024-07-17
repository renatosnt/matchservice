import EmailIcon from "@mui/icons-material/Email";
import LockIcon from "@mui/icons-material/Lock";
import PersonIcon from "@mui/icons-material/Person";
import {
  Box,
  Button,
  FormControl,
  Grid,
  InputAdornment,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { createProfile, loginUser, registerUser } from "../api/api";
import BackgroundImageRegister from "./BackgroundImageRegister";

export const Register = () => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [type, setType] = useState("Customer");
  const [telephoneNumber, setTelephoneNumber] = useState("");
  const [specialty, setSpecialty] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [validationErrors, setValidationErrors] = useState({
    fullName: "",
    username: "",
    email: "",
    password: "",
    telephoneNumber: "",
    specialty: "",
  });
  const navigate = useNavigate();

  const specialties = [
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

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setError(null);
    setValidationErrors({
      fullName: "",
      username: "",
      email: "",
      password: "",
      telephoneNumber: "",
      specialty: "",
    });

    // Validation logic
    const errors = {
      fullName: "",
      username: "",
      email: "",
      password: "",
      telephoneNumber: "",
      specialty: "",
    };
    let isValid = true;

    if (!fullName) {
      errors.fullName = "Nome Completo não pode estar vazio";
      isValid = false;
    }
    if (username.includes(" ")) {
      errors.username = "Username não deve conter espaços";
      isValid = false;
    }
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/i;
    if (!emailRegex.test(email)) {
      errors.email = "Email inválido";
      isValid = false;
    }
    if (!password) {
      errors.password = "Senha não pode estar vazia";
      isValid = false;
    }
    if (!telephoneNumber) {
      errors.telephoneNumber = "Número de telefone não pode estar vazio";
      isValid = false;
    }
    if (type === "ServiceProvider" && !specialty) {
      errors.specialty = "Especialidade não pode estar vazia";
      isValid = false;
    }

    setValidationErrors(errors);

    if (!isValid) {
      return;
    }

    try {
      const registerResponse = await registerUser({
        username,
        realName: fullName,
        email,
        password,
        type,
      });

      const loginResponse = await loginUser({ userEmail: email, password });

      console.log(loginResponse);
      let profileData = null;
      if (type === "ServiceProvider") {
        const token = loginResponse.data.token;
        console.log({ telephoneNumber, specialty }, token);
        profileData = await createProfile(
          { telephoneNumber, specialty },
          token,
        );
        console.log(profileData);
      }

      toast.success("Registration successful!");
      localStorage.setItem("user", JSON.stringify(loginResponse.data));
      setTimeout(() => {
        navigate("/services");
      }, 2000);
    } catch (err: any) {
      setError(err.message);
      toast.error(err.message);
    }
  };

  return (
    <Grid container sx={{ height: "100vh", overflowY: "auto" }}>
      <ToastContainer />
      <BackgroundImageRegister />
      <Grid
        item
        xs={12}
        sm={8}
        md={6}
        lg={4}
        xl={4}
        container
        justifyContent="center"
        alignItems="center"
        sx={{
          bgcolor: "white",
          p: 4,
          borderRadius: 2,
          boxShadow: 3,
          backgroundColor: "#F2FAFA",
        }}
      >
        <Box
          component="form"
          onSubmit={handleSubmit}
          data-testid="register-form"
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 2,
          }}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <a href="/" style={{ textDecoration: "none" }}>
              <Typography
                variant="h3"
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
          <Typography variant="h5" align="center" gutterBottom>
            Olá!
          </Typography>

          <Typography variant="body1" align="center" gutterBottom>
            Cadastre-se para começar
          </Typography>

          {error && (
            <Typography variant="body2" align="center" color="error">
              {error}
            </Typography>
          )}

          <TextField
            label="Nome Completo"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            fullWidth
            size="small"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <PersonIcon />
                </InputAdornment>
              ),
            }}
            sx={{ background: "white" }}
            error={!!validationErrors.fullName}
            helperText={validationErrors.fullName}
            data-testid="fullName"
          />
          <TextField
            label="Username"
            value={username}
            data-testid="username"
            onChange={(e) => setUsername(e.target.value)}
            fullWidth
            size="small"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <PersonIcon />
                </InputAdornment>
              ),
            }}
            sx={{ background: "white" }}
            error={!!validationErrors.username}
            helperText={validationErrors.username}
          />
          <TextField
            label="E-mail"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            fullWidth
            size="small"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <EmailIcon />
                </InputAdornment>
              ),
            }}
            sx={{ background: "white" }}
            error={!!validationErrors.email}
            helperText={validationErrors.email}
            data-testid="email"
          />

          <TextField
            label="Senha"
            type="password"
            data-testid="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            fullWidth
            size="small"
            sx={{ background: "white" }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <LockIcon />
                </InputAdornment>
              ),
            }}
            error={!!validationErrors.password}
            helperText={validationErrors.password}
          />

          <TextField
            label="Número de Telefone"
            value={telephoneNumber}
            data-testid="telephoneNumber"
            onChange={(e) => setTelephoneNumber(e.target.value)}
            fullWidth
            size="small"
            sx={{ background: "white" }}
            error={!!validationErrors.telephoneNumber}
            helperText={validationErrors.telephoneNumber}
          />

          <FormControl fullWidth size="small" sx={{ background: "white" }}>
            <InputLabel id="account-type-label">Tipo de Conta</InputLabel>
            <Select
              labelId="account-type-label"
              value={type}
              label="Tipo de Conta"
              onChange={(e) => setType(e.target.value as string)}
              inputProps={{ "data-testid": "type" }}
            >
              <MenuItem value="Customer">Cliente</MenuItem>
              <MenuItem value="ServiceProvider">Prestador de Serviço</MenuItem>
            </Select>
          </FormControl>
          {type === "ServiceProvider" && (
            <FormControl fullWidth size="small" sx={{ background: "white" }}>
              <InputLabel id="specialty-label">Especialidade</InputLabel>
              <Select
                labelId="specialty-label"
                value={specialty}
                label="Especialidade"
                onChange={(e) => setSpecialty(e.target.value as string)}
                inputProps={{ "data-testid": "specialty-field" }}
              >
                {specialties.map((spec) => (
                  <MenuItem key={spec} value={spec}>
                    {spec}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          )}

          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            data-testid="registerButton"
            sx={{
              mt: 2,
              textTransform: "none",
              borderRadius: 10,
            }}
          >
            Cadastrar
          </Button>
        </Box>
      </Grid>
    </Grid>
  );
};
