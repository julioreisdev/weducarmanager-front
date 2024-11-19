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
import {
  Disabled,
  FlexRowCenterBet,
  sxToInputLabel,
  sxToSelect,
} from "./style";
import colors from "../utils/colors";
import { IInstance } from "../interfaces/user.interface";
import { UseLetiveYears } from "../hooks/UseLetiveYears";

const Profile: FC = () => {
  const [actionsEl, setActionsEl] = useState<null | HTMLElement>(null);
  const [selectedId, setSelectedId] = useState(0);
  const [letiveYear, setLetiveYear] = useState("1");
  const [instances, setInstances] = useState<IInstance[]>();
  const { letiveYears, letiveYearsLoading } = UseLetiveYears();

  useEffect(() => {
    const localInstances: IInstance[] = JSON.parse(
      localStorage.getItem("instances") || ""
    );
    if (localInstances) {
      setInstances(localInstances);
      setSelectedId(Number(localStorage.getItem("instance_id")));
    }

    setLetiveYear(localStorage.getItem("letive_year") || "");
  }, [letiveYearsLoading]);

  function changeInstance(id: number) {
    const selected = instances?.find((i) => i.id === id);

    if (selected) {
      const userType = localStorage.getItem("user_type");
      localStorage.setItem(
        "user_type",
        userType === "super_user" ? "super_user" : selected.user_type || ""
      );

      localStorage.setItem("instance_id", selected.id.toString());
      localStorage.setItem("instance_name", selected.name || "");

      window.location.reload();
    }
  }

  const handleActionsOpen = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    setActionsEl(event.currentTarget);
  };
  const handleActionsClose = () => setActionsEl(null);
  return (
    <>
      <FlexRowCenterBet style={{ width: "100%" }}>
        <Disabled>
          <IconButton sx={{ color: colors.main }}>
            {createElement(Icons.SearchIcon)}
          </IconButton>
        </Disabled>
        <FlexRowCenterBet>
          <Box>
            {" "}
            <FormControl fullWidth>
              <InputLabel
                sx={sxToInputLabel}
                id="demo-simple-select-label-year"
              >
                Ano
              </InputLabel>
              <Select
                size="small"
                labelId="demo-simple-select-label-year"
                id="demo-simple-select-year"
                value={letiveYear}
                label="Ano"
                onChange={(e) => {
                  localStorage.setItem("letive_year", e.target.value);
                  setLetiveYear(e.target.value);
                  window.location.reload();
                }}
                sx={sxToSelect}
              >
                {letiveYears?.map((i) => (
                  <MenuItem
                    key={i.academic_year_id}
                    sx={{ color: colors.main }}
                    value={i.academic_year_id}
                  >
                    {i.academic_year_id}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>
          <Disabled>
            <IconButton sx={{ color: colors.main }}>
              {createElement(Icons.MailOutlineIcon)}
            </IconButton>
            <IconButton sx={{ color: colors.main }}>
              {createElement(Icons.NotificationsNoneIcon)}
            </IconButton>
          </Disabled>
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
      </FlexRowCenterBet>
      <Menu
        anchorEl={actionsEl}
        open={Boolean(actionsEl)}
        onClose={handleActionsClose}
      >
        <MenuItem>
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
                    {i.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>
        </MenuItem>

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
