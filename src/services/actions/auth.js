import {
  login as apiLogin,
  logout as apiLogout,
  register as apiRegister,
  getUser as apiGetUser,
  updateUser as apiUpdateUser,
} from "../../utils/api";

export const SET_AUTH_CHECKED = "SET_AUTH_CHECKED";
export const SET_USER = "SET_USER";
export const LOGIN_REQUEST = "LOGIN_REQUEST";
export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const LOGIN_FAILURE = "LOGIN_FAILURE";
export const REGISTER_REQUEST = "REGISTER_REQUEST";
export const REGISTER_SUCCESS = "REGISTER_SUCCESS";
export const REGISTER_FAILURE = "REGISTER_FAILURE";

export const setAuthChecked = (value) => ({
  type: SET_AUTH_CHECKED,
  payload: value,
});

export const setUser = (user) => ({
  type: SET_USER,
  payload: user,
});

export const login = (email, password) => {
  return (dispatch) => {
    dispatch({ type: LOGIN_REQUEST });
    return apiLogin(email, password).then((res) => {
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

export const register = (email, password, name) => {
  return (dispatch) => {
    dispatch({ type: REGISTER_REQUEST });
    return apiRegister({ email, password, name }).then((res) => {
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

export const checkUserAuth = () => {
  return (dispatch) => {
    if (localStorage.getItem("accessToken")) {
      dispatch(getUser())
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

export const logout = () => {
  return (dispatch) => {
    return apiLogout().then(() => {
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
      dispatch(setUser(null));
      dispatch(setAuthChecked(true));
    });
  };
};

export const getUser = () => {
  return (dispatch) => {
    return apiGetUser().then((res) => {
      dispatch(setUser(res.user));
    });
  };
};

export const updateUser = (email, name, password) => {
  return (dispatch) => {
    return apiUpdateUser(email, name, password).then((res) => {
      dispatch(setUser(res.user));
    });
  };
};
