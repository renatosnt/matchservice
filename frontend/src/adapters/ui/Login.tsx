import EmailIcon from "@mui/icons-material/Email";
import LockIcon from "@mui/icons-material/Lock";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import {
  Alert,
  Box,
  Button,
  Grid,
  IconButton,
  InputAdornment,
  TextField,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../api/api";
import BackgroundImage from "./BackgroundImage";

export const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    // Limpar a mensagem de erro após um tempo
    if (error) {
      const timeoutId = setTimeout(() => setError(""), 3000);
      return () => clearTimeout(timeoutId);
    }
  }, [error]);

  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>,
  ) => {
    event.preventDefault();
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      const response = await loginUser({ userEmail: email, password });
      console.log(response);
      if (response.status === 201) {
        localStorage.setItem("user", JSON.stringify(response.data));
        navigate("/services");
      } else {
        setError("Wrong username or password.");
      }
    } catch (error: any) {
      setError("An error occurred. Please try again.");
    }
  };

  return (
    <Grid container sx={{ height: "100vh", overflowY: "auto" }}>
      <BackgroundImage />
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
            data-testid="logo-container"
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
          <Typography
            variant="h5"
            align="center"
            gutterBottom
            data-testid="welcome-title"
          >
            Bem-vindo novamente!
          </Typography>
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
            data-testid="email-input"
          />

          <TextField
            label="Senha"
            type={showPassword ? "text" : "password"}
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
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                    edge="end"
                    data-testid="toggle-password-button"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
            data-testid="password-input"
          />
          {error && (
            <Alert severity="error" sx={{ mt: 2 }} data-testid="error-alert">
              {error}
            </Alert>
          )}

          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            sx={{
              mt: 2,
              textTransform: "none",
              borderRadius: 10,
            }}
            data-testid="login-button"
          >
            Entrar
          </Button>

          <Button
            sx={{
              textTransform: "none",
              color: "gray",
            }}
            data-testid="forgot-password-link"
          >
            Esqueci a senha
          </Button>
        </Box>
      </Grid>
    </Grid>
  );
};
