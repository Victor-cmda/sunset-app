import React, { useState, useEffect } from "react";
import {
  Container,
  Typography,
  Box,
  Button,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import PermanentDrawerLeft from "../../components/PermanentDrawerLeft";
import {
  getTodoLists,
  updateTodoItem,
  addTodoItem,
  deleteTodoItem,
  addTodoList,
  deleteTodoList,
  updateTodoList,
} from "../../services/apiService";
import TodoListComponent from "../../components/TodoList";

interface ITodoList {
  id: number;
  name: string;
  color: string;
  items: ITodoItem[];
}

interface ITodoItem {
  id: number;
  name: string;
  isDone: boolean;
  listId: number;
}

const TodoPage: React.FC = () => {
  const [todoLists, setTodoLists] = useState<ITodoList[]>([]);
  const [selectedListId, setSelectedListId] = useState<number | null>(null);

  const [openListDialog, setOpenListDialog] = useState(false);
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [editingListId, setEditingListId] = useState<number | null>(null);
  const [newListTitle, setNewListTitle] = useState("");
  const [newListColor, setNewListColor] = useState("#ffffff");

  const [openConfirmDialog, setOpenConfirmDialog] = useState(false);
  const [listToDelete, setListToDelete] = useState<number | null>(null);

  const [openEditItemDialog, setOpenEditItemDialog] = useState(false);
  const [itemToEdit, setItemToEdit] = useState<{
    id: number;
    name: string;
    isDone: boolean;
  } | null>(null);
  const [newItemName, setNewItemName] = useState("");

  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [itemToDelete, setItemToDelete] = useState<{
    id: number;
    name: string;
    isDone: boolean;
  } | null>(null);

  useEffect(() => {
    const fetchTodoLists = async () => {
      try {
        const lists = await getTodoLists();
        setTodoLists(lists);
        if (lists.length > 0) {
          setSelectedListId(lists[0].id);
        }
      } catch (error) {
        console.error("Erro ao buscar listas de tarefas:", error);
      }
    };

    fetchTodoLists();
  }, []);

  const selectedList = todoLists.find((list) => list.id === selectedListId);

  const handleEditListClick = (id: number) => {
    const listToEdit = todoLists.find((list) => list.id === id);
    if (listToEdit) {
      setEditingListId(id);
      setNewListTitle(listToEdit.name);
      setNewListColor(listToEdit.color);
      setOpenEditDialog(true);
    }
  };

  const handleSaveListChanges = async () => {
    if (editingListId !== null) {
      await updateTodoList(editingListId, newListTitle, newListColor);
      const updatedLists = todoLists.map((list) =>
        list.id === editingListId
          ? { ...list, name: newListTitle, color: newListColor }
          : list
      );
      setTodoLists(updatedLists);
      setOpenEditDialog(false);
    }
  };

  const handleToggleComplete = async (itemId: number) => {
    try {
      const updatedItem = selectedList?.items.find(
        (item) => item.id === itemId
      );
      if (updatedItem) {
        await updateTodoItem(itemId, {
          name: updatedItem.name,
          isDone: !updatedItem.isDone,
        });
        setTodoLists((prevLists) =>
          prevLists.map((list) =>
            list.id === selectedList?.id
              ? {
                  ...list,
                  items: list.items.map((item) =>
                    item.id === itemId
                      ? { ...item, isDone: !item.isDone }
                      : item
                  ),
                }
              : list
          )
        );
      }
    } catch (error) {
      console.error("Erro ao atualizar item:", error);
    }
  };

  const handleAddTodoItem = async (itemText: string) => {
    if (selectedList) {
      try {
        const newItem = {
          name: itemText,
          isDone: false,
          listId: selectedList.id,
        };
        await addTodoItem(newItem.listId, newItem);
        const updatedLists = await getTodoLists();
        setTodoLists(updatedLists);
      } catch (error) {
        console.error("Erro ao adicionar item à lista de tarefas:", error);
      }
    }
  };

  const handleDeleteTodoItem = async (itemId: number) => {
    try {
      await deleteTodoItem(itemId);
      const updatedLists = await getTodoLists();
      setTodoLists(updatedLists);
    } catch (error) {
      console.error("Erro ao deletar item da lista de tarefas:", error);
    }
  };

  const handleEditTodoItem = async (itemId: number, newName: string) => {
    try {
      const updatedItem = selectedList?.items.find(
        (item) => item.id === itemId
      );
      if (updatedItem) {
        await updateTodoItem(itemId, {
          name: newName,
          isDone: updatedItem.isDone,
          listId: updatedItem.listId,
        });
        const updatedLists = await getTodoLists();
        setTodoLists(updatedLists);
      }
    } catch (error) {
      console.error("Erro ao editar item:", error);
    }
  };

  const handleAddTodoList = async () => {
    try {
      await addTodoList(newListTitle, newListColor);
      const newLists = await getTodoLists();
      setTodoLists(newLists);
      if (newLists.length > 0) {
        setSelectedListId(newLists[0].id);
      }
      setNewListTitle("");
      setNewListColor("#ffffff");

      setOpenListDialog(false);
    } catch (error) {
      console.error("Erro ao adicionar lista de tarefas:", error);
    }
  };

  const handleOpenConfirmDialog = (id: number) => {
    setListToDelete(id);
    setOpenConfirmDialog(true);
  };

  const handleConfirmDelete = async () => {
    if (listToDelete !== null) {
      await handleDeleteList(listToDelete);
      setOpenConfirmDialog(false);
      setListToDelete(null);
    }
  };

  const handleDeleteList = async (id: number) => {
    try {
      await deleteTodoList(id);
      const newLists = await getTodoLists();
      setTodoLists(newLists);
      if (newLists.length > 0) {
        setSelectedListId(newLists[0].id);
      } else {
        setSelectedListId(null);
      }
    } catch (error) {
      console.error("Erro ao deletar lista de tarefas:", error);
    }
  };

  const handleOpenEditDialog = (item: {
    id: number;
    name: string;
    isDone: boolean;
  }) => {
    setItemToEdit(item);
    setNewItemName(item.name);
    setOpenEditItemDialog(true);
  };

  const handleSaveItemChanges = async () => {
    if (itemToEdit) {
      await handleEditTodoItem(itemToEdit.id, newItemName);
      setOpenEditItemDialog(false);
      setItemToEdit(null);
    }
  };

  const handleOpenDeleteDialog = (item: {
    id: number;
    name: string;
    isDone: boolean;
  }) => {
    setItemToDelete(item);
    setOpenDeleteDialog(true);
  };

  const handleConfirmDeleteItem = async () => {
    if (itemToDelete) {
      await handleDeleteTodoItem(itemToDelete.id);
      setOpenDeleteDialog(false);
      setItemToDelete(null);
    }
  };

  return (
    <Box sx={{ display: "flex" }}>
      <PermanentDrawerLeft
        todoLists={todoLists.map((list) => ({
          id: list.id,
          name: list.name,
          color: list.color,
        }))}
        selectedListId={selectedListId ?? -1}
        onSelectList={setSelectedListId}
        onAddListClick={() => setOpenListDialog(true)}
        onDeleteListClick={handleOpenConfirmDialog}
        onEditListClick={handleEditListClick}
      />
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Container maxWidth="md">
          <Typography variant="h3" component="h1" gutterBottom>
            {selectedList?.name || "Minhas Listas"}
          </Typography>
          {selectedList && (
            <TodoListComponent
              items={selectedList.items}
              onToggleComplete={handleToggleComplete}
              onAddItem={handleAddTodoItem}
              onDeleteItem={handleOpenDeleteDialog}
              onEditItem={handleOpenEditDialog}
            />
          )}
        </Container>
      </Box>
      <Dialog open={openListDialog} onClose={() => setOpenListDialog(false)}>
        <DialogTitle>Criar Nova Lista</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Título da Lista"
            type="text"
            fullWidth
            value={newListTitle}
            onChange={(e) => setNewListTitle(e.target.value)}
          />
          <Box sx={{ mt: 2 }}>
            <label htmlFor="list-color-picker">Cor da Lista</label>
            <input
              id="list-color-picker"
              type="color"
              value={newListColor}
              onChange={(e) => setNewListColor(e.target.value)}
              style={{
                width: "100%",
                height: "40px",
                border: "none",
                cursor: "pointer",
                marginTop: "10px",
              }}
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenListDialog(false)} color="primary">
            Cancelar
          </Button>
          <Button onClick={handleAddTodoList} color="primary">
            Criar
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog open={openEditDialog} onClose={() => setOpenEditDialog(false)}>
        <DialogTitle>Editar Lista</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Título da Lista"
            type="text"
            fullWidth
            value={newListTitle}
            onChange={(e) => setNewListTitle(e.target.value)}
          />
          <TextField
            margin="dense"
            label="Cor da Lista"
            type="color"
            fullWidth
            value={newListColor}
            onChange={(e) => setNewListColor(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenEditDialog(false)} color="primary">
            Cancelar
          </Button>
          <Button onClick={handleSaveListChanges} color="primary">
            Salvar
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog
        open={openConfirmDialog}
        onClose={() => setOpenConfirmDialog(false)}
      >
        <DialogTitle>Confirmar Exclusão</DialogTitle>
        <DialogContent>
          <Typography>
            Tem certeza de que deseja deletar esta lista? Esta ação não pode ser
            desfeita.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenConfirmDialog(false)} color="primary">
            Cancelar
          </Button>
          <Button onClick={handleConfirmDelete} color="primary">
            Confirmar
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog
        open={openEditItemDialog}
        onClose={() => setOpenEditDialog(false)}
      >
        <DialogTitle>Editar Item</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Nome do Item"
            type="text"
            fullWidth
            value={newItemName}
            onChange={(e) => setNewItemName(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenEditDialog(false)} color="primary">
            Cancelar
          </Button>
          <Button onClick={handleSaveItemChanges} color="primary">
            Salvar
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog
        open={openDeleteDialog}
        onClose={() => setOpenDeleteDialog(false)}
      >
        <DialogTitle>Confirmar Exclusão</DialogTitle>
        <DialogContent>
          <Typography>Tem certeza de que deseja excluir este item?</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDeleteDialog(false)} color="primary">
            Cancelar
          </Button>
          <Button onClick={handleConfirmDeleteItem} color="primary">
            Excluir
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default TodoPage;
