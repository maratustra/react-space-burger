import {
  login as apiLogin,
  logout as apiLogout,
  register as apiRegister,
  getUser as apiGetUser,
  updateUser as apiUpdateUser,
} from "../../utils/api";
import {
  SET_AUTH_CHECKED,
  SET_USER,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  REGISTER_REQUEST,
  REGISTER_SUCCESS,
  REGISTER_FAILURE,
  GET_USER_REQUEST,
  GET_USER_SUCCESS,
  GET_USER_FAILURE,
  UPDATE_USER_REQUEST,
  UPDATE_USER_SUCCESS,
  UPDATE_USER_FAILURE,
} from "../constants/auth";
import { TUser } from '../types/data';
import { AppDispatch, AppThunk } from '../store';

interface ISetAuthCheckedAction {
  readonly type: typeof SET_AUTH_CHECKED;
  readonly payload: boolean;
}

interface ISetUserAction {
  readonly type: typeof SET_USER;
  readonly payload: TUser | null;
}

interface ILoginRequestAction {
  readonly type: typeof LOGIN_REQUEST;
}

interface ILoginSuccessAction {
  readonly type: typeof LOGIN_SUCCESS;
}

interface ILoginFailureAction {
  readonly type: typeof LOGIN_FAILURE;
  readonly payload: string;
}

interface IRegisterRequestAction {
  readonly type: typeof REGISTER_REQUEST;
}

interface IRegisterSuccessAction {
  readonly type: typeof REGISTER_SUCCESS;
}

interface IRegisterFailureAction {
  readonly type: typeof REGISTER_FAILURE;
  readonly payload: string;
}

interface IGetUserRequestAction {
  readonly type: typeof GET_USER_REQUEST;
}

interface IGetUserSuccessAction {
  readonly type: typeof GET_USER_SUCCESS;
  readonly payload: TUser;
}

interface IGetUserFailureAction {
  readonly type: typeof GET_USER_FAILURE;
  readonly payload: string;
}

interface IUpdateUserRequestAction {
  readonly type: typeof UPDATE_USER_REQUEST;
}

interface IUpdateUserSuccessAction {
  readonly type: typeof UPDATE_USER_SUCCESS;
  readonly payload: TUser;
}

interface IUpdateUserFailureAction {
  readonly type: typeof UPDATE_USER_FAILURE;
  readonly payload: string;
}

export type TAuthActions =
  | ISetAuthCheckedAction
  | ISetUserAction
  | ILoginRequestAction
  | ILoginSuccessAction
  | ILoginFailureAction
  | IRegisterRequestAction
  | IRegisterSuccessAction
  | IRegisterFailureAction
  | IGetUserRequestAction
  | IGetUserSuccessAction
  | IGetUserFailureAction
  | IUpdateUserRequestAction
  | IUpdateUserSuccessAction
  | IUpdateUserFailureAction;

export const setAuthChecked = (value: boolean): ISetAuthCheckedAction => ({
  type: SET_AUTH_CHECKED,
  payload: value,
});

export const setUser = (user: TUser | null): ISetUserAction => ({
  type: SET_USER,
  payload: user,
});

export const login = (email: string, password: string): AppThunk => {
  return (dispatch: AppDispatch) => {
    dispatch({ type: LOGIN_REQUEST });
    return apiLogin(email, password)
      .then((res) => {
        localStorage.setItem("accessToken", res.accessToken);
        localStorage.setItem("refreshToken", res.refreshToken);
        dispatch(setUser(res.user));
        dispatch(setAuthChecked(true));
        dispatch({ type: LOGIN_SUCCESS });
      })
      .catch((error) => {
        dispatch({ type: LOGIN_FAILURE, payload: error.message });
      });
  };
};

export const register = (email: string, password: string, name: string): AppThunk => {
  return (dispatch: AppDispatch) => {
    dispatch({ type: REGISTER_REQUEST });
    return apiRegister({ email, password, name })
      .then((res) => {
        localStorage.setItem("accessToken", res.accessToken);
        localStorage.setItem("refreshToken", res.refreshToken);
        dispatch(setUser(res.user));
        dispatch(setAuthChecked(true));
        dispatch({ type: REGISTER_SUCCESS });
      })
      .catch((error) => {
        dispatch({ type: REGISTER_FAILURE, payload: error.message });
      });
  };
};

export const checkUserAuth = (): AppThunk => {
  return (dispatch: AppDispatch) => {
    if (localStorage.getItem("accessToken")) {
      const result = dispatch(getUser());
      return result
        .catch(() => {
          localStorage.removeItem("accessToken");
          localStorage.removeItem("refreshToken");
          dispatch(setUser(null));
        })
        .finally(() => dispatch(setAuthChecked(true)));
    } else {
      dispatch(setAuthChecked(true));
    }
  };
};

export const logout = (): AppThunk => {
  return (dispatch: AppDispatch) => {
    return apiLogout().then(() => {
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
      dispatch(setUser(null));
      dispatch(setAuthChecked(true));
    });
  };
};

export const getUser = (): AppThunk<Promise<void>> => {
  return (dispatch: AppDispatch) => {
    dispatch({ type: GET_USER_REQUEST });
    const promise = apiGetUser()
      .then((res) => {
        dispatch({ type: GET_USER_SUCCESS, payload: res.user });
      })
      .catch((error) => {
        dispatch({ type: GET_USER_FAILURE, payload: error.message });
      });
    return promise;
  };
};

export const updateUser = (email: string, name: string, password: string): AppThunk => {
  return (dispatch: AppDispatch) => {
    dispatch({ type: UPDATE_USER_REQUEST });
    return apiUpdateUser(email, name, password)
      .then((res) => {
        dispatch({ type: UPDATE_USER_SUCCESS, payload: res.user });
      })
      .catch((error) => {
        dispatch({ type: UPDATE_USER_FAILURE, payload: error.message });
      });
  };
};
