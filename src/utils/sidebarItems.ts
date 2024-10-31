import Icons from "./icons";

const sidebarItems = [
  {
    id: 1,
    name: "Página Inicial",
    route: "inicio",
    icon: Icons.DonutSmallIcon,
    users_type: ["gestor", "admin", "super_admin"],
  },
  {
    id: 2,
    name: "Administrativo",
    route: "adm",
    icon: Icons.ManageAccountsIcon,
    users_type: ["admin", "super_admin"],
  },
  {
    id: 3,
    name: "Calendário",
    route: "calendario",
    icon: Icons.EditCalendarIcon,
    users_type: ["gestor", "admin", "super_admin"],
  },

  {
    id: 4,
    name: "Escola",
    route: "escola",
    icon: Icons.BusinessIcon,
    users_type: ["gestor", "admin", "super_admin"],
  },

  {
    id: 5,
    name: "Alunos",
    route: "alunos",
    icon: Icons.GroupsIcon,
    users_type: ["gestor", "admin", "super_admin"],
  },

  {
    id: 6,
    name: "Suporte",
    route: "suporte",
    icon: Icons.SupportAgentIcon,
    users_type: ["gestor", "admin", "super_admin"],
  },
].map((item) => {
  return {
    ...item,
    name: item.name.toUpperCase(),
  };
});

export default sidebarItems;
