import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import PeopleIcon from "@material-ui/icons/People";
import AccountBalanceIcon from "@material-ui/icons/AccountBalance";
import DehazeIcon from "@material-ui/icons/Dehaze";
import EqualizerIcon from "@material-ui/icons/Equalizer";
import Container from "@material-ui/core/Container";
import { Link } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.paper,
    marginTop: theme.spacing(2),
  },
  link: {
    textDecoration: "none",
    color: "inherit",
  },
}));

const ListAdminMenus = () => {
  const classes = useStyles();

  return (
    <Container className={classes.root} maxWidth="md">
      <Grid container>
        <Grid item xs={6} sm={4} md={3}>
          <Link to="/dashboard/banks" className={classes.link}>
            <ListItem button>
              <ListItemIcon>
                <AccountBalanceIcon />
              </ListItemIcon>
              <ListItemText primary="Bancos" />
            </ListItem>
          </Link>
        </Grid>
        <Grid item xs={6} sm={4} md={3}>
          <Link to="/dashboard/services" className={classes.link}>
            <ListItem button>
              <ListItemIcon>
                <DehazeIcon />
              </ListItemIcon>
              <ListItemText primary="Servicios" />
            </ListItem>
          </Link>
        </Grid>
        <Grid item xs={6} sm={4} md={3}>
          <Link to="/dashboard/interests" className={classes.link}>
            <ListItem button>
              <ListItemIcon>
                <EqualizerIcon />
              </ListItemIcon>
              <ListItemText primary="Tasas de Interés" />
            </ListItem>
          </Link>
        </Grid>
        <Grid item xs={6} sm={4} md={3}>
          <Link to="/dashboard/users" className={classes.link}>
            <ListItem button>
              <ListItemIcon>
                <PeopleIcon />
              </ListItemIcon>
              <ListItemText primary="Lista de Usuarios" />
            </ListItem>
          </Link>
        </Grid>
      </Grid>
    </Container>
  );
};

export default ListAdminMenus;
