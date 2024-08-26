import React, { useState, forwardRef } from "react";
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
import axios from "axios";
import { registerUser } from "../../services/apiService";

const Alert = forwardRef<HTMLDivElement, AlertProps>(function Alert(
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
  name: Yup.string()
    .max(100, "O nome deve ter menos de 200 caracteres")
    .required("Informe o nome do usuário"),
  email: Yup.string()
    .email("Informe um endereço de email válido")
    .max(100, "O endereço de email deve ter menos de 200 caracteres")
    .required("Informe um endereço de email"),
  password: Yup.string()
    .min(6, "A senha deve ter no mínimo 6 caracteres")
    .max(50, "A senha deve ter no máximo 50 caracteres")
    .required("Informe uma senha"),
  passwordConfirmation: Yup.string()
    .oneOf([Yup.ref("password")], "As senhas devem coincidir")
    .min(6, "A confirmação de senha deve ter no mínimo 6 caracteres")
    .max(50, "A confirmação de senha deve ter no máximo 50 caracteres")
    .required("Informe a confirmação de senha"),
});

interface RegisterFormValues {
  name: string;
  email: string;
  password: string;
  passwordConfirmation: string;
}

export default function Register() {
  const [open, setOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | string[]>("");
  const vertical = "top";
  const horizontal = "right";
  const navigate = useNavigate();

  const handleSubmit = async (values: RegisterFormValues) => {
    const { name, email, password, passwordConfirmation } = values;
    try {
      await registerUser({ name, email, password, passwordConfirmation });
      navigate("/login");
    } catch (error: unknown) {
      if (axios.isAxiosError(error) && error.response) {
        const apiError = error.response.data as {
          message: string | string[];
          statusCode: number;
        };
        setErrorMessage(apiError.message);
      } else {
        const errorMessage = (error as Error).message;
        setErrorMessage(errorMessage);
      }
      setOpen(true);
    }
  };

  const handleClose = (
    event?: React.SyntheticEvent | Event,
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
          {Array.isArray(errorMessage) ? errorMessage.join(", ") : errorMessage}
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
                        Criar uma nova conta
                      </Typography>
                    </Box>
                    <Formik<RegisterFormValues>
                      initialValues={{
                        name: "",
                        email: "",
                        password: "",
                        passwordConfirmation: "",
                      }}
                      validationSchema={validationSchema}
                      onSubmit={handleSubmit}
                    >
                      {({
                        errors,
                        touched,
                      }: FormikProps<RegisterFormValues>) => (
                        <Form noValidate>
                          <Grid container spacing={1}>
                            <Grid item xs={12} sx={{ ml: "3em", mr: "3em" }}>
                              <Field
                                as={TextField}
                                name="name"
                                label="Nome"
                                fullWidth
                                error={touched.name && Boolean(errors.name)}
                                helperText={touched.name && errors.name}
                              />
                            </Grid>
                            <Grid item xs={12} sx={{ ml: "3em", mr: "3em" }}>
                              <Field
                                as={TextField}
                                name="email"
                                label="E-mail"
                                fullWidth
                                error={touched.email && Boolean(errors.email)}
                                helperText={touched.email && errors.email}
                              />
                            </Grid>
                            <Grid item xs={12} sx={{ ml: "3em", mr: "3em" }}>
                              <Field
                                as={TextField}
                                name="password"
                                label="Senha"
                                type="password"
                                fullWidth
                                error={
                                  touched.password && Boolean(errors.password)
                                }
                                helperText={touched.password && errors.password}
                              />
                            </Grid>
                            <Grid item xs={12} sx={{ ml: "3em", mr: "3em" }}>
                              <Field
                                as={TextField}
                                name="passwordConfirmation"
                                label="Confirmar senha"
                                type="password"
                                fullWidth
                                error={
                                  touched.passwordConfirmation &&
                                  Boolean(errors.passwordConfirmation)
                                }
                                helperText={
                                  touched.passwordConfirmation &&
                                  errors.passwordConfirmation
                                }
                              />
                            </Grid>
                            <Grid item xs={12} sx={{ ml: "3em", mr: "3em" }}>
                              <Button
                                type="submit"
                                variant="contained"
                                fullWidth
                                size="large"
                                sx={{
                                  mt: "15px",
                                  mr: "20px",
                                  color: "#ffffff",
                                  minWidth: "170px",
                                }}
                              >
                                Registrar-se
                              </Button>
                            </Grid>
                            <Grid item xs={12} sx={{ ml: "3em", mr: "3em" }}>
                              <Stack direction="row" spacing={2}>
                                <Typography
                                  variant="body1"
                                  component="span"
                                  style={{ marginTop: "10px" }}
                                >
                                  Já tem um conta?{" "}
                                  <span
                                    style={{
                                      color: "#91b3fa",
                                      cursor: "pointer",
                                    }}
                                    onClick={() => {
                                      navigate("/login");
                                    }}
                                  >
                                    Acessar conta
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
