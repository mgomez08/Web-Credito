import React from "react";
import PersonIcon from "@material-ui/icons/Person";
import PersonAddIcon from "@material-ui/icons/PersonAdd";

const Menus = [
  {
    name: "Iniciar Sesión",
    icon: <PersonIcon />,
    link: "/login",
  },
  {
    name: "Registrarse",
    icon: <PersonAddIcon />,
    link: "/register",
    hasButton: true,
  },
];

export default Menus;
