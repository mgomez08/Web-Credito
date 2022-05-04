import React, { useState } from "react";
import "./LayoutBasic.scss";
import { makeStyles } from "@material-ui/core";
import MenuTop from "../components/Others/Header/MenuTop";
import Drawer from "../components/Others/Header/Drawer";
import MenusWeb from "../components/Web/Menus/Menus";
import MenusUser from "../components/User/Menus/Menus";
import MenusAdmin from "../components/Admin/Menus/Menus";
import useAuth from "../hooks/useAuth";

const styles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "column",
  },
  content: {
    flexGrow: 1,
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    mmarginRight: -240,
  },
  contentShift: {
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginRight: 0,
  },
}));

export default function LayoutBasic() {
  const classes = styles();
  const [open, setOpen] = useState(false);

  const { user } = useAuth();

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <div className={classes.root}>
      <MenuTop
        menus={user ? (user.role === 1 ? MenusUser : MenusAdmin) : MenusWeb}
        open={open}
        handleDrawerOpen={handleDrawerOpen}
      />
      <Drawer
        menus={user ? (user.role === 1 ? MenusUser : MenusAdmin) : MenusWeb}
        open={open}
        handleDrawerClose={handleDrawerClose}
      />
    </div>
  );
}
