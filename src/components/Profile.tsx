import { createElement, FC, useState } from "react";
import styled from "styled-components";
import { IconButton, Menu, MenuItem } from "@mui/material";
import Icons from "../utils/icons";
import logout from "../utils/logout";
import { FlexRowCenterBet } from "./style";
import colors from "../utils/colors";

const Profile: FC = () => {
  const [actionsEl, setActionsEl] = useState<null | HTMLElement>(null);
  const handleActionsOpen = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    setActionsEl(event.currentTarget);
  };
  const handleActionsClose = () => setActionsEl(null);
  return (
    <>
      <FlexRowCenterBet>
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
