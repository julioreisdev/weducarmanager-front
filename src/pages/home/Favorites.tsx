import { FC, useState } from "react";
import { SectionSubTitle } from "../../components/style";
import FavoriteCard from "../../components/FavoriteCard";
import colors from "../../utils/colors";
import { Box } from "@mui/material";

const favorites = [
  {
    name: "Justificar Falta",
    bgColor: colors.main,
    url: "/public/anotacao.png",
  },
  { name: "Calendário", bgColor: colors.orange, url: "/public/calendario.png" },
  {
    name: "Histórico Escolar",
    bgColor: colors.main,
    url: "/public/historico.png",
  },
  {
    name: "Ficha de Matrícula",
    bgColor: colors.orange,
    url: "/public/ficha.png",
  },
  { name: "Turmas", bgColor: colors.main, url: "/public/turmas.png" },
  { name: "Usuários", bgColor: colors.orange, url: "/public/usuarios.png" },
  {
    name: "Relatório - Boletim",
    bgColor: colors.main,
    url: "/public/relatorios.png",
  },
];

const Favorites: FC = () => {
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
      <SectionSubTitle>Favoritos</SectionSubTitle>

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
        {favorites.map((item) => (
          <Box
            key={item.name}
            sx={{
              flexShrink: 0,
              minWidth: "10vw",
              height: "120px",
              "@media (max-width: 720px)": {
                width: "120px",
              },
            }}
          >
            <FavoriteCard
              title={item.name}
              url={item.url}
              bgColor={item.bgColor}
            />
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default Favorites;
