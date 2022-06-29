import React from "react";
import "./NavigationFooter.scss";
import { Typography, Grid } from "@material-ui/core";
import { Link } from "react-router-dom";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import useAuth from "../../../../hooks/useAuth";
import MenusAdmin from "../../../Admin/Menus/Menus";
import MenusUser from "../../../User/Menus/Menus";
import MenusWeb from "../../../Web/Menus/Menus";

export default function NavigationFooter() {
  const { user } = useAuth();
  return (
    <Grid className="navigation" container>
      <Grid item xs={12}>
        <Typography variant="h4">Navegación</Typography>
      </Grid>
      <Grid item xs={6} sm={6} md={6}>
        <RenderListLeft
          user={user}
          menus={user ? (user.role === 1 ? MenusUser : MenusAdmin) : MenusWeb}
        />
      </Grid>
      <Grid item xs={6} sm={6} md={6}>
        <RenderListRight
          user={user}
          menus={user ? (user.role === 1 ? MenusUser : MenusAdmin) : MenusWeb}
        />
      </Grid>
    </Grid>
  );
}

function RenderListLeft({ menus }) {
  return (
    <List component="ul">
      {menus.map((menu, index) => {
        if (
          index % 2 === 0 &&
          menu.hasAction === false &&
          menu.hasSubMenus === false
        ) {
          return (
            <ListItem key={index}>
              <Link to={menu.link}>
                {menu.icon}
                {menu.name}
              </Link>
            </ListItem>
          );
        }
        if (index % 2 === 0 && menu.hasSubMenus) {
          return menu.subMenus.map((subMenu, index) => {
            return (
              <ListItem key={index}>
                <Link to={subMenu.link}>
                  {subMenu.icon}
                  {subMenu.name}
                </Link>
              </ListItem>
            );
          });
        }
        return null;
      })}
    </List>
  );
}
function RenderListRight({ menus }) {
  return (
    <List component="ul">
      {menus.map((menu, index) => {
        if (
          index % 2 > 0 &&
          menu.hasAction === false &&
          menu.hasSubMenus === false
        ) {
          return (
            <ListItem key={index}>
              <Link to={menu.link}>
                {menu.icon}
                {menu.name}
              </Link>
            </ListItem>
          );
        }
        if (index % 2 > 0 && menu.hasSubMenus) {
          return menu.subMenus.map((subMenu, index) => {
            return (
              <ListItem key={index}>
                <Link to={subMenu.link}>
                  {subMenu.icon}
                  {subMenu.name}
                </Link>
              </ListItem>
            );
          });
        }
        return null;
      })}
    </List>
  );
}
