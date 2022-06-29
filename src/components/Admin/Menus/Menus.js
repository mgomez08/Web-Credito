import React from "react";
import AppsIcon from "@material-ui/icons/Apps";
import PersonIcon from "@material-ui/icons/Person";
import { logout } from "../../../api/auth";

const Menus = [
  {
    hasAction: false,
    hasButton: false,
    hasDivider: false,
    hasSubMenus: false,
    icon: <AppsIcon />,
    link: "/dashboard",
    name: "Panel de Administrador",
  },
  {
    action: () => {
      logout();
      window.location.reload();
    },
    hasAction: true,
    hasButton: true,
    hasDivider: true,
    hasSubMenus: false,
    icon: <PersonIcon />,
    link: "/login",
    name: "Cerrar Sesión",
  },
];

export default Menus;
