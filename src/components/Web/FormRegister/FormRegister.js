import React, { useState } from "react";
import {
  Grid,
  FormControl,
  InputLabel,
  Select,
  Checkbox,
  FormControlLabel,
  Button,
  TextField,
  Typography,
  Snackbar,
  InputAdornment,
  IconButton,
} from "@material-ui/core";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import Alert from "@material-ui/lab/Alert";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import { signUpApi } from "../../../api/auth";
import "./FormRegister.scss";
import { Link, Redirect } from "react-router-dom";
import { useForm } from "react-hook-form";

export default function FormRegister() {
  const { register, errors, handleSubmit } = useForm();
  const [openSuccess, setOpenSuccess] = useState(false);
  const [redirect, setRedirect] = useState(false);
  const [openError, setOpenError] = useState(false);
  const [message, setMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [inputs, setInputs] = useState({
    typedoc: "",
    ndoc: "",
    names: "",
    lastname: "",
    email: "",
    tel: "",
    password: "",
    passwordRepeat: "",
    privacyPolicy: false,
    showPassword: false,
  });
  if (redirect) {
    return (
      <Redirect
        to={{
          pathname: "/login",
          state: { register: true },
        }}
      />
    );
  }
  const handleChange = (e) => {
    if (e.target.type === "checkbox") {
      setInputs({
        ...inputs,
        [e.target.name]: e.target.checked,
      });
    } else {
      setInputs({
        ...inputs,
        [e.target.name]: e.target.value,
      });
    }
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
    if (inputs.password !== inputs.passwordRepeat) {
      setMessage("Las contraseñas deben ser iguales");
      handleClick("error");
    } else {
      const result = await signUpApi(inputs);
      if (!result.ok) {
        setMessage(result.message);
        handleClick("error");
      } else {
        setMessage(result.message);
        handleClick("success");
        e.target.reset();
        setInputs({
          privacyPolicy: false,
        });
        setRedirect(true);
      }
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
        className="form-register"
      >
        <Grid item xs={12} lg={6}>
          <FormControl variant="outlined" color="secondary" fullWidth={true}>
            <InputLabel htmlFor="type-doc">Tipo de Documento</InputLabel>
            <Select
              native
              name="typedoc"
              defaultValue={inputs.typedoc}
              onChange={handleChange}
              label="Tipo de Documento"
              inputRef={register({
                required: { value: true, message: "Campo obligatorio" },
              })}
            >
              <option aria-label="None" />
              <option value={"CC"}>Cédula de Ciudadanía</option>
              <option value={"CT"}>Cédula de Extranjería</option>
            </Select>
          </FormControl>
          <Typography
            variant="body1"
            display="block"
            color="error"
            gutterBottom
          >
            {errors?.typedoc?.message}
          </Typography>
        </Grid>
        <Grid item xs={12} lg={6}>
          <TextField
            label="Número de Identificación"
            variant="outlined"
            color="secondary"
            fullWidth
            type="number"
            name="ndoc"
            onChange={handleChange}
            defaultValue={inputs.ndoc}
            inputRef={register({
              required: { value: true, message: "Campo obligatorio" },
              minLength: {
                value: 8,
                message:
                  "El número de identificación debe tener mínimo 8 digitos",
              },
              pattern: {
                value: /^[^.,-]?\d+$/i,
                message: "Solo puede ingresar números enteros y positivos.",
              },
            })}
          />
          <Typography
            variant="body1"
            display="block"
            color="error"
            gutterBottom
          >
            {errors?.ndoc?.message}
          </Typography>
        </Grid>
        <Grid item xs={12} lg={6}>
          <TextField
            label="Nombres"
            color="secondary"
            variant="outlined"
            fullWidth
            name="names"
            onChange={handleChange}
            defaultValue={inputs.names}
            inputRef={register({
              required: { value: true, message: "Campo obligatorio" },
              pattern: {
                value: /^([a-z ñáéíóú])+$/i,
                message: "Solo puede ingresar letras en su nombre",
              },
              maxLength: {
                value: 60,
                message: "Solo se aceptan 60 caracteres como máximo.",
              },
            })}
          />
          <Typography
            variant="body1"
            display="block"
            color="error"
            gutterBottom
          >
            {errors?.names?.message}
          </Typography>
        </Grid>
        <Grid item xs={12} lg={6}>
          <TextField
            label="Apellidos"
            variant="outlined"
            color="secondary"
            fullWidth
            name="lastname"
            onChange={handleChange}
            defaultValue={inputs.lastname}
            inputRef={register({
              required: { value: true, message: "Campo obligatorio" },
              pattern: {
                value: /^([a-z ñáéíóú])+$/i,
                message: "Solo puede ingresar letras en su apellido",
              },
              maxLength: {
                value: 60,
                message: "Solo se aceptan 60 caracteres como máximo.",
              },
            })}
          />
          <Typography
            variant="body1"
            display="block"
            color="error"
            gutterBottom
          >
            {errors?.lastname?.message}
          </Typography>
        </Grid>
        <Grid item xs={12} lg={6}>
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
              /* eslint-disable-next-line */
              pattern: {
                value:
                  /^([a-zA-Z0-9_.-])+@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/,
                message: "El correo electrónico ingresado no es valido",
              },
              maxLength: {
                value: 100,
                message: "Solo se aceptan 100 caracteres como máximo.",
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
        <Grid item xs={12} lg={6}>
          <TextField
            label=" Celular"
            variant="outlined"
            color="secondary"
            fullWidth
            type="number"
            name="tel"
            onChange={handleChange}
            defaultValue={inputs.tel}
            inputRef={register({
              required: { value: true, message: "Campo obligatorio" },
              minLength: {
                value: 10,
                message: "El número de celular debe tener mínimo 10 digitos",
              },
              maxLength: {
                value: 10,
                message: "El número de celular debe tener máxima 10 digitos",
              },
              pattern: {
                value: /^[^.,-]?\d+$/i,
                message: "Solo puede ingresar números enteros y positivos.",
              },
            })}
          />
          <Typography
            variant="body1"
            display="block"
            color="error"
            gutterBottom
          >
            {errors?.tel?.message}
          </Typography>
        </Grid>
        <Grid item xs={12} lg={6}>
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
            {errors?.password?.message}
          </Typography>
        </Grid>
        <Grid item xs={12} lg={6}>
          <TextField
            label="Repetir Contraseña"
            variant="outlined"
            color="secondary"
            fullWidth
            name="passwordRepeat"
            type={showPassword ? "text" : "password"}
            onChange={handleChange}
            defaultValue={inputs.passwordRepeat}
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
            {errors?.passwordRepeat?.message}
          </Typography>
        </Grid>
        <Grid
          container
          spacing={1}
          direction="column"
          justify="center"
          alignItems="center"
        >
          <Grid item xs={12}>
            <FormControlLabel
              control={
                <Checkbox
                  name="privacyPolicy"
                  onChange={handleChange}
                  checked={inputs.privacyPolicy}
                  color="primary"
                  inputRef={register({
                    required: {
                      value: true,
                      message:
                        "Es necesario aceptar los términos para registrarse en MiCrédito",
                    },
                  })}
                />
              }
              label="He leído y acepto los Términos Legales y la Política de Privacidad de MiCrédito"
            />
          </Grid>
          <Grid item xs={12}>
            <Typography
              variant="body1"
              display="block"
              color="error"
              gutterBottom
            >
              {errors?.privacyPolicy?.message}
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Button
              type="submit"
              size="large"
              variant="contained"
              color="primary"
              endIcon={<ExitToAppIcon />}
            >
              Registrarme
            </Button>
          </Grid>
          <Grid item xs={12}>
            <Typography
              align="center"
              variant="h6"
              color="initial"
              onClick={window.scroll(0, 0)}
            >
              ¿Ya estás registrado? <Link to="/login">Inicia sesión aquí</Link>
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
