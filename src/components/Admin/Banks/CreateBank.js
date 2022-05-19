import React from "react";
import { Container, Typography } from "@material-ui/core";
import FormBanks from "./FormBanks";

const CreateBank = () => {
  return (
    <Container maxWidth="sm">
      <Typography align="center" variant="h2" color="initial">
        Crear un banco
      </Typography>
      <FormBanks mode="create" />
    </Container>
  );
};

export default CreateBank;
