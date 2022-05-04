import React from "react";
import PropTypes from "prop-types";
import { Redirect, Route } from "react-router-dom";

export const AdminRoute = ({
  isLoggedIn,
  role,
  component: Component,
  ...rest
}) => {
  // const {location:{pathname, search}} = rest;
  // localStorage.setItem('lastPath', pathname+search);
  return (
    <Route
      {...rest}
      component={(props) =>
        isLoggedIn && role === 2 ? (
          <Component {...props} />
        ) : (
          <Redirect to="/login" />
        )
      }
    />
  );
};

AdminRoute.propTypes = {
  isLoggedIn: PropTypes.bool.isRequired,
  component: PropTypes.func.isRequired,
};
