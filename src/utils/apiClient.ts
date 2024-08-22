export const BASE_URL = "https://norma.nomoreparties.space/api/";
export const LIVE_TABLE_SERVER_URL =
  "wss://norma.nomoreparties.space/orders/all";
export const USER_ORDER_SERVER_URL = "wss://norma.nomoreparties.space/orders";
export const FETCH_TOKEN = "https://norma.nomoreparties.space/api/auth/token";

interface SuccessResponse extends Response {
  success: boolean;
}

const checkResponse = (res: Response): Promise<any> => {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(`Ошибка ${res.status}`);
};

const checkSuccess = (res: SuccessResponse): SuccessResponse => {
  if (res && res.success) {
    return res;
  }
  throw new Error(`Ответ не success: ${res}`);
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
    return Promise.reject("Refresh token не найден");
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
      console.error("Ошибка в процессе обновления токена:", error);
      throw error;
    });
};

export default request;
