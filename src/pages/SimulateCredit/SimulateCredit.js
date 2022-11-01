import React from "react";
import { Grid, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import ContentSimulateCredit from "../../components/User/SimulateCredit/ContentSimulateCredit";

const SimulateCredit = () => {
  const useStyles = makeStyles((theme) => ({
    content: {
      [theme.breakpoints.up("md")]: {
        alignItems: "flex-start",
      },
      [theme.breakpoints.down("sm")]: {
        alignItems: "center",
      },
    },
    title: {
      paddingBottom: theme.spacing(2),
    },
  }));
  const classes = useStyles();
  return (
    <Grid container justify="center" alignItems="center">
      <Grid item xs={1} md={1} />
      <Grid item xs={10} md={10}>
        <Typography
          color="initial"
          align="center"
          variant="h2"
          className={classes.title}
        >
          Simule su Crédito con cualquier banco
        </Typography>
        <Grid
          container
          direction="row"
          justify="center"
          className={classes.content}
        >
          <ContentSimulateCredit />
        </Grid>
      </Grid>
      <Grid item xs={1} md={1} />
    </Grid>
  );
};

export default SimulateCredit;
