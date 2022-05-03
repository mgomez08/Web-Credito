import React from "react";
import PersonPinIcon from "@material-ui/icons/PersonPin";
import ScoreIcon from "@material-ui/icons/Score";
import PersonIcon from "@material-ui/icons/Person";
import AccountBalanceIcon from "@material-ui/icons/AccountBalance";
import VpnKeyIcon from "@material-ui/icons/VpnKey";
import { logout } from "../../../api/auth";

const Menus = [
  {
    name: "Perfil",
    icon: <PersonPinIcon />,
    link: "/perfil",
  },
  {
    name: "Scoring",
    icon: <ScoreIcon />,
    link: "/calcular-scoring",
  },
  {
    name: "Bancos",
    icon: <AccountBalanceIcon />,
    link: "/banks",
  },
  {
    name: "Cambiar Contraseña",
    icon: <VpnKeyIcon />,
    link: "/changepassword",
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
