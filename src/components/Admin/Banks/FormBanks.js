import { Button, TextField, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Redirect } from "react-router-dom";
import { useParams } from "react-router-dom";
import Swal from "sweetalert2";
import { createBankApi, updateBankApi } from "../../../api/banks";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    alignItems: "center",
    flexDirection: "column",
  },
}));

const FormBanks = ({ mode, bank }) => {
  const classes = useStyles();
  const { id } = useParams();
  const { register, errors, handleSubmit } = useForm();
  const [redirectToList, setRedirectToList] = useState(false);
  const [inputs, setInputs] = useState({
    name_bank: mode === "create" ? "" : bank.name_bank,
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
      const response = await createBankApi(data);
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
      const response = await updateBankApi(id, data);
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
  if (redirectToList) return <Redirect to="/dashboard/banks" />;
  return (
    <form onSubmit={handleSubmit(onSubmit)} className={classes.root}>
      <TextField
        label="Nombre del banco"
        variant="outlined"
        color="secondary"
        fullWidth
        type="text"
        name="name_bank"
        onChange={handleChange}
        defaultValue={inputs.name_bank}
        inputRef={register({
          required: { value: true, message: "Campo obligatorio" },
          minLength: { value: 3, message: "Mínimo 3 caracteres" },
          maxLength: { value: 60, message: "Máximo 60 caracteres" },
        })}
      />
      <Typography variant="body1" display="block" color="error" gutterBottom>
        {errors?.name_bank?.message}
      </Typography>
      <Button variant="contained" color="secondary" type="submit">
        {mode === "create" ? "Crear" : "Actualizar"}
      </Button>
    </form>
  );
};

export default FormBanks;
