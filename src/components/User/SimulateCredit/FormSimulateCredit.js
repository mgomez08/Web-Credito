import React from "react";
import {
  Button,
  FormControl,
  InputLabel,
  Select,
  Grid,
  Typography,
  TextField,
  Box,
} from "@material-ui/core";

import { makeStyles } from "@material-ui/core/styles";
import { useForm } from "react-hook-form";

const useStyles = makeStyles((theme) => ({
  form: {
    width: "100%",
    marginTop: theme.spacing(3),
  },
  button: {
    marginTop: theme.spacing(-1),
  },
  container: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
  },
}));

const FormSimulateCredit = ({
  data,
  simulateCreditForm,
  setSimulateCreditForm,
  onSubmitSimulateCredit,
}) => {
  const { register, errors, handleSubmit } = useForm();

  const handleChange = (e) => {
    if (e.target.name === "bank") {
      return setSimulateCreditForm({
        ...simulateCreditForm,
        service: "",
        [e.target.name]: e.target.value,
      });
    }
    setSimulateCreditForm({
      ...simulateCreditForm,
      [e.target.name]: e.target.value,
    });
  };
  const classes = useStyles();

  return (
    <form
      onSubmit={handleSubmit(onSubmitSimulateCredit)}
      className={classes.form}
    >
      <Grid
        container
        direction="row"
        justify="space-between"
        alignItems="center"
        spacing={2}
      >
        <Grid item xs={12} lg={6}>
          <TextField
            label="Cantidad de Dinero"
            color="secondary"
            variant="outlined"
            fullWidth
            name="amount"
            type="number"
            onChange={handleChange}
            defaultValue={simulateCreditForm.amount}
            inputRef={register({
              required: { value: true, message: "Campo obligatorio" },
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
            {errors?.amount?.message}
          </Typography>
        </Grid>
        <Grid item xs={12} lg={6}>
          <FormControl variant="outlined" color="secondary" fullWidth={true}>
            <InputLabel htmlFor="period">Selecciona un Plazo</InputLabel>
            <Select
              fullWidth
              native
              name="period"
              label="Selecciona un Servicio"
              onChange={handleChange}
              value={simulateCreditForm.period}
              inputRef={register({
                required: { value: true, message: "Campo obligatorio" },
              })}
            >
              <option aria-label="None" disabled />
              <option value={6}>6 meses</option>
              <option value={12}>12 meses</option>
              <option value={24}>24 meses</option>
              <option value={36}>36 meses</option>
              <option value={48}>48 meses</option>
              <option value={60}>60 meses</option>
            </Select>
          </FormControl>
          <Typography
            variant="body1"
            display="block"
            color="error"
            gutterBottom
          >
            {errors?.period?.message}
          </Typography>
        </Grid>
        <Grid item xs={12} lg={6}>
          <FormControl variant="outlined" color="secondary" fullWidth={true}>
            <InputLabel htmlFor="bank">Selecciona un Banco</InputLabel>
            <Select
              fullWidth
              native
              name="bank"
              label="Selecciona un Banco"
              onChange={handleChange}
              value={simulateCreditForm.bank}
              inputRef={register({
                required: { value: true, message: "Campo obligatorio" },
              })}
            >
              <option aria-label="None" disabled />
              {Object.keys(data).map((key) => {
                return (
                  <option key={key} value={key}>
                    {key}
                  </option>
                );
              })}
            </Select>
          </FormControl>
          <Typography
            variant="body1"
            display="block"
            color="error"
            gutterBottom
          >
            {errors?.bank?.message}
          </Typography>
        </Grid>
        <Grid item xs={12} lg={6}>
          <FormControl variant="outlined" color="secondary" fullWidth={true}>
            <InputLabel htmlFor="service">Selecciona un Servicio</InputLabel>
            <Select
              fullWidth
              native
              disabled={simulateCreditForm.bank.length === 0}
              name="service"
              label="Selecciona un Servicio"
              onChange={handleChange}
              value={simulateCreditForm.service}
              inputRef={register({
                required: { value: true, message: "Campo obligatorio" },
              })}
            >
              <option aria-label="None" disabled />
              {simulateCreditForm.bank &&
                data[simulateCreditForm.bank].products.map((product) => {
                  return (
                    <option key={product.name} value={product.tasa_men}>
                      {`${product.name} - ${product.tasa_men}% EM - ${product.tasa_anu}% EA`}
                    </option>
                  );
                })}
            </Select>
          </FormControl>
          <Typography
            variant="body1"
            display="block"
            color="error"
            gutterBottom
          >
            {errors?.service?.message}
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Box className={classes.container}>
            <Button
              type="submit"
              variant="contained"
              color="secondary"
              className={classes.button}
            >
              Simular Crédito
            </Button>
          </Box>
        </Grid>
      </Grid>
    </form>
  );
};

export default FormSimulateCredit;
