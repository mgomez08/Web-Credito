import React, { useState } from "react";
import FormGroup from "@material-ui/core/FormGroup";
import { withStyles } from "@material-ui/core/styles";
import Switch from "@material-ui/core/Switch";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { changeStatusUserApi } from "../../../api/admin";
import Swal from "sweetalert2";

const SwitchCustom = withStyles((theme) => ({
  switchBase: {
    "&$checked": {
      transform: "translateX(16px)",
      color: theme.palette.common.white,
      "& + $track": {
        backgroundColor: "#52d869",
        opacity: 1,
        border: "none",
      },
    },
    "&$focusVisible $thumb": {
      color: "#52d869",
      border: "6px solid #fff",
    },
  },
  thumb: {},
  track: {
    border: `1px solid ${theme.palette.error.main}`,
    backgroundColor: theme.palette.error.light,
    opacity: 1,
    transition: theme.transitions.create(["background-color", "border"]),
  },
  checked: {},
  focusVisible: {},
}))(({ classes, ...props }) => {
  return (
    <Switch
      focusVisibleClassName={classes.focusVisible}
      disableRipple
      classes={{
        switchBase: classes.switchBase,
        track: classes.track,
        checked: classes.checked,
      }}
      {...props}
    />
  );
});

const SwitchActiveUser = ({ active, id }) => {
  const [state, setState] = useState(active);
  const [loading, setLoading] = useState(false);
  const handleChange = async (event) => {
    event.persist();
    setLoading(true);
    const result = await changeStatusUserApi(id, event.target.checked);
    if (result.ok) {
      setState(result.data.active);
      setLoading(false);
    } else {
      setLoading(false);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: result.msg,
      });
    }
  };
  return (
    <FormGroup>
      <Typography component="div">
        <Grid component="label" container alignItems="center" spacing={1}>
          <Grid item>Inactivo</Grid>
          <Grid item>
            <SwitchCustom
              onChange={handleChange}
              checked={state}
              name="status"
              disabled={loading}
            />
          </Grid>
          <Grid item>Activo</Grid>
        </Grid>
      </Typography>
    </FormGroup>
  );
};

export default SwitchActiveUser;
