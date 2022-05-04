import React from "react";
import AppsIcon from "@material-ui/icons/Apps";
import PersonIcon from "@material-ui/icons/Person";
import { logout } from "../../../api/auth";

const Menus = [
  {
    name: "Panel de Administrador",
    icon: <AppsIcon />,
    link: "/dashboard",
  },
  {
    name: "Cerrar Sesión",
    icon: <PersonIcon />,
    link: "/login",
    action: () => {
      logout();
      window.location.reload();
    },
    hasDivider: true,
    hasAction: true,
    hasButton: true,
  },
];

export default Menus;
