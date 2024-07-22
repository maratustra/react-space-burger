import {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  REGISTER_REQUEST,
  REGISTER_SUCCESS,
  REGISTER_FAILURE,
  SET_AUTH_CHECKED,
  SET_USER,
  GET_USER_REQUEST,
  GET_USER_SUCCESS,
  GET_USER_FAILURE,
  UPDATE_USER_REQUEST,
  UPDATE_USER_SUCCESS,
  UPDATE_USER_FAILURE,
} from "../actions/auth";

const initialState = {
  user: null,
  isAuthChecked: false,
  updateSuccess: false,
  loading: false,
  error: null,
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_REQUEST:
    case REGISTER_REQUEST:
    case GET_USER_REQUEST:
    case UPDATE_USER_REQUEST:
      return { ...state, loading: true, error: null };
    case LOGIN_SUCCESS:
    case REGISTER_SUCCESS:
      return { ...state, loading: false, error: null };
    case GET_USER_SUCCESS:
      return { ...state, loading: false, user: action.payload, updateSuccess: false };
    case UPDATE_USER_SUCCESS:
      return { ...state, loading: false, user: action.payload, updateSuccess: true };
    case LOGIN_FAILURE:
    case REGISTER_FAILURE:
    case GET_USER_FAILURE:
    case UPDATE_USER_FAILURE:
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
