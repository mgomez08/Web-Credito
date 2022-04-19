import React, { useState } from "react";
import {
  Button,
  TextField,
  Grid,
  Typography,
  InputAdornment,
  IconButton,
  Snackbar,
} from "@material-ui/core";

import Alert from "@material-ui/lab/Alert";

import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";

import { makeStyles } from "@material-ui/core/styles";
import { useForm } from "react-hook-form";
import { changePasswordApi } from "../../../api/user";
import { getAccessTokenApi } from "../../../api/auth";

const useStyles = makeStyles((theme) => ({
  form: {
    width: "100%",
    marginTop: theme.spacing(3),
  },
  button: {
    marginTop: theme.spacing(2),
  },
}));

export const FormPassword = () => {
  const { register, errors, handleSubmit } = useForm();
  const [showPassword, setShowPassword] = useState(false);
  const [openSuccess, setOpenSuccess] = useState(false);
  const [openError, setOpenError] = useState(false);
  const [message, setMessage] = useState("");
  const [passwordForm, setPasswordForm] = useState({
    currentPassword: "",
    newPassword: "",
    repeatPassword: "",
  });
  const handleChange = (e) => {
    setPasswordForm({
      ...passwordForm,
      [e.target.name]: e.target.value,
    });
  };
  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };
  const handleMouseDownPassword = (e) => {
    e.preventDefault();
  };
  const handleClick = (typemessage) => {
    if (typemessage === "error") {
      setOpenError(true);
    } else if (typemessage === "success") {
      setOpenSuccess(true);
    }
  };
  const handleClose = () => {
    setOpenError(false);
    setOpenSuccess(false);
  };

  const onSubmitPassword = async (data, e) => {
    e.preventDefault();
    if (data.newPassword !== data.repeatPassword) {
      setMessage("Las contraseñas nuevas deben ser iguales.");
      handleClick("error");
    } else {
      const result = await changePasswordApi(data, getAccessTokenApi());
      if (result.ok) {
        setMessage(result.msg);
        handleClick("success");
        e.target.reset();
      } else {
        setMessage(result.msg);
        handleClick("error");
      }
    }
  };
  const classes = useStyles();
  return (
    <form onSubmit={handleSubmit(onSubmitPassword)} className={classes.form}>
      <Grid
        container
        direction="row"
        justify="space-between"
        alignItems="center"
        spacing={4}
      >
        <Grid item xs={12} lg={6}>
          <TextField
            label="Contraseña actual"
            variant="outlined"
            color="secondary"
            fullWidth
            name="currentPassword"
            type={showPassword ? "text" : "password"}
            onChange={handleChange}
            defaultValue={passwordForm.currentPassword}
            inputRef={register({
              required: { value: true, message: "Campo obligatorio" },
            })}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                  >
                    {showPassword ? <Visibility /> : <VisibilityOff />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
          <Typography
            variant="body1"
            display="block"
            color="error"
            gutterBottom
          >
            {errors?.currentPassword?.message}
          </Typography>
        </Grid>
        <Grid item xs={12} lg={6}>
          <TextField
            label="Contraseña nueva"
            variant="outlined"
            color="secondary"
            fullWidth
            name="newPassword"
            type={showPassword ? "text" : "password"}
            onChange={handleChange}
            defaultValue={passwordForm.newPassword}
            inputRef={register({
              required: { value: true, message: "Campo obligatorio" },
              minLength: {
                value: 6,
                message: "La contraseña debe tener mínimo 6 caracteres",
              },
            })}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                  >
                    {showPassword ? <Visibility /> : <VisibilityOff />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
          <Typography
            variant="body1"
            display="block"
            color="error"
            gutterBottom
          >
            {errors?.newPassword?.message}
          </Typography>
        </Grid>
        <Grid item xs={12} lg={6}>
          <TextField
            label="Repetir contraseña nueva"
            variant="outlined"
            color="secondary"
            fullWidth
            name="repeatPassword"
            type={showPassword ? "text" : "password"}
            onChange={handleChange}
            defaultValue={passwordForm.repeatPassword}
            inputRef={register({
              required: { value: true, message: "Campo obligatorio" },
              minLength: {
                value: 6,
                message: "La contraseña debe tener mínimo 6 caracteres",
              },
            })}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                  >
                    {showPassword ? <Visibility /> : <VisibilityOff />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
          <Typography
            variant="body1"
            display="block"
            color="error"
            gutterBottom
          >
            {errors?.repeatPassword?.message}
          </Typography>
        </Grid>
        <Grid container direction="column" justify="center" alignItems="center">
          <Grid item xs={12}>
            <Button
              type="submit"
              variant="contained"
              color="secondary"
              className={classes.button}
            >
              Cambiar contraseña
            </Button>
          </Grid>
          <Snackbar
            anchorOrigin={{ vertical: "top", horizontal: "right" }}
            open={openSuccess}
            autoHideDuration={4000}
            onClose={handleClose}
          >
            <Alert onClose={handleClose} variant="filled" severity="success">
              {message}
            </Alert>
          </Snackbar>
          <Snackbar
            anchorOrigin={{ vertical: "top", horizontal: "right" }}
            open={openError}
            autoHideDuration={4000}
            onClose={handleClose}
          >
            <Alert onClose={handleClose} variant="filled" severity="error">
              {message}
            </Alert>
          </Snackbar>
        </Grid>
      </Grid>
    </form>
  );
};
