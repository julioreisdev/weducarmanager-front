import Icons from "./icons";

const sidebarItems = [
  {
    id: 1,
    name: "Página Inicial",
    route: "inicio",
    icon: Icons.DonutSmallIcon,
  },
  {
    id: 2,
    name: "Alunos",
    route: "alunos",
    icon: Icons.GroupsIcon,
  },
  {
    id: 3,
    name: "Gerais",
    route: "gerais",
    icon: Icons.PeopleAltIcon,
  },
  {
    id: 4,
    name: "Escola",
    route: "escola",
    icon: Icons.BusinessIcon,
  },
  {
    id: 5,
    name: "Módulos",
    route: "modulos",
    icon: Icons.MenuBookIcon,
  },
  {
    id: 6,
    name: "Ferramentas",
    route: "ferramentas",
    icon: Icons.SettingsIcon,
  },
].map((item) => {
  return {
    ...item,
    name: item.name.toUpperCase(),
  };
});

export default sidebarItems;
