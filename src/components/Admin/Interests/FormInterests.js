import {
  Button,
  FormControl,
  Grid,
  InputAdornment,
  InputLabel,
  Select,
  TextField,
  Typography,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { Redirect } from "react-router-dom";
import { useParams } from "react-router-dom";
import Swal from "sweetalert2";
import { ProgressCircular } from "../../Others/ProgressCircular";
import { getAllBanksApi } from "../../../api/banks";
import { getAllServicesApi } from "../../../api/services";
import { createInterestApi, updateInterestApi } from "../../../api/interests";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    alignItems: "center",
    flexDirection: "column",
  },
}));

const FormInterests = ({ mode, interest }) => {
  const classes = useStyles();
  const { id } = useParams();
  const { register, errors, handleSubmit } = useForm();
  const [banks, setBanks] = useState();
  const [services, setServices] = useState();
  const [redirectToList, setRedirectToList] = useState(false);
  const [inputs, setInputs] = useState({
    id_bank: mode === "create" ? "" : interest.id_bank,
    id_service: mode === "create" ? "" : interest.id_service,
    tasa_men: mode === "create" ? "" : interest.tasa_men,
    tasa_anu: mode === "create" ? "" : interest.tasa_anu,
  });

  const handleChange = (e) => {
    setInputs({
      ...inputs,
      [e.target.name]: e.target.value,
    });
  };
  useEffect(() => {
    (async () => {
      const [banks, services] = await Promise.all([
        getAllBanksApi(),
        getAllServicesApi(),
      ]);
      setBanks(banks.data);
      setServices(services.data);
    })();
  }, []);

  const onSubmit = async (data, e) => {
    e.preventDefault();
    if (mode === "create") {
      const response = await createInterestApi(data);
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
      const response = await updateInterestApi(id, data);
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
  if (!services)
    return (
      <ProgressCircular
        variantMessage="h4"
        message="Cargando información adicional..."
      />
    );
  if (redirectToList) return <Redirect to="/dashboard/interests" />;
  return (
    <form onSubmit={handleSubmit(onSubmit)} className={classes.root}>
      <Grid
        container
        direction="row"
        justify="space-between"
        alignItems="center"
        spacing={4}
      >
        <Grid item xs={12} lg={6}>
          <FormControl variant="outlined" color="secondary" fullWidth={true}>
            <InputLabel htmlFor="id_bank">Banco</InputLabel>
            <Select
              native
              name="id_bank"
              defaultValue={inputs.id_bank}
              onChange={handleChange}
              label="Banco"
              inputRef={register({
                required: { value: true, message: "Campo obligatorio" },
              })}
            >
              <option aria-label="None" />
              {banks.map((bank) => {
                return (
                  <option key={bank.id} value={bank.id}>
                    {bank.name_bank}
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
            {errors?.id_bank?.message}
          </Typography>
        </Grid>
        <Grid item xs={12} lg={6}>
          <FormControl variant="outlined" color="secondary" fullWidth={true}>
            <InputLabel htmlFor="id_service">Servicio</InputLabel>
            <Select
              native
              name="id_service"
              defaultValue={inputs.id_service}
              onChange={handleChange}
              label="Servicio"
              inputRef={register({
                required: { value: true, message: "Campo obligatorio" },
              })}
            >
              <option aria-label="None" />
              {services.map((service) => {
                return (
                  <option key={service.id} value={service.id}>
                    {service.name_service}
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
            {errors?.id_service?.message}
          </Typography>
        </Grid>
        <Grid item xs={12} lg={6}>
          <TextField
            label="Tasa mensual"
            variant="outlined"
            color="secondary"
            fullWidth
            type="number"
            name="tasa_men"
            onChange={handleChange}
            defaultValue={inputs.tasa_men}
            InputProps={{
              endAdornment: <InputAdornment position="end">%</InputAdornment>,
            }}
            inputRef={register({
              required: { value: true, message: "Campo obligatorio" },
            })}
          />
          <Typography
            variant="body1"
            display="block"
            color="error"
            gutterBottom
          >
            {errors?.tasa_men?.message}
          </Typography>
        </Grid>
        <Grid item xs={12} lg={6}>
          <TextField
            label="Tasa anual"
            variant="outlined"
            color="secondary"
            fullWidth
            type="number"
            name="tasa_anu"
            onChange={handleChange}
            defaultValue={inputs.tasa_anu}
            InputProps={{
              endAdornment: <InputAdornment position="end">%</InputAdornment>,
            }}
            inputRef={register({
              required: { value: true, message: "Campo obligatorio" },
            })}
          />
          <Typography
            variant="body1"
            display="block"
            color="error"
            gutterBottom
          >
            {errors?.tasa_anu?.message}
          </Typography>
        </Grid>
      </Grid>
      <Button variant="contained" color="secondary" type="submit">
        {mode === "create" ? "Crear" : "Actualizar"}
      </Button>
    </form>
  );
};

export default FormInterests;
