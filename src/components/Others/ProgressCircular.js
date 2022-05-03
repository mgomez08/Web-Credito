import React from "react";
import { Grid, Typography, CircularProgress } from "@material-ui/core";

export const ProgressCircular = ({ variantMessage, message }) => {
  return (
    <Grid container direction="column" justify="center" alignItems="center">
      <Typography
        variant={variantMessage}
        align="center"
        color="secondary"
        style={{ padding: 30 }}
      >
        {message}
      </Typography>
      <CircularProgress
        color="secondary"
        size={100}
        style={{ marginBottom: 200 }}
      />
    </Grid>
  );
};
