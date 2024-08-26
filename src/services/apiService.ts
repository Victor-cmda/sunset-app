import axios, { AxiosInstance, AxiosResponse } from "axios";

const apiClient: AxiosInstance = axios.create({
  baseURL: "http://localhost:3000",
  headers: {
    "Content-Type": "application/json",
  },
});

apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default apiClient;

interface RegisterData {
  name: string;
  email: string;
  password: string;
  passwordConfirmation: string;
}

interface LoginData {
  email: string;
  password: string;
}

interface TodoList {
  id: number;
  name: string;
  color: string;
  items: TodoItem[];
}

interface TodoItem {
  id: number;
  name: string;
  isDone: boolean;
  listId: number;
}

interface User {
  id: number;
  username: string;
  email: string;
}

const registerUser = async (data: RegisterData): Promise<string> => {
  try {
    const response: AxiosResponse = await apiClient.post(
      "/auth/register",
      data
    );
    if (response.status === 201) {
      return "Usuário criado com sucesso";
    }
    throw new Error("Erro desconhecido durante o registro");
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      if (error.response?.status === 400) {
        throw new Error("Erro ao adicionar novo usuário");
      }
    }
    throw new Error("Erro ao registrar usuário");
  }
};

const loginUser = async (data: LoginData): Promise<string> => {
  try {
    const response: AxiosResponse = await apiClient.post("/auth/login", data);
    localStorage.setItem("token", response.data.access_token);
    localStorage.setItem("userId", response.data.user_id);
    return "Usuário logado com sucesso";
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      if (error.response?.status === 400) {
        throw new Error("Erro ao realizar login");
      }
      if (error.response?.status === 404) {
        throw new Error("Usuário não encontrado e/ou senha incorreta");
      }
    }
    throw new Error("Erro ao realizar login");
  }
};

const addTodoList = async (name: string, color: string): Promise<string> => {
  try {
    const userId = localStorage.getItem("userId");
    const response: AxiosResponse = await apiClient.post("/api/todos/list", {
      name,
      color,
      userId,
    });
    return `Lista de tarefas criada com sucesso, ID: ${response.data.id}`;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      if (error.response?.status === 400) {
        throw new Error("Parâmetros inválidos");
      }
    }
    throw new Error("Erro ao criar lista de tarefas");
  }
};

const getTodoLists = async (): Promise<TodoList[]> => {
  try {
    const userId = localStorage.getItem("userId");
    const response: AxiosResponse = await apiClient.get(
      `/api/todos/lists/${userId}`
    );
    return response.data;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      if (error.response?.status === 400) {
        throw new Error("Erro ao buscar listas de tarefas");
      }
      if (error.response?.status === 404) {
        throw new Error("Nenhuma lista de tarefas encontrada");
      }
    }
    throw new Error("Erro ao buscar listas de tarefas");
  }
};

const updateTodoList = async (
  id: number,
  name: string,
  color: string
): Promise<string> => {
  try {
    const response: AxiosResponse = await apiClient.put(
      `/api/todos/list/${id}`,
      { name, color }
    );
    return `Lista de tarefas atualizada, resposta API: ${response.data}`;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      if (error.response?.status === 404) {
        throw new Error(
          "Nenhuma lista de tarefas encontrada com o ID informado"
        );
      }
    }
    throw new Error("Erro ao atualizar lista de tarefas");
  }
};

const deleteTodoList = async (id: number): Promise<string> => {
  try {
    const response: AxiosResponse = await apiClient.delete(
      `/api/todos/list/${id}`
    );
    return `Lista de tarefas deletada com sucesso, resposta API: ${response.data}`;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      if (error.response?.status === 404) {
        throw new Error(
          "Nenhuma lista de tarefas encontrada com o ID informado"
        );
      }
    }
    throw new Error("Erro ao deletar lista de tarefas");
  }
};

const addTodoItem = async (
  listId: number,
  item: { name: string; isDone: boolean }
): Promise<string> => {
  try {
    const response: AxiosResponse = await apiClient.post(
      `/api/todos/item/${listId}`,
      { name: item.name, isDone: item.isDone }
    );
    return `Item adicionado com sucesso {ID: ${response.data.id}}`;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      if (error.response?.status === 400) {
        throw new Error("Parâmetros inválidos");
      }
    }
    throw new Error("Erro ao adicionar item");
  }
};

const updateTodoItem = async (
  itemId: number,
  updatedFields: Partial<TodoItem>
): Promise<string> => {
  try {
    const response: AxiosResponse = await apiClient.put(
      `/api/todos/item/${itemId}`,
      updatedFields
    );
    return `Item atualizado com sucesso, resposta API: ${response.data}`;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      if (error.response?.status === 404) {
        throw new Error("Nenhum item encontrado com o ID informado");
      }
    }
    throw new Error("Erro ao atualizar item");
  }
};

const deleteTodoItem = async (itemId: number): Promise<string> => {
  try {
    const response: AxiosResponse = await apiClient.delete(
      `/api/todos/item/${itemId}`
    );
    return `Item deletado com sucesso, resposta API: ${response.data}`;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      if (error.response?.status === 404) {
        throw new Error("Nenhum item encontrado com o ID informado");
      }
    }
    throw new Error("Erro ao deletar item");
  }
};

const getUserById = async (userId: number): Promise<User> => {
  try {
    const response: AxiosResponse = await apiClient.get(`/api/users/${userId}`);
    localStorage.setItem("userId", response.data.id);
    return response.data;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      if (error.response?.status === 404) {
        throw new Error("Nenhum usuário encontrado com o ID informado");
      }
    }
    throw new Error("Erro ao buscar usuário");
  }
};

const updateUser = async (
  userId: number,
  updatedData: Partial<User>
): Promise<string> => {
  try {
    const response: AxiosResponse = await apiClient.put(
      `/api/users/${userId}`,
      updatedData
    );
    return `Usuário atualizado, resposta API: ${response.data}`;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      if (error.response?.status === 404) {
        throw new Error("Nenhum usuário encontrado com o ID informado");
      }
    }
    throw new Error("Erro ao atualizar usuário");
  }
};

const deleteUser = async (userId: number): Promise<string> => {
  try {
    const response: AxiosResponse = await apiClient.delete(
      `/api/users/${userId}`
    );
    return `Usuário deletado, resposta API: ${response.data}`;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      if (error.response?.status === 404) {
        throw new Error("Nenhum usuário encontrado com o ID informado");
      }
    }
    throw new Error("Erro ao deletar usuário");
  }
};

export {
  registerUser,
  loginUser,
  addTodoList,
  getTodoLists,
  updateTodoList,
  deleteTodoList,
  addTodoItem,
  updateTodoItem,
  deleteTodoItem,
  getUserById,
  updateUser,
  deleteUser,
};
