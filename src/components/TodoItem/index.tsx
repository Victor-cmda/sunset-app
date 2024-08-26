import React from "react";
import {
  Card,
  CardContent,
  Checkbox,
  IconButton,
  Typography,
  Box,
} from "@mui/material";
import { Event, Notifications, Loop } from "@mui/icons-material";

interface TodoItemProps {
  name: string;
  isDone: boolean;
  onToggleComplete: () => void;
}

const TodoItem: React.FC<TodoItemProps> = ({
  name,
  isDone,
  onToggleComplete,
}) => {
  return (
    <Card sx={{ mb: 2 }}>
      <CardContent sx={{ display: "flex", alignItems: "center" }}>
        <Checkbox
          checked={isDone}
          onChange={onToggleComplete}
          sx={{ color: isDone ? "primary.main" : "default" }}
        />
        <Box sx={{ flexGrow: 1 }}>
          <Typography
            variant="body1"
            sx={{ textDecoration: isDone ? "line-through" : "none" }}
          >
            {name}
          </Typography>
          <Box sx={{ display: "flex", gap: 1, mt: 1 }}>
            <IconButton>
              <Event fontSize="small" />
            </IconButton>
            <IconButton>
              <Notifications fontSize="small" />
            </IconButton>
            <IconButton>
              <Loop fontSize="small" />
            </IconButton>
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
};

export default TodoItem;
