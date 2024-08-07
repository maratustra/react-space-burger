import request from "./apiClient";

import { IIngredient } from "../types";

interface ResetPasswordResponse {
  success: boolean;
  message?: string;
}

const getHeaders = (): Record<string, string> => {
  let accessToken = localStorage.getItem("accessToken");

  if (accessToken && !accessToken.startsWith("Bearer ")) {
    accessToken = `Bearer ${accessToken}`;
  }
  return {
    "Content-Type": "application/json",
    Authorization: accessToken || "",
  };
};

export const fetchIngredients = (): Promise<IIngredient[]> => {
  return request("ingredients").then((data) => data.data);
};

export const createOrder = (ingredients: string[]): Promise<number> => {
  return request("orders", {
    method: "POST",
    headers: getHeaders(),
    body: JSON.stringify({ ingredients }),
  }).then((data) => data.order.number);
};

export const resetPassword = (email: string): Promise<string> => {
  return request("password-reset", {
    method: "POST",
    headers: getHeaders(),
    body: JSON.stringify({ email }),
  });
};

export const resetPasswordWithToken = (
  password: string,
  token: string
): Promise<ResetPasswordResponse> => {
  return request("password-reset/reset", {
    method: "POST",
    headers: getHeaders(),
    body: JSON.stringify({ password, token }),
  });
};

export const login = (email: string, password: string): Promise<string> => {
  return request("auth/login", {
    method: "POST",
    headers: getHeaders(),
    body: JSON.stringify({ email, password }),
  });
};

export const register = ({
  email,
  password,
  name,
}: {
  email: string;
  password: string;
  name: string;
}): Promise<string> => {
  return request("auth/register", {
    method: "POST",
    headers: getHeaders(),
    body: JSON.stringify({ email, password, name }),
  });
};

export const logout = (): Promise<string> => {
  return request("auth/logout", {
    method: "POST",
    headers: getHeaders(),
    body: JSON.stringify({ token: localStorage.getItem("refreshToken") }),
  });
};

export const getUser = (): Promise<string> => {
  return request("auth/user", {
    method: "GET",
    headers: getHeaders(),
  });
};

export const updateUser = (
  email: string,
  name: string,
  password: string
): Promise<string> => {
  return request("auth/user", {
    method: "PATCH",
    headers: getHeaders(),
    body: JSON.stringify({ email, name, password }),
  });
};
