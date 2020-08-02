import React from "react";
import {
  AppBar,
  Toolbar,
  Button,
  makeStyles,
  IconButton,
  Hidden,
} from "@material-ui/core";

import clsx from "clsx";
import { Link } from "react-router-dom";
import ArrowForwardIosIcon from "@material-ui/icons/ArrowForwardIos";
import MenuIcon from "@material-ui/icons/Menu";
import Logo from "../../../assets/img/png/Logo.png";
import "./MenuTop.scss";

const useStyles = makeStyles((theme) => ({
  hide: {
    display: "none",
  },
  appBar: {
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    width: `calc(100% - ${240}px)`,
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginRight: 240,
  },

  offset: theme.mixins.toolbar,
}));

export default function MenuTop(props) {
  const classes = useStyles();
  return (
    <div className="menu-top">
      <AppBar
        position="fixed"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: props.open,
        })}
      >
        <Toolbar className="menu-top__toolbar">
          <Link to="/" className="menu-top__title">
            <img src={Logo} alt="MiCrédito" />
          </Link>
          <Hidden smDown>
            <Button href="/menu1" color="inherit">
              Menú 1
            </Button>
            <Button href="/menu2" color="inherit">
              Menú 2
            </Button>
            <Button href="/menu3" color="inherit">
              Menú 3
            </Button>
            <Button href="/login" color="inherit">
              Iniciar Sesión
            </Button>
            <Button
              href="/register"
              color="inherit"
              variant="outlined"
              endIcon={<ArrowForwardIosIcon />}
            >
              Regístrate
            </Button>
          </Hidden>
          <Hidden mdUp>
            <IconButton
              aria-label="open drawer"
              edge="end"
              color="inherit"
              className={clsx(props.open && classes.hide)}
              onClick={() => props.handleDrawerOpen()}
            >
              <MenuIcon />
            </IconButton>
          </Hidden>
        </Toolbar>
      </AppBar>
      <div className={classes.offset}></div>
    </div>
  );
}
