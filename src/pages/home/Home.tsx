import { FC } from "react";
import {
  Disabled,
  SectionSubTitle,
  SectionTitle,
} from "../../components/style";
import { Box, Card } from "@mui/material";
import Favorites from "./Favorites";
import DashboardIndicatorsCards from "./DashboardIndicatorsCards";
import styled from "styled-components";
import CalendarView from "../../components/Calendar";
import { BarChart } from "@mui/x-charts";
import InstructorIndicatores from "./InstructorIndicatores";

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
  height: 325,
};

const Home: FC = () => {
  return (
    <Box sx={{ width: "100%" }}>
      <SectionTitle>Página Inicial</SectionTitle>
      <Favorites />
      <DashboardIndicatorsCards />
      <GraphsContainer>
        <GraphContainer>
          {" "}
          <SectionSubTitle>Calendário de eventos</SectionSubTitle>
          <Disabled>
            <CalendarView userSelect={false} action={false} />
          </Disabled>
        </GraphContainer>
        <GraphContainer>
          <SectionSubTitle>Distribuição de alunos</SectionSubTitle>
          <Disabled>
            {" "}
            {/* @ts-expect-error type error */}
            <BarChart sx={{ width: "100%" }} {...barChartsParams} />
          </Disabled>
        </GraphContainer>
      </GraphsContainer>
      <Card
        sx={{
          width: "100%",
          backgroundColor: "#fff",
          borderRadius: "5px",
          padding: "0.5rem",
          marginTop: "4rem",
        }}
      >
        <div style={{ width: "100%", maxHeight: "500px", overflowY: "auto" }}>
          <SectionSubTitle>Indicadores por professor(a)</SectionSubTitle>
          <Disabled>
            <InstructorIndicatores />
          </Disabled>
        </div>
      </Card>
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
    gap: 4rem;
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
