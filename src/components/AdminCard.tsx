import { Card } from "@mui/material";
import { FC } from "react";
import { FlexColCenter } from "./style";

interface IProps {
  title: string;
  url: string;
  bgColor: string;
}

const AdminCard: FC<IProps> = ({ title, url, bgColor }) => {
  return (
    <Card
      sx={{
        borderRadius: "8px",
        width: "15vw",
        height: "180px",
        padding: "0.5rem",
        cursor: "pointer",
        "&:hover": {
          backgroundColor: bgColor,
          color: "#fff",
        },
        "@media (max-width: 520px)": {
          width: "100%",
        },
      }}
    >
      <FlexColCenter>
        {" "}
        <img
          style={{ width: "100px", borderRadius: "100%" }}
          src={url}
          alt=""
        />
        <h5>{title}</h5>
      </FlexColCenter>
    </Card>
  );
};

export default AdminCard;
