import Icons from "./icons";

const sidebarItems = [
  {
    id: "init",
    name: "Página Inicial",
    route: "inicio",
    icon: Icons.DonutSmallIcon,
    users_type: ["gestor", "admin", "super_user"],
  },
  {
    id: "adm",
    name: "Administrativo",
    route: "adm",
    icon: Icons.ManageAccountsIcon,
    users_type: ["admin", "super_user"],
  },
  {
    id: "calendar",
    name: "Calendário",
    route: "calendario",
    icon: Icons.EditCalendarIcon,
    users_type: ["gestor", "admin", "super_user"],
  },

  {
    id: "school",
    name: "Escola",
    route: "escola",
    icon: Icons.BusinessIcon,
    users_type: ["gestor", "admin", "super_user"],
  },

  {
    id: "student",
    name: "Alunos",
    route: "alunos",
    icon: Icons.GroupsIcon,
    users_type: ["gestor", "admin", "super_user"],
  },

  {
    id: "suport",
    name: "Suporte",
    route: "suporte",
    icon: Icons.SupportAgentIcon,
    users_type: ["gestor", "admin", "super_user"],
  },
].map((item) => {
  return {
    ...item,
    name: item.name.toUpperCase(),
  };
});

export default sidebarItems;
