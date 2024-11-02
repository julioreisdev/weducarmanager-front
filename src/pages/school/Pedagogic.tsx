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
    name: "Resgistro de Turmas",
    bgColor: colors.blue,
    url: "/relat.png",
    disabled: true,
  },
  {
    name: "Planos Educação Infantil",
    bgColor: colors.blue,
    url: "/infantil.png",
    disabled: true,
  },
  {
    name: "Planos Educação Fundamental",
    bgColor: colors.blue,
    url: "/fundamental.png",
    disabled: true,
  },
];

const Pedagogic: FC = () => {
  return (
    <Box sx={{ width: "100%", marginBottom: "1rem" }}>
      <SectionSubTitle>Pedagógico</SectionSubTitle>

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

export default Pedagogic;
