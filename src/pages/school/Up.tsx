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
    name: "Anos Escolares",
    bgColor: colors.blue,
    url: "/anos.png",
    disabled: true,
  },
  {
    name: "Salas",
    bgColor: colors.blue,
    url: "/escola_sala.png",
    disabled: true,
  },
  {
    name: "Turmas",
    bgColor: colors.blue,
    url: "/escola_turma.png",
    disabled: true,
  },
  {
    name: "Horário de Aulas",
    bgColor: colors.blue,
    url: "/escola_horario.png",
    disabled: true,
  },
];

const Up: FC = () => {
  return (
    <Box sx={{ width: "100%", marginBottom: "1rem" }}>
      <SectionSubTitle>Cadastro</SectionSubTitle>

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

export default Up;
