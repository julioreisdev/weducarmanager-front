import { Card } from "@mui/material";
import { FC, useContext, useEffect, useState } from "react";
import { LoadingButton } from "@mui/lab";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContext";
import colors from "../../utils/colors";
import { LoginContainer } from "./style";
import AppTextField from "../../components/AppTextField";

const Login: FC = () => {
  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const context = useContext(AuthContext);

  useEffect(() => {
    if (localStorage.getItem("weducar_login") === "true") {
      navigate("/dashboard/inicio");
    }
  }, []);

  function login() {
    localStorage.setItem("weducar_login", "true");
    localStorage.setItem("username", user);
    context?.login();
    navigate("/dashboard/inicio");
  }
  return (
    <LoginContainer color={colors.main}>
      <Card
        sx={{
          padding: "1rem",
          width: "300px",
          borderRadius: "12.5px",
        }}
      >
        <form
          onSubmit={(e) => {
            e.preventDefault();
            login();
          }}
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <img
            src="/public/logoicon.png"
            style={{ width: "50px", marginBottom: "1rem" }}
            alt=""
          />
          <AppTextField
            label="Usuário"
            value={user}
            onChange={(e) => setUser(e.target.value)}
            required
            type="text"
            sx={{ marginBottom: "1rem" }}
          />

          <AppTextField
            label="Senha"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            type="password"
            sx={{ marginBottom: "1rem" }}
          />
          <LoadingButton
            type="submit"
            fullWidth
            size="small"
            variant="contained"
            sx={{
              marginBottom: "1rem",
              backgroundColor: colors.main,
              padding: "0.5rem",
            }}
          >
            Entrar
          </LoadingButton>
          <Link style={{ fontSize: "0.9rem" }} to="/esqueci-minha-senha">
            Esqueci minha senha
          </Link>
        </form>
      </Card>
      <p style={{ position: "fixed", bottom: "20px" }}>
        CRIARE TECH © 2022 Todos os Direitos Reservados.
      </p>
    </LoginContainer>
  );
};

export default Login;
