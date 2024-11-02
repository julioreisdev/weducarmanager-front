import { Alert, Card, Snackbar } from "@mui/material";
import { FC, useEffect, useState } from "react";
import { LoadingButton } from "@mui/lab";
import { Link, useNavigate } from "react-router-dom";
import colors from "../../utils/colors";
import { LoginContainer } from "./style";
import AppTextField from "../../components/AppTextField";
import { api } from "../../utils/api";
import { ILoginResponse } from "../../interfaces/user.interface";

const Login: FC = () => {
  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const [openError, setOpenError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [snackMessage, setSnackMessage] = useState("");

  useEffect(() => {
    if (localStorage.getItem("authorization")) {
      navigate("/dashboard/inicio");
    }
  }, []);

  function login() {
    setLoading(true);
    api()
      .post<{ data: ILoginResponse }>("/auth/signin/", {
        usuario: user,
        senha: password,
      })
      .then((res) => {
        localStorage.setItem(
          "authorization",
          res.data.data.user_info.token || ""
        );
        if (res.data.data.user_info.usuario) {
          localStorage.setItem(
            "usuario",
            res.data.data.user_info.usuario.usuario
          );
          localStorage.setItem(
            "id_user",
            res.data.data.user_info.usuario.id.toString()
          );
        }

        if (res.data.data.user_info.funcionario) {
          localStorage.setItem(
            "id_funcionario",
            res.data.data.user_info.funcionario.id_funcionario.toString()
          );
        }

        const usuario = res.data.data.user_info.usuario;
        const instancias = res.data.data.user_info.instancias || [];

        if (instancias.length === 1 && usuario) {
          localStorage.setItem(
            "tipo",
            usuario.super_admin ? "super_admin" : instancias[0].tipo || ""
          );
          localStorage.setItem(
            "id_instancia",
            instancias[0].id.toString() || ""
          );
          localStorage.setItem("instancia", instancias[0].nome || "");

          navigate("/dashboard/inicio");
        } else {
          navigate("/selecionar-escola");
        }

        setLoading(false);
      })
      .catch((err) => {
        setSnackMessage(err.response.data.message || err.message);
        setOpenError(true);
        setLoading(false);
      });
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
            src="/logoicon.png"
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
            loading={loading}
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
      <Snackbar
        open={openError}
        onClose={() => setOpenError(false)}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      >
        <Alert
          onClose={() => setOpenError(false)}
          severity="error"
          variant="filled"
          sx={{ width: "100%" }}
        >
          {snackMessage}
        </Alert>
      </Snackbar>
    </LoginContainer>
  );
};

export default Login;
