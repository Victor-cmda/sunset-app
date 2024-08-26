import Login from "./pages/Login/Index";
import MainLayout from "./layout/MainLayout";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import Register from "./pages/Register/Index";
import HomePage from "./pages/Home";
import TodoPage from "./pages/Todos";
import ProtectedRoute from "./utils/ProtectedRouteProps";

function App() {
  return (
    <>
      <BrowserRouter>
        <MainLayout>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route
              path="/todos"
              element={
                <ProtectedRoute>
                  <TodoPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/"
              element={
                <ProtectedRoute>
                  <HomePage />
                </ProtectedRoute>
              }
            />
          </Routes>
        </MainLayout>
      </BrowserRouter>
    </>
  );
}

export default App;
