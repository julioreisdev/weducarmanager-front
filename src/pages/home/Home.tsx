import { FC } from "react";
import { SectionSubTitle, SectionTitle } from "../../components/style";
import { Box } from "@mui/material";
import Favorites from "./Favorites";
import DashboardIndicatorsCards from "./DashboardIndicatorsCards";
import styled from "styled-components";

const Home: FC = () => {
  return (
    <Box sx={{ width: "100%" }}>
      <SectionTitle>Página Inicial</SectionTitle>

      <Favorites />
      <DashboardIndicatorsCards />

      <GraphsContainer>
        <GraphContainer>
          <SectionSubTitle>Calendário de eventos</SectionSubTitle>
        </GraphContainer>
        <GraphContainer>
          <SectionSubTitle>Distribuição de alunos</SectionSubTitle>
        </GraphContainer>
      </GraphsContainer>
    </Box>
  );
};

const GraphsContainer = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;

  @media (max-width: 720px) {
    flex-direction: column;
    justify-content: center;
  }
`;

const GraphContainer = styled.div`
  width: 49%;
  height: 300px;
  padding: 0 0 1rem 0;

  @media (max-width: 720px) {
    width: 100%;
  }
`;

export default Home;
