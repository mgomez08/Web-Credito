import React, { useState, useEffect } from "react";
import { Grid, Typography } from "@material-ui/core";
import FormSimulateCredit from "./FormSimulateCredit";
import { getBankServicesApi, simulateCredit } from "../../../api/user";
import { ProgressCircular } from "../../Others/ProgressCircular";
import { EmptyInfo } from "../../Others/EmptyInfo";
import { getAccessTokenApi } from "../../../api/auth";
import TableCredit from "./TableCredit";

const ContentSimulateCredit = () => {
  const [data, setData] = useState([]);
  const [credit, setCredit] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadingCredit, setLoadingCredit] = useState(false);
  const [simulateCreditForm, setSimulateCreditForm] = useState({
    amount: "",
    bank: "",
    service: "",
    period: "",
  });

  useEffect(() => {
    (async () => {
      const response = await getBankServicesApi();

      const newObject = {};
      response.data.forEach((x) => {
        //Si la categoría no existe en mewObject entonces
        //la creamos e inicializamos el arreglo de productos.
        if (!newObject.hasOwnProperty(x.Bank.name_bank)) {
          newObject[x.Bank.name_bank] = {
            bank: x.Bank.name_bank,
            products: [],
          };
        }
        newObject[x.Bank.name_bank].products.push({
          name: x.Service.name_service,
          tasa_anu: x.tasa_anu,
          tasa_men: x.tasa_men,
        });
      });
      setData(newObject);
      setLoading(false);
    })();
  }, []);

  const onSubmitSimulateCredit = async (values, e) => {
    e.preventDefault();
    values = {
      amount: parseInt(values.amount),
      period: parseInt(values.period),
      interest: parseFloat(values.service),
    };
    setLoadingCredit(true);
    const response = await simulateCredit(values, getAccessTokenApi());
    if (response.ok) {
      setCredit(response.data);
    }
    setLoadingCredit(false);
  };

  if (loading)
    return (
      <ProgressCircular variantMessage="h4" message="Cargando bancos..." />
    );
  if (data.length === 0)
    return (
      <EmptyInfo
        title="No hay registros de servicios de bancos aún para simular"
        variantMessage="h4"
      />
    );
  return (
    <Grid container direction="column" justify="center" alignItems="center">
      <Typography color="initial" align="justify" variant="body1">
        Complete la información de los campos y oprime el botón "simular
        crédito"
      </Typography>
      <FormSimulateCredit
        simulateCreditForm={simulateCreditForm}
        setSimulateCreditForm={setSimulateCreditForm}
        data={data}
        onSubmitSimulateCredit={onSubmitSimulateCredit}
      />
      {loadingCredit && (
        <ProgressCircular
          variantMessage="h4"
          message="Cargando información..."
        />
      )}
      {credit.length > 0 && <TableCredit data={credit} />}
    </Grid>
  );
};

export default ContentSimulateCredit;
