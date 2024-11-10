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
  const [loading, setLoading] = useState(false);
  const [openError, setOpenError] = useState(false);
  const [snackMessage, setSnackMessage] = useState("");

  useEffect(() => {
    if (localStorage.getItem("authorization")) {
      navigate("/dashboard/inicio");
    }
  }, []);

  function login() {
    setLoading(true);
    api()
      .post<ILoginResponse>("api/v1/accounts/token/", {
        username: user,
        password: password,
      })
      .then((res) => {
        localStorage.setItem("authorization", res.data.access);

        const userInfo = res.data.user_info;
        localStorage.setItem("user_id", userInfo.id.toString());
        localStorage.setItem("username", userInfo.username);
        localStorage.setItem("is_active", JSON.stringify(userInfo.is_active));
        localStorage.setItem("is_staff", JSON.stringify(userInfo.is_staff));
        localStorage.setItem(
          "is_superuser",
          JSON.stringify(userInfo.is_superuser)
        );
        localStorage.setItem(
          "last_access",
          JSON.stringify(userInfo.last_access)
        );
        localStorage.setItem("access_count", userInfo.access_count.toString());

        const employee = userInfo.employee;
        localStorage.setItem("employee_id", employee.employee_id.toString());
        localStorage.setItem("employee_name", employee.name);
        localStorage.setItem("employee_gender", employee.gender);
        localStorage.setItem("employee_birth_date", employee.birth_date);
        localStorage.setItem("employee_cpf", employee.cpf);
        localStorage.setItem("employee_rg", employee.rg || "");
        localStorage.setItem("employee_photo", employee.photo || "");

        localStorage.setItem("instances", JSON.stringify(userInfo.instances));

        if (userInfo.instances.length === 1) {
          localStorage.setItem(
            "user_type",
            userInfo.is_superuser
              ? "super_user"
              : userInfo.instances[0].user_type.toString() || ""
          );
          localStorage.setItem(
            "instance_id",
            userInfo.instances[0].id.toString() || ""
          );
          localStorage.setItem(
            "instance_name",
            userInfo.instances[0].name || ""
          );
          navigate("/dashboard/inicio");
        } else {
          navigate("/selecionar-escola");
        }

        setLoading(false);
      })
      .catch((err) => {
        setSnackMessage(err.response.data.detail || err.message);
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
