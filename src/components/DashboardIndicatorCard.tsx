import { Card } from "@mui/material";
import { FC } from "react";
import { FlexRowCenterBet } from "./style";

interface IProps {
  title: string;
  url: string;
  value: number;
  bgColor: string;
}

const DashboardIndicatorCard: FC<IProps> = ({ title, url, bgColor, value }) => {
  return (
    <Card
      sx={{
        borderRadius: "8px",
        width: "19vw",
        height: "120px",
        padding: "0.5rem",
        cursor: "pointer",
        "&:hover": {
          backgroundColor: bgColor,
          color: "#fff",
        },
        "@media (max-width: 1200px)": {
          width: "280px",
        },
      }}
    >
      <FlexRowCenterBet style={{ justifyContent: "space-around" }}>
        {" "}
        <img
          style={{ width: "100px", borderRadius: "100%" }}
          src={url}
          alt=""
        />
        <div>
          <p>{title}</p>
          <h3>{value}</h3>
        </div>
      </FlexRowCenterBet>
    </Card>
  );
};

export default DashboardIndicatorCard;
