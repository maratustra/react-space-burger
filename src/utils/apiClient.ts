export const BASE_URL = "https://norma.nomoreparties.space/api/";

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

export default request;