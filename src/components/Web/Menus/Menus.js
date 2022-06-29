import React from "react";
import PersonIcon from "@material-ui/icons/Person";
import PersonAddIcon from "@material-ui/icons/PersonAdd";

const Menus = [
  {
    hasAction: false,
    hasButton: false,
    hasDivider: false,
    hasSubMenus: false,
    icon: <PersonIcon />,
    link: "/login",
    name: "Iniciar Sesión",
  },
  {
    hasAction: false,
    hasButton: true,
    hasDivider: false,
    hasSubMenus: false,
    icon: <PersonAddIcon />,
    link: "/register",
    name: "Registrarse",
  },
];

export default Menus;
