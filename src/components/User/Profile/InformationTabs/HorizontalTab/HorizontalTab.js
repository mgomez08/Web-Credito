import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { Box, Tabs, Tab, LinearProgress, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import MonetizationOnIcon from "@material-ui/icons/MonetizationOn";
import PersonalForm from "../../PersonalForm";
import FinancialForm from "../../FinancialForm";
import { getColumnsNullsApi } from "../../../../../api/user";
import { getAccessTokenApi } from "../../../../../api/auth";

function TabPanel(props) {
  const { children, value, index, ...other } = props;
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && <Box>{children}</Box>}
    </div>
  );
}
TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `full-width-tab-${index}`,
    "aria-controls": `full-width-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme) => ({
  progressForm: {
    paddingTop: "18px",
    paddingLeft: "28px",
    paddingBottom: "20px",
  },
  bar: {
    height: "12px",
    borderRadius: "5px",
  },
}));

function LinearProgressWithLabel(props) {
  const classes = useStyles();
  return (
    <Box display="flex" alignItems="center" className={classes.progressForm}>
      <Box width="100%" mr={1}>
        <LinearProgress
          className={classes.bar}
          color="secondary"
          variant="determinate"
          {...props}
        />
      </Box>
      <Box minWidth={35}>
        <Typography variant="body2" color="textSecondary">{`${Math.round(
          props.value
        )}%`}</Typography>
      </Box>
    </Box>
  );
}

export default function HorizontalTab(props) {
  const {
    userPersonalData,
    setUserPersonalData,
    userFinancialData,
    setUserFinancialData,
    onSubmitPersonal,
    onSubmitFinancial,
    progress,
    setProgress,
    open,
    setOpen,
    openError,
    setOpenError,
    message,
    totalcolumns,
  } = props;

  const [value, setValue] = useState(0);
  useEffect(() => {
    let unmounted = false;
    const fetchData = async () => {
      const columnsNulls = await getColumnsNullsApi(getAccessTokenApi());
      if (!unmounted) {
        setProgress(
          (totalcolumns - columnsNulls.data.value) * (100 / totalcolumns)
        );
      }
    };
    fetchData();
    return () => {
      unmounted = true;
    };
  }, [
    onSubmitPersonal,
    onSubmitFinancial,
    totalcolumns,
    setProgress,
    progress,
  ]);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  return (
    <>
      <Tabs
        value={value}
        onChange={handleChange}
        indicatorColor="secondary"
        textColor="secondary"
        variant="fullWidth"
      >
        <Tab icon={<AccountCircleIcon />} label="Personal" {...a11yProps(0)} />
        <Tab
          icon={<MonetizationOnIcon />}
          label="Financiera"
          {...a11yProps(1)}
        />
      </Tabs>
      <TabPanel value={value} index={0}>
        <LinearProgressWithLabel value={progress} />
        <PersonalForm
          userPersonalData={userPersonalData}
          setUserPersonalData={setUserPersonalData}
          onSubmitPersonal={onSubmitPersonal}
          open={open}
          setOpen={setOpen}
          openError={openError}
          setOpenError={setOpenError}
          message={message}
        />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <LinearProgressWithLabel value={progress} />
        <FinancialForm
          userFinancialData={userFinancialData}
          setUserFinancialData={setUserFinancialData}
          onSubmitFinancial={onSubmitFinancial}
          open={open}
          setOpen={setOpen}
          openError={openError}
          setOpenError={setOpenError}
          message={message}
          totalcolumns={totalcolumns}
        />
      </TabPanel>
    </>
  );
}
