import authReducer, { TAuthState } from "../reducers/auth";
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
} from "../constants/auth";

describe("auth reducer", () => {
  const initialState: TAuthState = {
    user: null,
    isAuthChecked: false,
    updateSuccess: false,
    loading: false,
    error: null,
  };

  test("should return the initial state", () => {
    expect(authReducer(undefined, {})).toEqual(initialState);
  });

  test("should handle LOGIN_REQUEST", () => {
    const expectedState = {
      ...initialState,
      loading: true,
      error: null,
    };

    expect(authReducer(initialState, { type: LOGIN_REQUEST })).toEqual(
      expectedState
    );
  });

  test("should handle LOGIN_SUCCESS", () => {
    const expectedState = {
      ...initialState,
      loading: false,
      error: null,
    };

    expect(authReducer(initialState, { type: LOGIN_SUCCESS })).toEqual(
      expectedState
    );
  });

  test("should handle LOGIN_FAILURE", () => {
    const error = "Login failed";

    const action = {
      type: LOGIN_FAILURE,
      payload: error,
    };

    const expectedState = {
      ...initialState,
      loading: false,
      error: error,
    };

    expect(authReducer(initialState, action)).toEqual(expectedState);
  });

  test("should handle REGISTER_REQUEST", () => {
    const expectedState = {
      ...initialState,
      loading: true,
      error: null,
    };

    expect(authReducer(initialState, { type: REGISTER_REQUEST })).toEqual(
      expectedState
    );
  });

  test("should handle REGISTER_SUCCESS", () => {
    const expectedState = {
      ...initialState,
      loading: false,
      error: null,
    };

    expect(authReducer(initialState, { type: REGISTER_SUCCESS })).toEqual(
      expectedState
    );
  });

  test("should handle REGISTER_FAILURE", () => {
    const error = "Registration failed";
    const action = {
      type: REGISTER_FAILURE,
      payload: error,
    };

    const expectedState = {
      ...initialState,
      loading: false,
      error: error,
    };

    expect(authReducer(initialState, action)).toEqual(expectedState);
  });

  test("should handle SET_AUTH_CHECKED", () => {
    const action = {
      type: SET_AUTH_CHECKED,
      payload: true,
    };

    const expectedState = {
      ...initialState,
      isAuthChecked: true,
    };

    expect(authReducer(initialState, action)).toEqual(expectedState);
  });

  test("should handle SET_USER", () => {
    const user = { id: "1", name: "test", email: "test" };
    const action = {
      type: SET_USER,
      payload: user,
    };

    const expectedState = {
      ...initialState,
      user: user,
    };

    expect(authReducer(initialState, action)).toEqual(expectedState);
  });

  test("should handle GET_USER_REQUEST", () => {
    const expectedState = {
      ...initialState,
      loading: true,
      error: null,
    };

    expect(authReducer(initialState, { type: GET_USER_REQUEST })).toEqual(
      expectedState
    );
  });

  test("should handle GET_USER_SUCCESS", () => {
    const user = { id: "1", name: "test", email: "test" };

    const action = {
      type: GET_USER_SUCCESS,
      payload: user,
    };

    const expectedState = {
      ...initialState,
      user: user,
      loading: false,
      updateSuccess: false,
    };

    expect(authReducer(initialState, action)).toEqual(expectedState);
  });

  test("should handle GET_USER_FAILURE", () => {
    const error = "Get user info failed";
    const action = {
      type: GET_USER_FAILURE,
      payload: error,
    };

    const expectedState = {
      ...initialState,
      loading: false,
      error: error,
    };

    expect(authReducer(initialState, action)).toEqual(expectedState);
  });

  test("should handle UPDATE_USER_REQUEST", () => {
    const expectedState = {
      ...initialState,
      loading: true,
      error: null,
    };

    expect(authReducer(initialState, { type: UPDATE_USER_REQUEST })).toEqual(
      expectedState
    );
  });

  test("should handle UPDATE_USER_SUCCESS", () => {
    const user = { id: "1", name: "test", email: "test" };
    const action = {
      type: UPDATE_USER_SUCCESS,
      payload: user,
    };

    const expectedState = {
      ...initialState,
      loading: false,
      user: user,
      updateSuccess: true,
    };

    expect(authReducer(initialState, action)).toEqual(expectedState);
  });

  test("should handle UPDATE_USER_FAILURE", () => {
    const error = "Update user info failed";
    const action = {
      type: UPDATE_USER_FAILURE,
      payload: error,
    };

    const expectedState = {
      ...initialState,
      loading: false,
      error: error,
    };

    expect(authReducer(initialState, action)).toEqual(expectedState);
  });
});
