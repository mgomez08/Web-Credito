import React from "react";
import { Container, Typography } from "@material-ui/core";
import FormServices from "./FormServices";

const CreateService = () => {
  return (
    <Container maxWidth="sm">
      <Typography align="center" variant="h2" color="initial">
        Crear un Servicio
      </Typography>
      <FormServices mode="create" />
    </Container>
  );
};

export default CreateService;
