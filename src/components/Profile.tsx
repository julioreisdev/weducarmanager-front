import { createElement, FC, useEffect, useState } from "react";
import styled from "styled-components";
import {
  Box,
  FormControl,
  IconButton,
  InputLabel,
  Menu,
  MenuItem,
  Select,
} from "@mui/material";
import Icons from "../utils/icons";
import logout from "../utils/logout";
import { FlexRowCenterBet, sxToInputLabel, sxToSelect } from "./style";
import colors from "../utils/colors";
import { IInstance } from "../interfaces/user.interface";
import { useUserInfo } from "../hooks/useUserInfo";

const Profile: FC = () => {
  const [actionsEl, setActionsEl] = useState<null | HTMLElement>(null);
  const [selectedId, setSelectedId] = useState(0);
  const [instances, setInstances] = useState<IInstance[]>();
  const { userInfo, userInfoLoading } = useUserInfo();

  useEffect(() => {
    if (userInfo?.data) {
      setInstances(
        userInfo.data.user_info.instancias?.filter((i) => i.tipo !== "docente")
      );

      setSelectedId(Number(localStorage.getItem("id_instancia")));
    }
  }, [userInfo, userInfoLoading]);

  function changeInstance(id: number) {
    const selected = instances?.find((i) => i.id === id);
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
    window.location.reload();
  }

  const handleActionsOpen = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    setActionsEl(event.currentTarget);
  };
  const handleActionsClose = () => setActionsEl(null);
  return (
    <>
      <FlexRowCenterBet>
        <Box sx={{ width: "150px" }}>
          {" "}
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
                changeInstance(Number(e.target.value));
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
        </Box>
        <IconButton sx={{ color: colors.main }}>
          {createElement(Icons.MailOutlineIcon)}
        </IconButton>
        <IconButton sx={{ color: colors.main }}>
          {createElement(Icons.NotificationsNoneIcon)}
        </IconButton>
        <FlexRowCenterBet
          style={{ gap: "0.1rem", cursor: "pointer" }}
          onClick={(e) => handleActionsOpen(e)}
        >
          {" "}
          <ProfileImg src="/profile.png" />
          {createElement(
            actionsEl ? Icons.ArrowDropUpIcon : Icons.ArrowDropDownIcon
          )}
        </FlexRowCenterBet>
      </FlexRowCenterBet>
      <Menu
        anchorEl={actionsEl}
        open={Boolean(actionsEl)}
        onClose={handleActionsClose}
      >
        <MenuItem
          onClick={() => logout()}
          sx={{ "&:hover": { color: "primary.main" } }}
        >
          {createElement(Icons.LogoutIcon)}
          <h6>Sair</h6>
        </MenuItem>
      </Menu>
    </>
  );
};

const ProfileImg = styled.img`
  width: 35px;
  border-radius: 100%;
`;

export default Profile;
