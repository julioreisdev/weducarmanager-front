import {
  Button,
  Card,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";
import { FC, useEffect, useState } from "react";
import { LoginContainer } from "./style";
import colors from "../../utils/colors";
import logout from "../../utils/logout";
import { useNavigate } from "react-router-dom";
import {
  FlexRowCenterBet,
  sxToInputLabel,
  sxToSelect,
} from "../../components/style";
import { LoadingButton } from "@mui/lab";
import { IInstance } from "../../interfaces/user.interface";
import { UseUserInfo } from "../../hooks/useUserInfo";

const SelectInstance: FC = () => {
  const [selectedId, setSelectedId] = useState(0);
  const [instances, setInstances] = useState<IInstance[]>();
  const navigate = useNavigate();
  const { userInfo, userInfoLoading } = UseUserInfo();

  useEffect(() => {
    if (userInfo?.data) {
      setInstances(
        userInfo.data.user_info.instancias?.filter((i) => i.tipo !== "docente")
      );

      if (userInfo.data.user_info.instancias) {
        setSelectedId(userInfo.data.user_info.instancias[0].id);
      }
      if (userInfo.data.user_info.instancias) {
        localStorage.setItem(
          "tipo",
          userInfo.data.user_info.usuario?.super_admin
            ? "super_admin"
            : userInfo.data.user_info.instancias[0]?.tipo || ""
        );
        localStorage.setItem(
          "id_instancia",
          userInfo.data.user_info.instancias[0]?.id.toString() || ""
        );
        localStorage.setItem(
          "instancia",
          userInfo.data.user_info.instancias[0]?.nome || ""
        );
      }
    }
  }, [userInfo, userInfoLoading]);

  function finishLogin() {
    const selected = instances?.find((i) => i.id === selectedId);
    if (selected) {
      localStorage.setItem(
        "tipo",
        userInfo?.data.user_info.usuario?.super_admin
          ? "super_admin"
          : selected?.tipo || ""
      );
      localStorage.setItem("id_instancia", selected?.id.toString() || "");
      localStorage.setItem("instancia", selected?.nome || "");
    }

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
              value={selectedId}
              label="Cidade"
              onChange={(e) => {
                setSelectedId(Number(e.target.value));
              }}
              sx={sxToSelect}
            >
              {instances?.map((i) => (
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
              loading={userInfoLoading}
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
