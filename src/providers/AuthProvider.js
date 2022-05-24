import React, { useState, useEffect, createContext } from "react";
import {
  getAccessTokenApi,
  getRefreshTokenApi,
  refreshAccessTokenApi,
  logout,
} from "../api/auth";
import jwtDecode from "jwt-decode";
import { ACCESS_TOKEN, REFRESH_TOKEN } from "../utils/constants";

export const AuthContext = createContext();

export default function AuthProvider(props) {
  const { children } = props;
  const [user, setUser] = useState({
    user: null,
    isLoading: true,
  });
  useEffect(() => {
    checkUserLogin(setUser);
  }, []);

  return <AuthContext.Provider value={user}>{children}</AuthContext.Provider>;
}

async function checkUserLogin(setUser) {
  const accessToken = getAccessTokenApi();
  if (!accessToken) {
    const refreshToken = getRefreshTokenApi();
    if (!refreshToken) {
      logout();
      setUser({
        user: null,
        isLoading: false,
      });
    } else {
      const result = await refreshAccessTokenApi(refreshToken);
      if (result.ok) {
        const { accessToken, refreshToken } = result;
        localStorage.setItem(ACCESS_TOKEN, accessToken);
        localStorage.setItem(REFRESH_TOKEN, refreshToken);
        const user = jwtDecode(accessToken);
        setUser({
          user,
          isLoading: false,
        });
      } else {
        logout();
        setUser({
          user: null,
          isLoading: false,
        });
      }
    }
  } else {
    setUser({
      isLoading: false,
      user: jwtDecode(accessToken),
    });
  }
}
