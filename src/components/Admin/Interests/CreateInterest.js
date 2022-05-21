import React from "react";
import { Container, Typography } from "@material-ui/core";
import FormInterests from "./FormInterests";

const CreateInterest = () => {
  return (
    <Container maxWidth="sm">
      <Typography align="center" variant="h2" color="initial">
        Crear una tasa de interés
      </Typography>
      <FormInterests mode="create" />
    </Container>
  );
};

export default CreateInterest;
