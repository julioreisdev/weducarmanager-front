import { Card } from "@mui/material";
import { FC } from "react";
import { FlexColCenter } from "./style";

interface IProps {
  title: string;
  url: string;
  bgColor: string;
}

const FavoriteCard: FC<IProps> = ({ title, url, bgColor }) => {
  return (
    <Card
      sx={{
        borderRadius: "8px",
        width: "10vw",
        height: "120px",
        padding: "0.5rem",
        cursor: "pointer",
        "&:hover": {
          backgroundColor: bgColor,
          color: "#fff",
        },
        "@media (max-width: 720px)": {
          width: "120px",
        },
      }}
    >
      <FlexColCenter>
        {" "}
        <img style={{ width: "70px", borderRadius: "100%" }} src={url} alt="" />
        <h6>{title}</h6>
      </FlexColCenter>
    </Card>
  );
};

export default FavoriteCard;
