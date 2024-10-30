import {
  Button,
  Card,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";
import { FC, useContext, useEffect, useState } from "react";
import { LoginContainer } from "./style";
import colors from "../../utils/colors";
import logout from "../../utils/logout";
import { useNavigate } from "react-router-dom";
import {
  FlexRowCenterBet,
  sxToInputLabel,
  sxToSelect,
} from "../../components/style";
import { AuthContext } from "../../contexts/AuthContext";
import { api, getHeaders } from "../../utils/api";
import { ILoginResponse } from "../../interfaces/user.interface";
import { LoadingButton } from "@mui/lab";

const SelectInstance: FC = () => {
  const [instanceId, setInstanceId] = useState(1);
  const context = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    api()
      .get<{ data: ILoginResponse }>(
        `/instances/${localStorage.getItem("id_user")}`,
        {
          headers: getHeaders(),
        }
      )
      .then((res) => {
        const usuario = res.data.data.user_info.usuario;
        const funcionario = res.data.data.user_info.funcionario;
        const token = localStorage.getItem("authorization") || "";
        const instancias = res.data.data.user_info.instancias;
        context?.setUserInfo({ usuario, funcionario, token, instancias });
        setInstanceId(instancias[0].id || 0);
        localStorage.setItem(
          "tipo",
          context?.userInfo?.usuario.super_admin
            ? "super_admin"
            : instancias[0]?.tipo || ""
        );
        localStorage.setItem(
          "id_instancia",
          instancias[0]?.id.toString() || ""
        );
        localStorage.setItem("instancia", instancias[0]?.nome || "");
      });
  }, []);

  function finishLogin() {
    const instance = context?.userInfo?.instancias.find(
      (i) => i.id === instanceId
    );

    localStorage.setItem(
      "tipo",
      context?.userInfo?.usuario.super_admin
        ? "super_admin"
        : instance?.tipo || ""
    );
    localStorage.setItem("id_instancia", instance?.id.toString() || "");
    localStorage.setItem("instancia", instance?.nome || "");

    navigate("/dashboard/inicio");
  }
  return (
    <LoginContainer color={colors.main}>
      <Card
        sx={{
          padding: "1rem",
          width: "400px",
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

          <FormControl fullWidth>
            <InputLabel sx={sxToInputLabel} id="demo-simple-select-label">
              Cidade
            </InputLabel>
            <Select
              size="small"
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={instanceId}
              label="Cidade"
              onChange={(e) => {
                setInstanceId(Number(e.target.value));
              }}
              sx={sxToSelect}
            >
              {context?.userInfo?.instancias.map((i) => (
                <MenuItem key={i.id} sx={{ color: colors.main }} value={i.id}>
                  {i.nome}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <FlexRowCenterBet style={{ width: "100%", marginTop: "1rem" }}>
            <Button
              sx={{
                color: colors.main,
                borderColor: colors.main,
                padding: "0.5rem",
                width: "49%",
              }}
              fullWidth
              size="small"
              variant="outlined"
              onClick={() => logout()}
            >
              Voltar ao login
            </Button>
            <LoadingButton
              type="submit"
              fullWidth
              size="small"
              variant="contained"
              loading={!context?.userInfo?.instancias.length}
              sx={{
                backgroundColor: colors.main,
                padding: "0.5rem",
                width: "49%",
              }}
              onClick={finishLogin}
            >
              Continuar
            </LoadingButton>
          </FlexRowCenterBet>
        </form>
      </Card>
      <p style={{ position: "fixed", bottom: "20px" }}>
        CRIARE TECH © 2022 Todos os Direitos Reservados.
      </p>
    </LoginContainer>
  );
};

export default SelectInstance;
