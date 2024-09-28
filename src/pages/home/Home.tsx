import { FC } from "react";
import { SectionSubTitle, SectionTitle } from "../../components/style";
import { Box } from "@mui/material";
import Favorites from "./Favorites";
import DashboardIndicatorsCards from "./DashboardIndicatorsCards";
import styled from "styled-components";
import CalendarView from "./Calendar";
import { BarChart } from "@mui/x-charts";

const data = [
  { class: "7ª Ano - A", value: 21 },
  { class: "7ª Ano - B", value: 32 },
  { class: "8ª Ano - A", value: 25 },
  { class: "8ª Ano - b", value: 37 },
];

const barChartsParams = {
  series: [
    {
      data: data.map((item) => item.value),
    },
  ],
  xAxis: [
    { data: data.map((item) => item.class), scaleType: "band", id: "axis1" },
  ],
  height: 300,
};

const Home: FC = () => {
  return (
    <Box sx={{ width: "100%" }}>
      <SectionTitle>Página Inicial</SectionTitle>
      <Favorites />
      <DashboardIndicatorsCards />
      <GraphsContainer>
        <GraphContainer>
          <SectionSubTitle>Calendário de eventos</SectionSubTitle>
          <CalendarView />
        </GraphContainer>
        <GraphContainer>
          <SectionSubTitle>Distribuição de alunos</SectionSubTitle>
          {/* @ts-expect-error type error */}
          <BarChart sx={{ width: "100%" }} {...barChartsParams} />
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
  margin-bottom: 2rem;

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
