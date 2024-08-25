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
} from "@mui/material";
import { MenuOutlined } from "@mui/icons-material";

interface PermanentDrawerLeftProps {
  todoLists: { id: number; title: string }[];
  selectedListId: number;
  onSelectList: (id: number) => void;
}

const drawerWidth = 240;

const PermanentDrawerLeft: React.FC<PermanentDrawerLeftProps> = ({
  todoLists,
  selectedListId,
  onSelectList,
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
        {todoLists.map((list) => (
          <ListItem
            button
            key={list.id}
            selected={list.id === selectedListId}
            onClick={() => onSelectList(list.id)}
          >
            <ListItemText primary={list.title} />
          </ListItem>
        ))}
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
