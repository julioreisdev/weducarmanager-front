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
    name: "Administrativo",
    route: "adm",
    icon: Icons.ManageAccountsIcon,
  },
  {
    id: 3,
    name: "Calendário",
    route: "calendario",
    icon: Icons.EditCalendarIcon,
  },

  {
    id: 4,
    name: "Escola",
    route: "escola",
    icon: Icons.BusinessIcon,
  },

  {
    id: 5,
    name: "Alunos",
    route: "alunos",
    icon: Icons.GroupsIcon,
  },

  {
    id: 6,
    name: "Suporte",
    route: "suporte",
    icon: Icons.SupportAgentIcon,
  },
].map((item) => {
  return {
    ...item,
    name: item.name.toUpperCase(),
  };
});

export default sidebarItems;
