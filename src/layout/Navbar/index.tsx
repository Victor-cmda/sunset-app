import React, { useState } from "react";
import {
  AppBar,
  Box,
  Button,
  IconButton,
  Drawer,
  Toolbar,
  Typography,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Divider,
} from "@mui/material";
import {
  LocalLibraryOutlined,
  MenuOutlined,
  TaskAltOutlined,
  WindowOutlined,
} from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

const NavBar: React.FC = () => {
  const [anchorNav, setAnchorNav] = useState<HTMLElement | null>(null);
  const navigate = useNavigate();

  const menuItems = [
    { text: "Página Inicial", icon: <WindowOutlined />, path: "/" },
    { text: "Tarefas", icon: <TaskAltOutlined />, path: "/todos" },
  ];

  const handleNavigate = (path: string) => {
    navigate(path);
    closeMenu();
  };

  const openMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorNav(event.currentTarget);
  };

  const closeMenu = () => {
    setAnchorNav(null);
  };

  return (
    <AppBar position="sticky">
      <Toolbar>
        <IconButton
          size="large"
          edge="start"
          color="inherit"
          aria-label="logo"
          sx={{ display: { xs: "none", md: "flex" }, mr: 1 }}
        >
          <LocalLibraryOutlined />
        </IconButton>
        <Typography
          variant="h6"
          component="div"
          sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}
        >
          Sunset To-do
        </Typography>
        <Box sx={{ display: { xs: "none", md: "flex" } }}>
          {menuItems.map((item) => (
            <Button
              key={item.text}
              color="inherit"
              sx={{ my: 2, color: "white", display: "block" }}
              onClick={() => handleNavigate(item.path)}
            >
              {item.text}
            </Button>
          ))}
        </Box>
        <Box sx={{ display: { xs: "flex", md: "none" } }}>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            onClick={openMenu}
          >
            <MenuOutlined />
          </IconButton>
          <Drawer anchor="left" open={Boolean(anchorNav)} onClose={closeMenu}>
            <Typography variant="h5" component="h2" sx={{ padding: 2 }}>
              To-Do Lists
            </Typography>
            <Divider />
            <List sx={{ width: 230 }}>
              {menuItems.map((item) => (
                <ListItem key={item.text} disablePadding>
                  <ListItemButton onClick={() => handleNavigate(item.path)}>
                    <ListItemIcon>{item.icon}</ListItemIcon>
                    <ListItemText primary={item.text} />
                  </ListItemButton>
                </ListItem>
              ))}
            </List>
          </Drawer>
        </Box>
        <IconButton
          size="large"
          edge="end"
          color="inherit"
          aria-label="logo"
          sx={{ display: { xs: "flex", md: "none" }, mr: 1 }}
        >
          <LocalLibraryOutlined />
        </IconButton>
        <Typography
          variant="h6"
          component="div"
          sx={{ display: { xs: "flex", md: "none" } }}
        >
          Sunset To-do
        </Typography>
      </Toolbar>
    </AppBar>
  );
};

export default NavBar;
