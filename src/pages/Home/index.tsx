import { ContactMail, Home, Info } from "@mui/icons-material";
import {
  Avatar,
  Box,
  Container,
  Grid,
  IconButton,
  Paper,
  Typography,
} from "@mui/material";

function HomePage() {
  return (
    <div>
      <Box
        sx={{
          bgcolor: "primary.main",
          color: "#fff",
          py: 8,
          textAlign: "center",
        }}
      >
        <Container maxWidth="md">
          <Typography variant="h2" component="h1" gutterBottom>
            Bem vindo ao Sunset to-do
          </Typography>
          <Typography variant="h5" component="p" gutterBottom>
            Com este sistema, você pode organizar suas tarefas de forma
            eficiente, criar listas personalizadas e acompanhar o progresso das
            suas atividades diárias. Seja para uso pessoal ou profissional, o
            Sunset To-Do foi criado para ajudar você a manter tudo sob controle.
          </Typography>
        </Container>
      </Box>

      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Grid container spacing={4}>
          <Grid item xs={12} md={4}>
            <Paper sx={{ p: 4, textAlign: "center" }}>
              <IconButton>
                <Avatar sx={{ bgcolor: "primary.main" }}>
                  <Home />
                </Avatar>
              </IconButton>
              <Typography variant="h5" component="h3" sx={{ mt: 2 }}>
                Página Inicial
              </Typography>
              <Typography variant="body1">
                Essa é a página inicial do sistema, onde você pode visualizar
              </Typography>
            </Paper>
          </Grid>
          <Grid item xs={12} md={4}>
            <Paper sx={{ p: 4, textAlign: "center" }}>
              <IconButton>
                <Avatar sx={{ bgcolor: "primary.main" }}>
                  <Info />
                </Avatar>
              </IconButton>
              <Typography variant="h5" component="h3" sx={{ mt: 2 }}>
                Atividades
              </Typography>
              <Typography variant="body1">
                Cadastre suas atividades e acompanhe o progresso de cada uma
              </Typography>
            </Paper>
          </Grid>
          <Grid item xs={12} md={4}>
            <Paper sx={{ p: 4, textAlign: "center" }}>
              <IconButton>
                <Avatar sx={{ bgcolor: "primary.main" }}>
                  <ContactMail />
                </Avatar>
              </IconButton>
              <Typography variant="h5" component="h3" sx={{ mt: 2 }}>
                Sobre
              </Typography>
              <Typography variant="body1">
                Saiba mais sobre o sistema e sua funcionalidade
              </Typography>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
}

export default HomePage;
