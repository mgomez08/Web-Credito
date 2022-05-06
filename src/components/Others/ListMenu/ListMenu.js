import React, { useState } from "react";
import {
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { Link } from "react-router-dom";
import "./ListMenu.scss";
import ExpandLess from "@material-ui/icons/ExpandLess";
import ExpandMore from "@material-ui/icons/ExpandMore";
import Collapse from "@material-ui/core/Collapse";

const useStyles = makeStyles((theme) => ({
  nested: {
    paddingLeft: theme.spacing(4),
  },
}));

const ListMenu = ({ menus, handleDrawerClose }) => {
  const [open, setOpen] = useState(false);
  const classes = useStyles();

  const handleClick = () => {
    setOpen(!open);
  };
  return (
    <div className="list-menu">
      <List component="nav" aria-label="main mailbox folders">
        {menus.map((menu, index) => {
          if (menu.hasDivider) {
            return (
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
            );
          }

          if (menu.hasSubMenus) {
            return (
              <div className="special" key={index}>
                <ListItem button onClick={handleClick}>
                  <ListItemIcon>{menu.icon}</ListItemIcon>
                  <ListItemText primary={menu.name} />
                  {open ? <ExpandLess /> : <ExpandMore />}
                </ListItem>
                <Collapse in={open} timeout="auto" unmountOnExit>
                  <List component="div" disablePadding>
                    {menu.subMenus.map((subMenu, index) => {
                      return (
                        <Link to={subMenu.link} key={index}>
                          <ListItem
                            button
                            className={classes.nested}
                            onClick={handleDrawerClose}
                          >
                            <ListItemIcon>{subMenu.icon}</ListItemIcon>
                            <ListItemText primary={subMenu.name} />
                          </ListItem>
                        </Link>
                      );
                    })}
                  </List>
                </Collapse>
              </div>
            );
          }

          return (
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
