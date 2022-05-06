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
    name: "Perfil",
    icon: <PersonPinIcon />,
    hasSubMenus: true,
    subMenus: [
      {
        name: "Editar Perfil",
        icon: <PersonIcon />,
        link: "/perfil",
      },
      {
        name: "Cambiar Contraseña",
        icon: <VpnKeyIcon />,
        link: "/changepassword",
      },
    ],
  },
  {
    name: "Scoring",
    icon: <ScoreIcon />,
    link: "/calcular-scoring",
  },
  {
    name: "Simulación de Créditos",
    icon: <LocalAtmIcon />,
    link: "/simulacion-creditos",
  },
  {
    name: "Bancos",
    icon: <AccountBalanceIcon />,
    link: "/banks",
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
