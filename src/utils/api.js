import request from "./apiClient";

export const fetchIngredients = () => {
  return request("ingredients").then((data) => data.data);
};

export const createOrder = (ingredients) => {
  return request("orders", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ ingredients }),
  }).then((data) => data.order.number);
};

export const resetPassword = (email) => {
  return request("password-reset", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email }),
  });
};

export const resetPasswordWithToken = (password, token) => {
  return request("password-reset/reset", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ password, token }),
  });
};
