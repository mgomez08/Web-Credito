import { getAccessTokenApi } from "./auth";
import { basePath, apiVersion } from "./config";

const BASE_URL = `${basePath}/${apiVersion}/bank`;

export const getAllBanksApi = async () => {
  const url = `${BASE_URL}`;
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

export const getBankApi = async (id) => {
  const url = `${BASE_URL}/${id}`;
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

export const createBankApi = async (data) => {
  const url = `${BASE_URL}`;
  const params = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: getAccessTokenApi(),
    },
    body: JSON.stringify(data),
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

export const updateBankApi = async (id, data) => {
  const url = `${BASE_URL}/${id}`;
  const params = {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: getAccessTokenApi(),
    },
    body: JSON.stringify(data),
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

export const deleteBankApi = async (id) => {
  const url = `${BASE_URL}/${id}`;
  const params = {
    method: "DELETE",
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
