import React from "react";
import PersonPinIcon from "@material-ui/icons/PersonPin";
import ScoreIcon from "@material-ui/icons/Score";
import PersonIcon from "@material-ui/icons/Person";
import AccountBalanceIcon from "@material-ui/icons/AccountBalance";
import VpnKeyIcon from "@material-ui/icons/VpnKey";
import LocalAtmIcon from "@material-ui/icons/LocalAtm";
import { logout } from "../../../api/auth";

const Menus = [
  {
    hasAction: false,
    hasButton: false,
    hasDivider: false,
    hasSubMenus: true,
    icon: <PersonPinIcon />,
    name: "Perfil",
    subMenus: [
      {
        icon: <PersonIcon />,
        link: "/perfil",
        name: "Editar Perfil",
      },
      {
        icon: <VpnKeyIcon />,
        link: "/changepassword",
        name: "Cambiar Contraseña",
      },
    ],
  },
  {
    hasAction: false,
    hasButton: false,
    hasDivider: false,
    hasSubMenus: false,
    icon: <ScoreIcon />,
    link: "/calcular-scoring",
    name: "Scoring",
  },
  {
    hasAction: false,
    hasButton: false,
    hasDivider: false,
    hasSubMenus: false,
    icon: <LocalAtmIcon />,
    link: "/simulate-credit",
    name: "Simulación de Créditos",
  },
  {
    hasAction: false,
    hasButton: false,
    hasDivider: false,
    hasSubMenus: false,
    icon: <AccountBalanceIcon />,
    link: "/banks",
    name: "Bancos",
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
