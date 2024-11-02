import { FC } from "react";
import {
  CardAdminContainer,
  Disabled,
  FlexRowCenterWrap,
  SectionSubTitle,
} from "../../components/style";
import colors from "../../utils/colors";
import { Box } from "@mui/material";
import AdminCard from "../../components/AdminCard";

const cards = [
  {
    name: "Alunos Por Turma",
    bgColor: colors.blue,
    url: "/analytics.png",
    disabled: true,
  },
  {
    name: "Ficha de Rendimento",
    bgColor: colors.blue,
    url: "/analytics.png",
    disabled: true,
  },
  {
    name: "Diário de Classe",
    bgColor: colors.blue,
    url: "/analytics.png",
    disabled: true,
  },
  {
    name: "Monitoramento Turma",
    bgColor: colors.blue,
    url: "/analytics.png",
    disabled: true,
  },
  {
    name: "Monitoramento Professor",
    bgColor: colors.blue,
    url: "/analytics.png",
    disabled: true,
  },
];

const Analytics: FC = () => {
  return (
    <Box sx={{ width: "100%", marginBottom: "1rem" }}>
      <SectionSubTitle>Relatórios</SectionSubTitle>

      <FlexRowCenterWrap style={{ gap: "1rem" }}>
        {cards.map((i) => (
          <CardAdminContainer key={i.name}>
            {i.disabled ? (
              <Disabled>
                {" "}
                <AdminCard title={i.name} bgColor={i.bgColor} url={i.url} />
              </Disabled>
            ) : (
              <AdminCard title={i.name} bgColor={i.bgColor} url={i.url} />
            )}
          </CardAdminContainer>
        ))}
      </FlexRowCenterWrap>
    </Box>
  );
};

export default Analytics;
