import { FC } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./pages/login/Login";
import ResetPassword from "./pages/login/ResetPassword";
import ProtectedRoute from "./components/ProtectedRoute";
import Dashboard from "./pages/dashboard/Dashboad";
import Home from "./pages/home/Home";
import Calendar from "./pages/calendar/Calendar";
import SelectInstance from "./pages/login/SelectInstance";
import Admin from "./pages/adm/Admin";
import Support from "./pages/support/Support";
import Students from "./pages/students/Students";
import School from "./pages/school/School";
import StudentsRecord from "./pages/studentsRecord/StudentsRecord";

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
                  <Route path="/inicio" element={<Home />} />
                  <Route path="/adm" element={<Admin />} />
                  <Route path="/calendario" element={<Calendar />} />
                  <Route path="/escola" element={<School />} />
                  <Route path="/alunos" element={<Students />} />
                  <Route
                    path="/alunos/matricula"
                    element={<StudentsRecord />}
                  />
                  <Route
                    path="/alunos/rematricula"
                    element={<>Rematrícula</>}
                  />
                  <Route path="/suporte" element={<Support />} />
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
