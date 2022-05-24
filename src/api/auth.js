import { basePath, apiVersion } from "./config";
import { ACCESS_TOKEN, REFRESH_TOKEN } from "../utils/constants";
import jwtDecode from "jwt-decode";

const BASE_URL = `${basePath}/${apiVersion}/auth`;

export const signUpApi = async (data) => {
  const url = `${BASE_URL}/sign-up`;
  const params = {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
    },
  };
  try {
    const response = await fetch(url, params);
    const result = await response.json();
    if (result.ok) {
      return {
        ok: true,
        message: result.msg,
      };
    }
    return {
      ok: false,
      message: result.msg,
    };
  } catch (error) {
    return {
      ok: false,
      message: error.msg,
    };
  }
};

export const signInApi = async (data) => {
  const url = `${BASE_URL}/sign-in`;
  const params = {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
    },
  };
  try {
    const response = await fetch(url, params);
    const result = await response.json();
    return result;
  } catch (error) {
    return {
      ok: false,
      message: error.message,
    };
  }
};

export const refreshAccessTokenApi = async (refreshToken) => {
  const url = `${BASE_URL}/refresh-access-token`;
  const bodyObj = {
    refreshToken: refreshToken,
  };
  const params = {
    method: "POST",
    body: JSON.stringify(bodyObj),
    headers: {
      "Content-Type": "application/json",
    },
  };
  try {
    const response = await fetch(url, params);
    const result = await response.json();
    return result;
  } catch (error) {
    return {
      ok: false,
      message: error.msg,
    };
  }
};

export function getAccessTokenApi() {
  const accessToken = localStorage.getItem(ACCESS_TOKEN);
  if (!accessToken || accessToken === "null" || accessToken === "undefined") {
    return null;
  }
  return willExpireToken(accessToken) ? null : accessToken;
}

export function getRefreshTokenApi() {
  const refreshToken = localStorage.getItem(REFRESH_TOKEN);
  if (
    !refreshToken ||
    refreshToken === "null" ||
    refreshToken === "undefined"
  ) {
    return null;
  }
  return willExpireToken(refreshToken) ? null : refreshToken;
}

export function logout() {
  localStorage.removeItem(ACCESS_TOKEN);
  localStorage.removeItem(REFRESH_TOKEN);
}

function willExpireToken(token) {
  const seconds = 60;
  const metaToken = jwtDecode(token);
  const { exp } = metaToken;
  const now = (Date.now() + seconds) / 1000;
  return now > exp;
}
