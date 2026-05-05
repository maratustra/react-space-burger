export const BASE_URL = "https://norma.education-services.ru/api/";
export const LIVE_TABLE_SERVER_URL =
  "wss://norma.education-services.ru/orders/all";
export const USER_ORDER_SERVER_URL = "wss://norma.education-services.ru/orders";
export const FETCH_TOKEN = "https://norma.education-services.ru/api/auth/token";

interface SuccessResponse extends Response {
  success: boolean;
}

export const checkResponse = (res: Response): Promise<any> => {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(`Error ${res.status}`);
};

export const checkSuccess = (res: SuccessResponse): SuccessResponse => {
  if (res && res.success) {
    return res;
  }
  throw new Error(`Response not success: ${res}`);
};

const request = (endpoint: string, options?: RequestInit): Promise<any> => {
  return fetch(`${BASE_URL}${endpoint}`, options)
    .then(checkResponse)
    .then(checkSuccess);
};

export const refreshToken = (): Promise<{
  accessToken: string;
  refreshToken: string;
}> => {
  const refreshToken = localStorage.getItem("refreshToken");

  if (!refreshToken) {
    return Promise.reject("Refresh token not found");
  }

  return fetch(FETCH_TOKEN, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ token: refreshToken }),
  })
    .then(checkResponse)
    .then((data) => {
      if (!data.success) {
        return Promise.reject(data);
      }

      localStorage.setItem("accessToken", data.accessToken);
      localStorage.setItem("refreshToken", data.refreshToken);

      return {
        accessToken: data.accessToken,
        refreshToken: data.refreshToken,
      };
    })
    .catch((error) => {
      console.error("Error during token refresh:", error);
      throw error;
    });
};

export default request;
