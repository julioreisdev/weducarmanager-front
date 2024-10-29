import { FC, useState, useEffect, useRef } from "react";
import { SectionSubTitle } from "../../components/style";
import colors from "../../utils/colors";
import { Box } from "@mui/material";
import DashboardIndicatorCard from "../../components/DashboardIndicatorCard";

const indicators = [
  {
    name: "Alunos Ativos",
    value: 0,
    bgColor: colors.green,
    url: "/alunos.png",
  },
  {
    name: "Professores",
    value: 0,
    bgColor: colors.blue,
    url: "/professor.png",
  },
  {
    name: "Turmas",
    value: 0,
    bgColor: colors.orange,
    url: "/turmas.png",
  },
  {
    name: "Transferências",
    value: 0,
    bgColor: colors.red,
    url: "/transferencia.png",
  },
];

const DashboardIndicatorsCards: FC = () => {
  const [isHovered, setIsHovered] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  useEffect(() => {
    const handleWheel = (event: WheelEvent) => {
      if (isHovered) {
        event.preventDefault();
        if (scrollRef.current) {
          scrollRef.current.scrollLeft += event.deltaY;
        }
      }
    };

    const scrollElement = scrollRef.current;
    if (scrollElement) {
      scrollElement.addEventListener("wheel", handleWheel, { passive: false });
    }

    return () => {
      if (scrollElement) {
        scrollElement.removeEventListener("wheel", handleWheel);
      }
    };
  }, [isHovered]);

  return (
    <Box sx={{ width: "100%" }}>
      <SectionSubTitle>Dashboard</SectionSubTitle>

      <Box
        ref={scrollRef}
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
