import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  Button,
  makeStyles,
  IconButton,
  Hidden,
  Menu,
  MenuItem,
} from "@material-ui/core";
import clsx from "clsx";
import { Link } from "react-router-dom";
import ArrowForwardIosIcon from "@material-ui/icons/ArrowForwardIos";
import MenuIcon from "@material-ui/icons/Menu";
import Logo from "../../../assets/img/png/Logo.png";
import { ExpandLess, ExpandMore } from "@material-ui/icons";

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
  inlineBlock: {
    display: "inline-block",
  },
  textLink: {
    color: "#000",
    textDecoration: "none",
  },
  offset: theme.mixins.toolbar,
}));

export default function MenuTop({ open, handleDrawerOpen, menus }) {
  const [anchorEl, setAnchorEl] = useState(null);
  const classes = useStyles();
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
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
                if (menu.hasButton) {
                  return (
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
                  );
                }

                if (menu.hasSubMenus) {
                  return (
                    <div className={classes.inlineBlock} key={index}>
                      <Button
                        color="inherit"
                        aria-controls="simple-menu"
                        aria-haspopup="true"
                        onClick={handleClick}
                      >
                        {menu.name}
                        {Boolean(anchorEl) ? <ExpandLess /> : <ExpandMore />}
                      </Button>
                      <Menu
                        id="simple-menu"
                        anchorEl={anchorEl}
                        keepMounted
                        open={Boolean(anchorEl)}
                        onClose={handleClose}
                      >
                        {menu.subMenus.map((subMenu, index) => {
                          return (
                            <Link
                              className={classes.textLink}
                              to={subMenu.link}
                              key={index}
                            >
                              <MenuItem onClick={handleClose}>
                                {subMenu.name}
                              </MenuItem>
                            </Link>
                          );
                        })}
                      </Menu>
                    </div>
                  );
                }

                return (
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
