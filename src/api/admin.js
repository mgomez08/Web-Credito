import { getAccessTokenApi } from "./auth";
import { basePath, apiVersion } from "./config";

const BASE_URL = `${basePath}/${apiVersion}/admin`;

export const getAllUsersApi = async () => {
  const url = `${BASE_URL}/getUsers`;
  const params = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: getAccessTokenApi(),
    },
  };
  try {
    const response = await fetch(url, params);
    const result = await response.json();
    return result;
  } catch (error) {
    return {
      ok: false,
      msg: error.msg,
    };
  }
};

export const changeStatusUserApi = async (id, active) => {
  const url = `${BASE_URL}/change-active-user/${id}`;
  const params = {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: getAccessTokenApi(),
    },
    body: JSON.stringify({ active }),
  };
  try {
    const response = await fetch(url, params);
    const result = await response.json();
    return result;
  } catch (error) {
    return {
      ok: false,
      msg: error.msg,
    };
  }
};
