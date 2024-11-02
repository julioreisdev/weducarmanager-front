import { Button, Card } from "@mui/material";
import { FC, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { LoginContainer } from "./style";
import colors from "../../utils/colors";

const ResetPassword: FC = () => {
  const navigate = useNavigate();
  useEffect(() => {
    if (localStorage.getItem("authorization")) {
      navigate("/dashboard/inicio");
    }
  }, []);
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
            console.log("login");
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
          <a href="https://wa.me/558981191501?text=Olá, gostaria de ajuda para redefinir minha senha do Weducar!">
            {" "}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                marginBottom: "1rem",
                gap: "0.5rem",
              }}
            >
              {" "}
              <h5>Clique para falar com um atendente</h5>
              <img
                src="https://icons.iconarchive.com/icons/dtafalonso/android-l/128/WhatsApp-icon.png"
                alt=""
                style={{ width: "20px" }}
              />
            </div>
          </a>
          <Link style={{ fontSize: "0.9rem" }} to="/">
            <Button
              sx={{ color: colors.main, borderColor: colors.main }}
              type="submit"
              fullWidth
              size="small"
              variant="outlined"
            >
              Voltar
            </Button>
          </Link>
        </form>
      </Card>
      <p style={{ position: "fixed", bottom: "20px" }}>
        CRIARE TECH © 2022 Todos os Direitos Reservados.
      </p>
    </LoginContainer>
  );
};

export default ResetPassword;
