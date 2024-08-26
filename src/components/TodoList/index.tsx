import React, { useState } from "react";
import TodoItem from "../TodoItem";
import { Button, TextField, Box } from "@mui/material";

interface TodoListProps {
  items: {
    id: number;
    name: string;
    isDone: boolean;
  }[];
  onToggleComplete: (id: number) => void;
  onAddItem: (text: string) => Promise<void>;
  onDeleteItem: (item: { id: number; name: string; isDone: boolean }) => void;
  onEditItem: (item: { id: number; name: string; isDone: boolean }) => void;
}

const TodoListComponent: React.FC<TodoListProps> = ({
  items,
  onToggleComplete,
  onAddItem,
  onDeleteItem,
  onEditItem,
}) => {
  const [newItemText, setNewItemText] = useState("");

  const handleAddItem = async () => {
    if (newItemText.trim() !== "") {
      await onAddItem(newItemText);
    }
  };

  return (
    <Box>
      <Box mb={2} display="flex" alignItems="center">
        <TextField
          type="text"
          value={newItemText}
          onChange={(e) => setNewItemText(e.target.value)}
          placeholder="Novo item"
          size="small"
          variant="outlined"
          fullWidth
          sx={{ mr: 2 }}
        />
        <Button variant="contained" color="primary" onClick={handleAddItem}>
          Adicionar
        </Button>
      </Box>
      <Box>
        {items.map((item) => (
          <TodoItem
            key={item.id}
            name={item.name}
            isDone={item.isDone}
            onToggleComplete={() => onToggleComplete(item.id)}
            onEdit={() => onEditItem(item)}
            onDelete={() => onDeleteItem(item)}
          />
        ))}
      </Box>
    </Box>
  );
};

export default TodoListComponent;
