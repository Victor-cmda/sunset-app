import { LockOutlined } from "@mui/icons-material";
import {
  Alert,
  Avatar,
  Box,
  Button,
  Container,
  createTheme,
  Grid,
  Slide,
  SlideProps,
  Snackbar,
  Stack,
  TextField,
  ThemeProvider,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../../services/apiService";

const boxstyle = {
  position: "absolute" as const,
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "75%",
  height: "70%",
  bgcolor: "background.paper",
  boxShadow: 24,
};

const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});

export default function Login() {
  const [open, setOpen] = useState(false);
  const vertical = "top";
  const horizontal = "right";
  const navigate = useNavigate();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    try {
      await loginUser({ email, password });
      navigate("/");
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error(error.message);
      }
      setOpen(true);
    }
  };

  const handleClose = (
    _event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  function TransitionLeft(props: SlideProps) {
    return <Slide {...props} direction="left" />;
  }

  return (
    <>
      <Snackbar
        open={open}
        autoHideDuration={3000}
        onClose={handleClose}
        TransitionComponent={TransitionLeft}
        anchorOrigin={{ vertical, horizontal }}
      >
        <Alert onClose={handleClose} severity="warning" sx={{ width: "100%" }}>
          Alerta! Usuário ou senha inválidos.
        </Alert>
      </Snackbar>
      <div
        style={{
          backgroundColor: "#7ac0f8",
          backgroundSize: "cover",
          height: "100vh",
          color: "#f5f5f5",
        }}
      >
        <Box sx={boxstyle}>
          <Grid container>
            <Grid
              sx={{ display: { xs: "none", sm: "none", lg: "flex" } }}
              item
              xs={12}
              sm={12}
              lg={6}
            >
              <Box
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  width: "100vh",
                  marginTop: "40px",
                  marginLeft: "15px",
                  marginRight: "15px",
                  height: "63vh",
                }}
              >
                <img
                  src="./public/login-no-background.png"
                  alt="Login"
                  style={{
                    maxWidth: "100%",
                    maxHeight: "100%",
                    filter: "drop-shadow(10px 10px 30px #000000)",
                  }}
                />
              </Box>
            </Grid>
            <Grid item xs={12} sm={12} lg={6}>
              <Box
                style={{
                  backgroundSize: "cover",
                  height: "70vh",
                  minHeight: "500px",
                  backgroundColor: "#1976d2",
                }}
              >
                <ThemeProvider theme={darkTheme}>
                  <Container>
                    <Box height={50} />
                    <Box
                      sx={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <Avatar sx={{ bgcolor: "#ffffff", mb: 2 }}>
                        <LockOutlined />
                      </Avatar>
                      <Typography component="h1" variant="h4">
                        Acessar Sistema
                      </Typography>
                    </Box>
                    <Box
                      component="form"
                      noValidate
                      onSubmit={handleSubmit}
                      sx={{ mt: 5 }}
                    >
                      <Grid container spacing={3}>
                        <Grid item xs={12} sx={{ ml: "3em", mr: "3em" }}>
                          <TextField
                            required
                            fullWidth
                            id="email"
                            label="E-mail"
                            name="email"
                            autoComplete="email"
                          />
                        </Grid>
                        <Grid item xs={12} sx={{ ml: "3em", mr: "3em" }}>
                          <TextField
                            required
                            fullWidth
                            name="password"
                            label="Senha"
                            type="password"
                            id="password"
                            autoComplete="new-password"
                          />
                        </Grid>
                        <Grid item xs={12} sx={{ ml: "3em", mr: "3em" }}>
                          <Button
                            type="submit"
                            variant="contained"
                            fullWidth
                            size="large"
                            sx={{
                              mt: "10px",
                              mr: "20px",
                              color: "#ffffff",
                              minWidth: "170px",
                            }}
                          >
                            Acessar
                          </Button>
                        </Grid>
                        <Grid item xs={12} sx={{ ml: "3em", mr: "3em" }}>
                          <Stack direction="row" spacing={2}>
                            <Typography
                              variant="body1"
                              component="span"
                              style={{ marginTop: "10px" }}
                            >
                              Não uma tem conta?{" "}
                              <span
                                style={{ color: "#beb4fb", cursor: "pointer" }}
                                onClick={() => {
                                  navigate("/register");
                                }}
                              >
                                Criar uma nova Conta
                              </span>
                            </Typography>
                          </Stack>
                        </Grid>
                      </Grid>
                    </Box>
                  </Container>
                </ThemeProvider>
              </Box>
            </Grid>
          </Grid>
        </Box>
      </div>
    </>
  );
}
