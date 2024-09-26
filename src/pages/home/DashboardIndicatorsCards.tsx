import { FC, useState } from "react";
import { SectionSubTitle } from "../../components/style";
import colors from "../../utils/colors";
import { Box } from "@mui/material";
import DashboardIndicatorCard from "../../components/DashboardIndicatorCard";

const indicators = [
  {
    name: "Alunos Ativos",
    value: 320,
    bgColor: colors.green,
    url: "/public/alunos.png",
  },
  {
    name: "Professores",
    value: 15,
    bgColor: colors.blue,
    url: "/public/professor.png",
  },
  {
    name: "Turmas",
    value: 10,
    bgColor: colors.orange,
    url: "/public/turmas.png",
  },
  {
    name: "Transferências",
    value: 10,
    bgColor: colors.red,
    url: "/public/transferencia.png",
  },
];

const DashboardIndicatorsCards: FC = () => {
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  const handleWheel = (event: React.WheelEvent<HTMLDivElement>) => {
    if (isHovered) {
      event.preventDefault();
      event.currentTarget.scrollLeft += event.deltaY;
    }
  };
  return (
    <Box sx={{ width: "100%" }}>
      <SectionSubTitle>Dashboard</SectionSubTitle>

      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          width: "100%",
          gap: "1rem",
          overflowX: "auto",
          overflowY: "hidden",
          cursor: "grab",
          padding: "0.1rem 0.1rem 0.5rem 0.1rem",
          textAlign: "center",
          marginBottom: "1rem",
          "&::-webkit-scrollbar": {
            height: "3px",
          },
        }}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onWheel={handleWheel}
      >
        {indicators.map((item) => (
          <Box
            key={item.name}
            sx={{
              flexShrink: 0,
              minWidth: "19vw",
              height: "120px",
              "@media (max-width: 1200px)": {
                width: "280px",
              },
            }}
          >
            <DashboardIndicatorCard
              title={item.name}
              url={item.url}
              value={item.value}
              bgColor={item.bgColor}
            />
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default DashboardIndicatorsCards;
