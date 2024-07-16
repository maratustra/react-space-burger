import request from "./apiClient";

const headers = {
  "Content-Type": "application/json",
  "Authorization": `Bearer ${localStorage.getItem("accessToken")}`
};

export const fetchIngredients = () => {
  return request("ingredients").then((data) => data.data);
};

export const createOrder = (ingredients) => {
  return request("orders", {
    method: "POST",
    headers,
    body: JSON.stringify({ ingredients }),
  }).then((data) => data.order.number);
};

export const resetPassword = (email) => {
  return request("password-reset", {
    method: "POST",
    headers,
    body: JSON.stringify({ email }),
  });
};

export const resetPasswordWithToken = (password, token) => {
  return request("password-reset/reset", {
    method: "POST",
    headers,
    body: JSON.stringify({ password, token }),
  });
};

export const login = (email, password) => {
  return request("auth/login", {
    method: "POST",
    headers,
    body: JSON.stringify({ email, password }),
  });
};

export const register = (email, password, name) => {
  return request("auth/register", {
    method: "POST",
    headers,
    body: JSON.stringify({ email, password, name }),
  });
};

export const logout = () => {
  return request("auth/logout", {
    method: "POST",
    headers,
    body: JSON.stringify({ token: localStorage.getItem("refreshToken") }),
  });
};

export const getUser = () => {
  return request("auth/user", {
    method: "GET",
    headers,
  });
};

export const updateUser = (email, name, password) => {
  return request("auth/user", {
    method: "PATCH",
    headers,
    body: JSON.stringify({ email, name, password }),
  });
};