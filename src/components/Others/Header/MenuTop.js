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
  imgSize: {
    [theme.breakpoints.up("md")]: {
      width: "265px",
      height: "57px",
    },
    [theme.breakpoints.down("xs")]: {
      width: "180px",
      height: "40px",
    },
  },
  MuiSpacebetween: {
    justifyContent: "space-between",
  },
  offset: theme.mixins.toolbar,
}));

export default function MenuTop({ open, handleDrawerOpen, menus }) {
  const classes = useStyles();
  return (
    <>
      <AppBar
        position="fixed"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: open,
        })}
      >
        <Toolbar className={classes.MuiSpacebetween}>
          <div className="logo-container">
            <Link to="/">
              <img src={Logo} alt="MiCrédito" className={classes.imgSize} />
            </Link>
          </div>
          <div className="menus">
            <Hidden smDown>
              {menus.map((menu, index) => {
                return menu.hasButton ? (
                  <Link
                    className="MuiButtonBase-root MuiButton-root MuiButton-text MuiButton-colorInherit"
                    to={menu.link}
                    key={index}
                  >
                    <Button
                      color="inherit"
                      variant="outlined"
                      onClick={menu.hasAction && menu.action}
                      endIcon={<ArrowForwardIosIcon />}
                    >
                      {menu.name}
                    </Button>
                  </Link>
                ) : (
                  <Link
                    className="MuiButtonBase-root MuiButton-root MuiButton-text MuiButton-colorInherit"
                    to={menu.link}
                    key={index}
                  >
                    {menu.name}
                  </Link>
                );
              })}
            </Hidden>
            <Hidden mdUp>
              <IconButton
                aria-label="open drawer"
                edge="end"
                color="inherit"
                className={clsx(open && classes.hide)}
                onClick={() => handleDrawerOpen()}
              >
                <MenuIcon />
              </IconButton>
            </Hidden>
          </div>
        </Toolbar>
      </AppBar>
      <div className={classes.offset}></div>
    </>
  );
}
