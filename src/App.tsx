import Login from "./pages/Login/Index";
import MainLayout from "./layout/MainLayout";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import Register from "./pages/Register/Index";
import HomePage from "./pages/Home";
import TodoPage from "./pages/Todos";

function App() {
  return (
    <>
      <BrowserRouter>
        <MainLayout>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/todos" element={<TodoPage />} />
          </Routes>
        </MainLayout>
      </BrowserRouter>
    </>
  );
}

export default App;
