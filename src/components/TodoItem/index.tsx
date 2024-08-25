import React from "react";
import { Card, CardContent, Checkbox, IconButton, Typography, Box } from "@mui/material";
import { Star, StarBorder, Event, Notifications, Loop } from "@mui/icons-material";

interface TodoItemProps {
  text: string;
  completed: boolean;
  important: boolean;
  onToggleComplete: () => void;
  onToggleImportant: () => void;
}

const TodoItem: React.FC<TodoItemProps> = ({
  text,
  completed,
  important,
  onToggleComplete,
  onToggleImportant,
}) => {
  return (
    <Card sx={{ mb: 2 }}>
      <CardContent sx={{ display: "flex", alignItems: "center" }}>
        <Checkbox
          checked={completed}
          onChange={onToggleComplete}
          sx={{ color: completed ? "primary.main" : "default" }}
        />
        <Box sx={{ flexGrow: 1 }}>
          <Typography
            variant="body1"
            sx={{ textDecoration: completed ? "line-through" : "none" }}
          >
            {text}
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
        <IconButton onClick={onToggleImportant}>
          {important ? <Star color="primary" /> : <StarBorder />}
        </IconButton>
      </CardContent>
    </Card>
  );
};

export default TodoItem;
