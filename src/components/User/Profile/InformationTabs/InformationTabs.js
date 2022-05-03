import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import {
  Hidden,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@material-ui/core";
import HorizontalTab from "./HorizontalTab";
import VerticalTab from "./VerticalTab";
import { getAccessTokenApi } from "../../../../api/auth";
import {
  savePersonalInfoApi,
  getPersonalInfoApi,
  saveFinancialInfoApi,
  getFinancialInfoApi,
  saveFormProgressApi,
} from "../../../../api/user";
import "./InformationTabs.scss";
import { ProgressCircular } from "../../../Others/ProgressCircular";

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.paper,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    width: "auto",
    paddingLeft: "15px",
    paddingRight: "15px",
  },
  snack: {
    backgroundColor: "#4CAF50",
    width: "auto",
    marginBottom: "25px",
    maxWidth: "550px",
  },
  link: {
    textDecoration: "none",
  },
}));
export default function InformationTabs() {
  const [userFinancialData, setUserFinancialData] = useState(null);
  const [userPersonalData, setUserPersonalData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const personalData = await getPersonalInfoApi(getAccessTokenApi());
      const financialData = await getFinancialInfoApi(getAccessTokenApi());
      setUserPersonalData(personalData.data);
      setUserFinancialData(financialData.data);
    };
    fetchData();
  }, []);

  return userPersonalData ? (
    <Tabs
      userPersonalData={userPersonalData}
      setUserPersonalData={setUserPersonalData}
      userFinancialData={userFinancialData}
      setUserFinancialData={setUserFinancialData}
    />
  ) : (
    <ProgressCircular
      variantMessage="h4"
      message="Cargando su información, por favor espere un momento"
    />
  );
}

function Tabs(props) {
  const {
    userPersonalData,
    setUserPersonalData,
    userFinancialData,
    setUserFinancialData,
  } = props;
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [openError, setOpenError] = useState(false);
  const [message, setMessage] = useState("");
  const [progress, setProgress] = useState(0);

  const totalcolumns = 30;

  const handleOpenModal = () => {
    setOpenModal(true);
  };
  const handleCloseModal = () => {
    setOpenModal(false);
    window.scroll(0, 0);
  };

  const onSubmitFinancial = async (data, e) => {
    setUserFinancialData({
      ...userFinancialData,
      data,
    });

    const result = await saveFinancialInfoApi(
      userFinancialData,
      getAccessTokenApi()
    );
    if (result.ok) {
      await saveFormProgressApi({ progress }, getAccessTokenApi());
      setOpen(true);
      if (progress === 100) {
        handleOpenModal();
      }
    } else {
      setMessage(result.msg);
      setOpenError(true);
    }
    window.scroll(0, 0);
  };
  const onSubmitPersonal = async (data, e) => {
    e.preventDefault();
    setUserPersonalData({
      ...userPersonalData,
      data,
    });
    const result = await savePersonalInfoApi(
      userPersonalData,
      getAccessTokenApi()
    );
    if (result.ok) {
      await saveFormProgressApi({ progress }, getAccessTokenApi());
      setOpen(true);
      if (progress === 100) {
        handleOpenModal();
      }
    } else {
      setMessage(result.message);
      setOpenError(true);
    }
    window.scroll(0, 0);
  };
  return (
    <div className={classes.root}>
      <Dialog
        open={openModal}
        onClose={handleCloseModal}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Información completada"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Ahora puede calcular su puntaje scoring haciendo en el botón
            "Calcular Scoring".
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            variant="contained"
            onClick={handleCloseModal}
            color="primary"
          >
            Ahora no
          </Button>
          <Link to="calcular-scoring" className={classes.link}>
            <Button variant="contained" color="secondary">
              Calcular Scoring
            </Button>
          </Link>
        </DialogActions>
      </Dialog>
      <Hidden mdUp>
        <HorizontalTab
          userPersonalData={userPersonalData}
          setUserPersonalData={setUserPersonalData}
          userFinancialData={userFinancialData}
          setUserFinancialData={setUserFinancialData}
          onSubmitPersonal={onSubmitPersonal}
          onSubmitFinancial={onSubmitFinancial}
          progress={progress}
          setProgress={setProgress}
          open={open}
          setOpen={setOpen}
          openError={openError}
          setOpenError={setOpenError}
          message={message}
          totalcolumns={totalcolumns}
        />
      </Hidden>
      <Hidden smDown>
        <VerticalTab
          userPersonalData={userPersonalData}
          setUserPersonalData={setUserPersonalData}
          userFinancialData={userFinancialData}
          setUserFinancialData={setUserFinancialData}
          onSubmitPersonal={onSubmitPersonal}
          onSubmitFinancial={onSubmitFinancial}
          progress={progress}
          setProgress={setProgress}
          open={open}
          setOpen={setOpen}
          openError={openError}
          setOpenError={setOpenError}
          message={message}
          totalcolumns={totalcolumns}
        />
      </Hidden>
    </div>
  );
}
