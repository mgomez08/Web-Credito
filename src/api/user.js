import { basePath, apiVersion } from "./config";

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
  const url = `${basePath}/${apiVersion}/get-form-progress`;
  const params = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: token,
    },
  };
  return fetch(url, params)
    .then((response) => {
      return response.json();
    })
    .then((result) => {
      return result;
    })
    .catch((err) => {
      return err.message;
    });
};

export const saveScoringInfoApi = async (data, token) => {
  const url = `${basePath}/${apiVersion}/save-scoring-info`;
  const params = {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
      Authorization: token,
    },
  };
  return fetch(url, params)
    .then((response) => {
      return response.json();
    })
    .then((result) => {
      return result;
    })
    .catch((err) => {
      return err.message;
    });
};

export const getScoringInfoApi = async (token) => {
  const url = `${basePath}/${apiVersion}/get-scoring-info`;
  const params = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: token,
    },
  };
  return fetch(url, params)
    .then((response) => {
      return response.json();
    })
    .then((result) => {
      return result;
    })
    .catch((err) => {
      return err.message;
    });
};

export const calculateScoringApi = async (token) => {
  const url = `${basePath}/${apiVersion}/calculate-scoring`;
  const params = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: token,
    },
  };
  return fetch(url, params)
    .then((response) => {
      return response.json();
    })
    .then((result) => {
      return result;
    })
    .catch((err) => {
      return err.message;
    });
};

export const getScoringApi = async (token) => {
  const url = `${basePath}/${apiVersion}/get-scoring`;
  const params = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: token,
    },
  };
  return fetch(url, params)
    .then((response) => {
      return response.json();
    })
    .then((result) => {
      return result;
    })
    .catch((err) => {
      return err.message;
    });
};
