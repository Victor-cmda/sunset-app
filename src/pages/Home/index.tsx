import { ContactMail, Home, Info } from "@mui/icons-material";
import {
  Avatar,
  Box,
  Button,
  Container,
  Grid,
  IconButton,
  Modal,
  Paper,
  Typography,
} from "@mui/material";
import React from "react";


function HomePage() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
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
            Welcome to My Website
          </Typography>
          <Typography variant="h5" component="p" gutterBottom>
            This is a simple hero unit, a simple jumbotron-style component for
            calling extra attention to featured content or information.
          </Typography>
          <Button
            variant="contained"
            color="secondary"
            size="large"
            sx={{ mt: 4 }}
          >
            Learn More
          </Button>
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
                Home
              </Typography>
              <Typography variant="body1">
                This is the home section, where you can find the latest updates
                and news.
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
                About
              </Typography>
              <Typography variant="body1">
                Learn more about what we do and our mission.
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
                Contact
              </Typography>
              <Typography variant="body1">
                Get in touch with us for more information.
              </Typography>
            </Paper>
          </Grid>
        </Grid>
        <Button onClick={handleOpen}>Open modal</Button>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              Text in a modal
            </Typography>
            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
              Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
            </Typography>
          </Box>
        </Modal>
      </Container>
    </div>
  );
}

export default HomePage;
