import { FC } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./pages/login/Login";
import ResetPassword from "./pages/login/ResetPassword";
import ProtectedRoute from "./components/ProtectedRoute";
import Dashboard from "./pages/dashboard/Dashboad";
import Home from "./pages/home/Home";

const App: FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/esqueci-minha-senha" element={<ResetPassword />} />
        <Route
          path="/dashboard/*"
          element={
            <ProtectedRoute>
              <Dashboard>
                <Routes>
                  <Route path="/inicio" element={<Home />} />
                  <Route path="/alunos" element={<>Alunos</>} />
                  <Route path="/gerais" element={<>Gerais</>} />
                  <Route path="/escola" element={<>Escola</>} />
                  <Route path="/modulos" element={<>Módulos</>} />
                  <Route path="/ferramentas" element={<>Ferramentas</>} />
                </Routes>
              </Dashboard>
            </ProtectedRoute>
          }
        ></Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
