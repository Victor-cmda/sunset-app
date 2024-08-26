import React from "react";
import {
  Card,
  CardContent,
  Checkbox,
  Typography,
  Box,
  IconButton,
} from "@mui/material";
import { Edit as EditIcon, Delete as DeleteIcon } from "@mui/icons-material";

interface TodoItemProps {
  name: string;
  isDone: boolean;
  onToggleComplete: () => void;
  onEdit: () => void;
  onDelete: () => void;
}

const TodoItem: React.FC<TodoItemProps> = ({
  name,
  isDone,
  onToggleComplete,
  onEdit,
  onDelete,
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
        </Box>
        <IconButton color="primary" onClick={onEdit} aria-label="edit">
          <EditIcon />
        </IconButton>
        <IconButton color="secondary" onClick={onDelete} aria-label="delete">
          <DeleteIcon />
        </IconButton>
      </CardContent>
    </Card>
  );
};

export default TodoItem;
