import { FC } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./pages/login/Login";
import ResetPassword from "./pages/login/ResetPassword";
import ProtectedRoute from "./components/ProtectedRoute";
import Dashboard from "./pages/dashboard/Dashboad";
import Home from "./pages/home/Home";
import Calendar from "./pages/calendar/Calendar";
import { Disabled } from "./components/style";
import SelectInstance from "./pages/login/SelectInstance";

const App: FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/esqueci-minha-senha" element={<ResetPassword />} />

        <Route
          path="/selecionar-escola"
          element={
            <ProtectedRoute>
              <SelectInstance />
            </ProtectedRoute>
          }
        ></Route>

        <Route
          path="/dashboard/*"
          element={
            <ProtectedRoute>
              <Dashboard>
                <Routes>
                  <Route
                    path="/inicio"
                    element={
                      <Disabled>
                        <Home />
                      </Disabled>
                    }
                  />
                  <Route path="/adm" element={<>Admin</>} />
                  <Route
                    path="/calendario"
                    element={
                      <Disabled>
                        <Calendar />
                      </Disabled>
                    }
                  />
                  <Route path="/escola" element={<>Escola</>} />
                  <Route path="/alunos" element={<>Alunos</>} />
                  <Route path="/suporte" element={<>Suporte</>} />
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
