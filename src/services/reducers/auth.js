import {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  REGISTER_REQUEST,
  REGISTER_SUCCESS,
  REGISTER_FAILURE,
  SET_AUTH_CHECKED,
  SET_USER,
} from "../actions/auth";

const initialState = {
  user: null,
  isAuthChecked: false,
  loading: false,
  error: null,
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_REQUEST:
    case REGISTER_REQUEST:
      return { ...state, loading: true, error: null };
    case LOGIN_SUCCESS:
    case REGISTER_SUCCESS:
      return { ...state, loading: false, error: null };
    case LOGIN_FAILURE:
    case REGISTER_FAILURE:
      return { ...state, loading: false, error: action.payload };
    case SET_AUTH_CHECKED:
      return {
        ...state,
        isAuthChecked: action.payload,
      };
    case SET_USER:
      return {
        ...state,
        user: action.payload,
      };
    default:
      return state;
  }
};

export default authReducer;
