import React, { useState } from "react";
import {
  Grid,
  TextField,
  Button,
  Typography,
  Snackbar,
} from "@material-ui/core";
import Alert from "@material-ui/lab/Alert";
import InputAdornment from "@material-ui/core/InputAdornment";
import IconButton from "@material-ui/core/IconButton";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import "./FormLogin.scss";
import { signInApi } from "../../../api/auth";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";

export default function FormLogin() {
  const { register, errors, handleSubmit } = useForm();
  const [openSuccess, setOpenSuccess] = useState(false);
  const [openError, setOpenError] = useState(false);
  const [message, setMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [inputs, setInputs] = useState({
    email: "",
    password: "",
  });
  const handleChange = (e) => {
    setInputs({
      ...inputs,
      [e.target.name]: e.target.value,
    });
  };
  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  const handleClick = (typemessage) => {
    if (typemessage === "error") {
      setOpenError(true);
    } else {
      setOpenSuccess(true);
    }
  };
  const handleClose = () => {
    setOpenError(false);
    setOpenSuccess(false);
  };
  const onSubmit = async (data, e) => {
    e.preventDefault();
    const result = await signInApi(inputs);
    if (!result.ok) {
      setMessage(result.msg);
      handleClick("error");
    } else {
      setMessage("Login correcto, redirigiendo");
      handleClick("success");
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Grid
        container
        direction="row"
        justify="center"
        alignItems="center"
        spacing={3}
        className="form-login"
      >
        <Grid item xs={12}>
          <TextField
            label="Correo Electrónico"
            variant="outlined"
            color="secondary"
            fullWidth
            type="email"
            name="email"
            onChange={handleChange}
            defaultValue={inputs.email}
            inputRef={register({
              required: { value: true, message: "Campo obligatorio" },
              pattern: {
                value:
                  /^([a-zA-Z0-9_.-])+@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/,
                message: "El correo electrónico ingresado no es valido",
              },
            })}
          />
          <Typography
            variant="body1"
            display="block"
            color="error"
            gutterBottom
          >
            {errors?.email?.message}
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <TextField
            label="Contraseña"
            variant="outlined"
            color="secondary"
            fullWidth
            name="password"
            type={showPassword ? "text" : "password"}
            onChange={handleChange}
            defaultValue={inputs.password}
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
            {errors?.password?.message}
          </Typography>
        </Grid>
        <Grid container direction="column" justify="center" alignItems="center">
          <Grid item xs={12}>
            <Button
              size="large"
              variant="contained"
              color="primary"
              type="submit"
            >
              Iniciar Sesión
            </Button>
          </Grid>
          <Grid item xs={12}>
            <Typography
              align="center"
              variant="h6"
              color="initial"
              onClick={window.scroll(0, 0)}
            >
              ¿Aún no estás registrado?
              <Link to="/register"> Regístrate aquí</Link>
            </Typography>
          </Grid>
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
    </form>
  );
}
