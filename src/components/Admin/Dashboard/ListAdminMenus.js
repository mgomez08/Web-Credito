import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import PeopleIcon from "@material-ui/icons/People";
import Container from "@material-ui/core/Container";

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.paper,
    marginTop: theme.spacing(2),
  },
}));

const ListAdminMenus = () => {
  const classes = useStyles();

  return (
    <Container className={classes.root} maxWidth="md">
      <Grid container>
        <Grid item xs={6} sm={4} md={3}>
          <ListItem button>
            <ListItemIcon>
              <PeopleIcon />
            </ListItemIcon>
            <ListItemText primary="Lista de Usuarios" />
          </ListItem>
        </Grid>
        <Grid item xs={6} sm={4} md={3}>
          <ListItem button>
            <ListItemIcon>
              <PeopleIcon />
            </ListItemIcon>
            <ListItemText primary="Lista de Bancos" />
          </ListItem>
        </Grid>
        <Grid item xs={6} sm={4} md={3}>
          <ListItem button>
            <ListItemIcon>
              <PeopleIcon />
            </ListItemIcon>
            <ListItemText primary="Lista de Usuarios" />
          </ListItem>
        </Grid>
        <Grid item xs={6} sm={4} md={3}>
          <ListItem button>
            <ListItemIcon>
              <PeopleIcon />
            </ListItemIcon>
            <ListItemText primary="Lista de Usuarios" />
          </ListItem>
        </Grid>
      </Grid>
    </Container>
  );
};

export default ListAdminMenus;
