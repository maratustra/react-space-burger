import request from "./apiClient";

const getHeaders = () => {
  let accessToken = localStorage.getItem("accessToken");

  if (accessToken && !accessToken.startsWith("Bearer ")) {
    accessToken = `Bearer ${accessToken}`;
  }
  return {
    "Content-Type": "application/json",
    Authorization: accessToken || "",
  };
};

export const fetchIngredients = () => {
  return request("ingredients").then((data) => data.data);
};

export const createOrder = (ingredients) => {
  return request("orders", {
    method: "POST",
    headers: getHeaders(),
    body: JSON.stringify({ ingredients }),
  }).then((data) => data.order.number);
};

export const resetPassword = (email) => {
  return request("password-reset", {
    method: "POST",
    headers: getHeaders(),
    body: JSON.stringify({ email }),
  });
};

export const resetPasswordWithToken = (password, token) => {
  return request("password-reset/reset", {
    method: "POST",
    headers: getHeaders(),
    body: JSON.stringify({ password, token }),
  });
};

export const login = (email, password) => {
  return request("auth/login", {
    method: "POST",
    headers: getHeaders(),
    body: JSON.stringify({ email, password }),
  });
};

export const register = ({ email, password, name }) => {
  return request("auth/register", {
    method: "POST",
    headers: getHeaders(),
    body: JSON.stringify({ email, password, name }),
  });
};

export const logout = () => {
  return request("auth/logout", {
    method: "POST",
    headers: getHeaders(),
    body: JSON.stringify({ token: localStorage.getItem("refreshToken") }),
  });
};

export const getUser = () => {
  return request("auth/user", {
    method: "GET",
    headers: getHeaders(),
  });
};

export const updateUser = (email, name, password) => {
  return request("auth/user", {
    method: "PATCH",
    headers: getHeaders(),
    body: JSON.stringify({ email, name, password }),
  });
};
