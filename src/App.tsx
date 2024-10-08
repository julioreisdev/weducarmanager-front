import { FC } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./pages/login/Login";
import ResetPassword from "./pages/login/ResetPassword";
import ProtectedRoute from "./components/ProtectedRoute";
import Dashboard from "./pages/dashboard/Dashboad";
import Home from "./pages/home/Home";
import Calendar from "./pages/calendar/Calendar";

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
                  <Route path="/adm" element={<>Admin</>} />
                  <Route path="/calendario" element={<Calendar />} />
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
