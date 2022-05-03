import React from "react";
import {
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
} from "@material-ui/core";
import { Link } from "react-router-dom";
import "./ListMenu.scss";

const ListMenu = ({ menus, handleDrawerClose }) => {
  return (
    <div className="list-menu">
      <List component="nav" aria-label="main mailbox folders">
        {menus.map((menu, index) => {
          return menu.hasDivider ? (
            <div className="special" key={index}>
              <Divider />
              <Link to={menu.link}>
                <ListItem
                  button
                  onClick={menu.hasAction ? menu.action : handleDrawerClose}
                >
                  <ListItemIcon>{menu.icon}</ListItemIcon>
                  <ListItemText primary={menu.name} />
                </ListItem>
              </Link>
            </div>
          ) : (
            <Link to={menu.link} key={index}>
              <ListItem button onClick={handleDrawerClose}>
                <ListItemIcon>{menu.icon}</ListItemIcon>
                <ListItemText primary={menu.name} />
              </ListItem>
            </Link>
          );
        })}
      </List>
    </div>
  );
};

export default ListMenu;
