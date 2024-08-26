import React, { useState } from "react";
import {
  Drawer,
  List,
  ListItem,
  ListItemText,
  Typography,
  IconButton,
  Divider,
  Box,
  ListItemIcon,
} from "@mui/material";
import {
  Add,
  Delete,
  Edit,
  EventNote,
  MenuOutlined,
} from "@mui/icons-material";

interface PermanentDrawerLeftProps {
  todoLists: { id: number; name: string; color: string }[];
  selectedListId: number;
  onSelectList: (id: number) => void;
  onAddListClick: () => void;
  onDeleteListClick: (id: number) => void;
  onEditListClick: (id: number) => void;
}

const drawerWidth = 240;

function getContrastYIQ(hexcolor: string) {
  hexcolor = hexcolor.replace("#", "");
  const r = parseInt(hexcolor.substring(0, 2), 16);
  const g = parseInt(hexcolor.substring(2, 4), 16);
  const b = parseInt(hexcolor.substring(4, 6), 16);
  const yiq = (r * 299 + g * 587 + b * 114) / 1000;
  return yiq >= 128 ? "black" : "white";
}

const PermanentDrawerLeft: React.FC<PermanentDrawerLeftProps> = ({
  todoLists,
  selectedListId,
  onSelectList,
  onAddListClick,
  onDeleteListClick,
  onEditListClick,
}) => {
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawerContent = (
    <Box sx={{ mt: { md: "75px", xs: 0 } }}>
      <Typography variant="h5" component="h2" sx={{ padding: 2 }}>
        To-Do Lists
      </Typography>
      <Divider />
      <List>
        <ListItem button color="primary" onClick={onAddListClick}>
          <ListItemIcon>
            <Add />
          </ListItemIcon>
          <ListItemText primary="Adicionar" />
        </ListItem>
        {todoLists.map((list) => {
          const textColor = getContrastYIQ(list.color);

          return (
            <ListItem
              button
              key={list.id}
              selected={list.id === selectedListId}
              onClick={() => onSelectList(list.id)}
              sx={{
                backgroundColor: list.color,
                color: textColor,
                "& .MuiListItemText-root": {
                  color: textColor,
                },
                "&.Mui-selected": {
                  backgroundColor: list.color,
                  opacity: 0.8,
                },
                "&:hover": {
                  backgroundColor: list.color,
                  opacity: 0.7,
                },
              }}
            >
              <ListItemIcon>
                <EventNote sx={{ color: textColor }} />
              </ListItemIcon>
              <ListItemText primary={list.name} sx={{ fontWeight: "bold" }} />
              <IconButton
                edge="end"
                aria-label="edit"
                onClick={(e) => {
                  e.stopPropagation();
                  onEditListClick(list.id);
                }}
              >
                <Edit sx={{ color: textColor }} />
              </IconButton>
              <IconButton
                edge="end"
                aria-label="delete"
                sx={{ color: textColor }}
                onClick={(e) => {
                  e.stopPropagation();
                  onDeleteListClick(list.id);
                }}
              >
                <Delete />
              </IconButton>
            </ListItem>
          );
        })}
      </List>
    </Box>
  );

  return (
    <Box
      component="nav"
      sx={{ width: { md: drawerWidth }, flexShrink: { md: 0 } }}
    >
      <IconButton
        color="inherit"
        aria-label="open drawer"
        edge="start"
        onClick={handleDrawerToggle}
        sx={{ display: { md: "none" }, ml: 2, mt: 1 }}
      >
        <MenuOutlined />
      </IconButton>
      <Drawer
        variant="permanent"
        sx={{
          display: { xs: "none", md: "block", position: "sticky", mt: 600 },
          "& .MuiDrawer-paper": { boxSizing: "border-box", width: drawerWidth },
        }}
        open
      >
        {drawerContent}
      </Drawer>
      <Drawer
        variant="temporary"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{
          keepMounted: true,
        }}
        sx={{
          display: { xs: "block", md: "none" },
          "& .MuiDrawer-paper": { boxSizing: "border-box", width: drawerWidth },
        }}
      >
        {drawerContent}
      </Drawer>
    </Box>
  );
};

export default PermanentDrawerLeft;
