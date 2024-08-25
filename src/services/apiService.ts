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
  username: string;
  email: string;
  password: string;
}

interface LoginData {
  email: string;
  password: string;
}

interface TodoList {
  id: number;
  title: string;
  items: TodoItem[];
}

interface TodoItem {
  id: number;
  text: string;
  completed: boolean;
  important: boolean;
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
    if (response.status === 200) {
      // Armazenar token ou outras informações se necessário
      // Exemplo: localStorage.setItem('token', response.data.token);
      return "Usuário logado com sucesso";
    }
    throw new Error("Erro desconhecido durante o login");
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

const addTodoList = async (title: string): Promise<string> => {
  try {
    const response: AxiosResponse = await apiClient.post("/api/todos/list", {
      title,
    });
    if (response.status === 200) {
      return "Lista de tarefas criada com sucesso";
    }
    throw new Error("Erro desconhecido ao criar lista de tarefas");
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
    const response: AxiosResponse = await apiClient.get("/api/todos/lists/");
    if (response.status === 200) {
      return response.data; // Supondo que response.data seja um array de TodoList
    }
    throw new Error("Erro desconhecido ao buscar listas de tarefas");
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

const updateTodoList = async (id: number, title: string): Promise<string> => {
  try {
    const response: AxiosResponse = await apiClient.put(
      `/api/todos/list/${id}`,
      { title }
    );
    if (response.status === 200) {
      return "Lista de tarefas atualizada";
    }
    throw new Error("Erro desconhecido ao atualizar lista de tarefas");
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
    if (response.status === 204) {
      return "Lista de tarefas deletada com sucesso";
    }
    throw new Error("Erro desconhecido ao deletar lista de tarefas");
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
  item: Partial<TodoItem>
): Promise<string> => {
  try {
    const response: AxiosResponse = await apiClient.post("/api/todos/item/", {
      listId,
      ...item,
    });
    if (response.status === 200) {
      return "Item adicionado com sucesso";
    }
    throw new Error("Erro desconhecido ao adicionar item");
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
    if (response.status === 200) {
      return "Item atualizado com sucesso";
    }
    throw new Error("Erro desconhecido ao atualizar item");
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
    if (response.status === 204) {
      return "Item deletado com sucesso";
    }
    throw new Error("Erro desconhecido ao deletar item");
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      if (error.response?.status === 404) {
        throw new Error("Nenhum item encontrado com o ID informado");
      }
    }
    throw new Error("Erro ao deletar item");
  }
};

// Users Controller
const getUserById = async (userId: number): Promise<User> => {
  try {
    const response: AxiosResponse = await apiClient.get(`/api/users/${userId}`);
    if (response.status === 200) {
      return response.data; // Supondo que response.data seja um objeto User
    }
    throw new Error("Erro desconhecido ao buscar usuário");
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
    if (response.status === 200) {
      return "Usuário atualizado";
    }
    throw new Error("Erro desconhecido ao atualizar usuário");
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
    if (response.status === 204) {
      return "Usuário deletado";
    }
    throw new Error("Erro desconhecido ao deletar usuário");
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      if (error.response?.status === 404) {
        throw new Error("Nenhum usuário encontrado com o ID informado");
      }
    }
    throw new Error("Erro ao deletar usuário");
  }
};

// Exportar todas as funções
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
