import React, { useState } from "react";
import { Container, Typography, Box } from "@mui/material";
import TodoList from "../../components/TodoList";
import PermanentDrawerLeft from "../../components/PermanentDrawerLeft";

const TodoPage: React.FC = () => {
  const todoLists = [
    {
      id: 1,
      title: "Shopping List",
      items: [
        { id: 1, text: "Buy Milk", completed: false, important: false },
        { id: 2, text: "Buy Eggs", completed: false, important: true },
        { id: 3, text: "Watch A Movie", completed: false, important: false },
      ],
    },
    {
      id: 2,
      title: "Work Tasks",
      items: [
        { id: 4, text: "Email clients", completed: false, important: false },
        { id: 5, text: "Finish report", completed: false, important: false },
        { id: 6, text: "Attend meeting", completed: false, important: true },
      ],
    },
    {
      id: 3,
      title: "Home Chores",
      items: [
        { id: 7, text: "Clean room", completed: false, important: false },
        { id: 8, text: "Wash dishes", completed: false, important: false },
        { id: 9, text: "Laundry", completed: true, important: false },
      ],
    },
  ];

  const [selectedListId, setSelectedListId] = useState<number>(todoLists[0].id);

  const selectedList = todoLists.find((list) => list.id === selectedListId);

  const handleToggleComplete = (itemId: number) => {
    // Lógica para alternar o estado de conclusão do item
    const updatedList = selectedList?.items.map((item) =>
      item.id === itemId ? { ...item, completed: !item.completed } : item
    );
    // Atualize o estado com o novo array atualizado
    setSelectedListId((prev) => prev); // Atualize o estado corretamente
  };

  const handleToggleImportant = (itemId: number) => {
    // Lógica para alternar o estado de importância do item
    const updatedList = selectedList?.items.map((item) =>
      item.id === itemId ? { ...item, important: !item.important } : item
    );
    // Atualize o estado com o novo array atualizado
    setSelectedListId((prev) => prev); // Atualize o estado corretamente
  };

  return (
    <Box sx={{ display: "flex" }}>
      <PermanentDrawerLeft
        todoLists={todoLists.map((list) => ({ id: list.id, title: list.title }))}
        selectedListId={selectedListId}
        onSelectList={setSelectedListId}
      />
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Container maxWidth="md">
          <Typography variant="h3" component="h1" gutterBottom>
            {selectedList?.title}
          </Typography>
          {selectedList && (
            <TodoList
              items={selectedList.items}
              onToggleComplete={handleToggleComplete}
              onToggleImportant={handleToggleImportant}
            />
          )}
        </Container>
      </Box>
    </Box>
  );
};

export default TodoPage;
