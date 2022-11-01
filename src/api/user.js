import { basePath, apiVersion } from "./config";
import { getAccessTokenApi } from "./auth";

const BASE_URL = `${basePath}/${apiVersion}/user`;

export const changePasswordApi = async (data, token) => {
  const url = `${BASE_URL}/change-password`;
  const params = {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
      Authorization: token,
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

export const savePersonalInfoApi = async (data, token) => {
  const url = `${BASE_URL}/save-personal-info`;
  const params = {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
      Authorization: token,
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

export const getPersonalInfoApi = async (token) => {
  const url = `${BASE_URL}/get-personal-info`;
  const params = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: token,
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

export const saveFinancialInfoApi = async (data, token) => {
  const url = `${BASE_URL}/save-financial-info`;
  const params = {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
      Authorization: token,
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

export const getFinancialInfoApi = async (token) => {
  const url = `${BASE_URL}/get-financial-info`;
  const params = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: token,
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

export const getColumnsNullsApi = async (token) => {
  const url = `${BASE_URL}/get-columns-nulls`;
  const params = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: token,
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

export const saveFormProgressApi = async (data, token) => {
  const url = `${BASE_URL}/save-form-progress`;
  const params = {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
      Authorization: token,
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

export const getFormProgressApi = async (token) => {
  const url = `${BASE_URL}/get-form-progress`;
  const params = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: token,
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

export const saveScoringInfoApi = async (data, token) => {
  const url = `${BASE_URL}/save-scoring-info`;
  const params = {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
      Authorization: token,
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

export const getScoringInfoApi = async (token) => {
  const url = `${BASE_URL}/get-scoring-info`;
  const params = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: token,
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

export const calculateScoringApi = async (token) => {
  const url = `${BASE_URL}/calculate-scoring`;
  const params = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: token,
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

export const getBankServicesApi = async () => {
  const url = `${BASE_URL}/get-bank-services`;
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

export const simulateCredit = async (data, token) => {
  const url = `${BASE_URL}/simulate-credit`;
  const params = {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
      Authorization: token,
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
