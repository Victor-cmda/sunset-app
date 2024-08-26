import React, { useState } from "react";
import {
  Box,
  Grid,
  Button,
  TextField,
  Typography,
  Container,
  Avatar,
  Snackbar,
  Stack,
  createTheme,
  ThemeProvider,
} from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { useNavigate } from "react-router-dom";
import MuiAlert, { AlertProps } from "@mui/material/Alert";
import { Formik, Form, Field, FormikProps } from "formik";
import * as Yup from "yup";
import { loginUser } from "../../services/apiService";

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});

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

const validationSchema = Yup.object({
  email: Yup.string()
    .email('Informe um endereço de email válido')
    .required('Informe um endereço de email'),
  password: Yup.string()
    .min(6, 'A senha deve ter no mínimo 6 caracteres')
    .required('Informe a senha'),
});

interface LoginFormValues {
  email: string;
  password: string;
}

export default function Login() {
  const [open, setOpen] = useState(false);
  const vertical = "top";
  const horizontal = "right";
  const navigate = useNavigate();

  const handleSubmit = async (values: LoginFormValues) => {
    const { email, password } = values;

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

  return (
    <>
      <Snackbar
        open={open}
        autoHideDuration={3000}
        onClose={handleClose}
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
                        <LockOutlinedIcon />
                      </Avatar>
                      <Typography component="h1" variant="h4">
                        Acessar Sistema
                      </Typography>
                    </Box>
                    <Formik<LoginFormValues>
                      initialValues={{ email: "", password: "" }}
                      validationSchema={validationSchema}
                      onSubmit={handleSubmit}
                    >
                      {({
                        errors,
                        touched,
                      }: FormikProps<LoginFormValues>) => (
                        <Form noValidate>
                          <Grid container spacing={3}>
                            <Grid item xs={12} sx={{ ml: "3em", mr: "3em" }}>
                              <Field
                                as={TextField}
                                required
                                fullWidth
                                id="email"
                                label="E-mail"
                                name="email"
                                autoComplete="email"
                                error={touched.email && Boolean(errors.email)}
                                helperText={touched.email && errors.email}
                              />
                            </Grid>
                            <Grid item xs={12} sx={{ ml: "3em", mr: "3em" }}>
                              <Field
                                as={TextField}
                                required
                                fullWidth
                                name="password"
                                label="Senha"
                                type="password"
                                id="password"
                                autoComplete="new-password"
                                error={
                                  touched.password && Boolean(errors.password)
                                }
                                helperText={touched.password && errors.password}
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
                                  Não tem uma conta?{" "}
                                  <span
                                    style={{
                                      color: "#beb4fb",
                                      cursor: "pointer",
                                    }}
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
                        </Form>
                      )}
                    </Formik>
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
