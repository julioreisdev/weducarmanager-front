import { FC, useState, useEffect, useRef } from "react";
import { Disabled, SectionSubTitle } from "../../components/style";
import FavoriteCard from "../../components/FavoriteCard";
import colors from "../../utils/colors";
import { Box } from "@mui/material";

const favorites = [
  {
    name: "Justificar Falta",
    bgColor: colors.main,
    url: "/anotacao.png",
    disabled: true,
  },
  {
    name: "Calendário",
    bgColor: colors.orange,
    url: "/calendario.png",
    disabled: true,
  },
  {
    name: "Histórico Escolar",
    bgColor: colors.main,
    url: "/historico.png",
    disabled: true,
  },
  {
    name: "Matrícula",
    bgColor: colors.orange,
    url: "/ficha.png",
    disabled: true,
  },
  { name: "Turmas", bgColor: colors.main, url: "/turmas.png", disabled: true },
  {
    name: "Usuários",
    bgColor: colors.orange,
    url: "/usuarios.png",
    disabled: true,
  },
  {
    name: "Relatório - Boletim",
    bgColor: colors.main,
    url: "/relatorios.png",
    disabled: true,
  },
];

const Favorites: FC = () => {
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
      <SectionSubTitle>Favoritos</SectionSubTitle>

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
            <>
              {item.disabled ? (
                <Disabled>
                  <FavoriteCard
                    title={item.name}
                    url={item.url}
                    bgColor={item.bgColor}
                  />
                </Disabled>
              ) : (
                <FavoriteCard
                  title={item.name}
                  url={item.url}
                  bgColor={item.bgColor}
                />
              )}
            </>
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default Favorites;
