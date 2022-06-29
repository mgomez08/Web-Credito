import { Button, TextField, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Redirect } from "react-router-dom";
import { useParams } from "react-router-dom";
import Swal from "sweetalert2";
import { createServiceApi, updateServiceApi } from "../../../api/services";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    alignItems: "center",
    flexDirection: "column",
  },
}));

const FormServices = ({ mode, service }) => {
  const classes = useStyles();
  const { id } = useParams();
  const { register, errors, handleSubmit } = useForm();
  const [redirectToList, setRedirectToList] = useState(false);
  const [inputs, setInputs] = useState({
    name_service: mode === "create" ? "" : service.name_service,
  });
  const handleChange = (e) => {
    setInputs({
      ...inputs,
      [e.target.name]: e.target.value,
    });
  };
  const onSubmit = async (data, e) => {
    e.preventDefault();
    if (mode === "create") {
      const response = await createServiceApi(data);
      if (response.ok) {
        Swal.fire({
          icon: "success",
          title: response.msg,
          showConfirmButton: false,
          timer: 1500,
        });
        setRedirectToList(true);
      } else {
        Swal.fire({
          icon: "error",
          title: response.msg,
          showConfirmButton: false,
          timer: 1500,
        });
      }
    } else {
      const response = await updateServiceApi(id, data);
      if (response.ok) {
        Swal.fire({
          icon: "success",
          title: response.msg,
          showConfirmButton: false,
          timer: 1500,
        });
        setRedirectToList(true);
      } else {
        Swal.fire({
          icon: "error",
          title: response.msg,
          showConfirmButton: false,
          timer: 1500,
        });
      }
    }
  };
  if (redirectToList) return <Redirect to="/dashboard/services" />;
  return (
    <form onSubmit={handleSubmit(onSubmit)} className={classes.root}>
      <TextField
        label="Nombre del servicio"
        variant="outlined"
        color="secondary"
        fullWidth
        type="text"
        name="name_service"
        onChange={handleChange}
        defaultValue={inputs.name_service}
        inputRef={register({
          required: { value: true, message: "Campo obligatorio" },
          minLength: { value: 3, message: "Mínimo 3 caracteres" },
          maxLength: { value: 60, message: "Máximo 60 caracteres" },
        })}
      />
      <Typography variant="body1" display="block" color="error" gutterBottom>
        {errors?.name_service?.message}
      </Typography>
      <Button variant="contained" color="secondary" type="submit">
        {mode === "create" ? "Crear" : "Actualizar"}
      </Button>
    </form>
  );
};

export default FormServices;
