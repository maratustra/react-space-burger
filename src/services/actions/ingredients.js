import { fetchIngredients } from "../../utils/api";

export const SET_INGREDIENTS = "SET_INGREDIENTS";
export const SET_CURRENT_INGREDIENT = "SET_CURRENT_INGREDIENT";
export const SET_ORDER = "SET_ORDER";

export const GET_INGREDIENTS_REQUEST = "GET_INGREDIENTS_REQUEST";
export const GET_INGREDIENTS_SUCCESS = "GET_INGREDIENTS_SUCCESS";
export const GET_INGREDIENTS_FAILURE = "GET_INGREDIENTS_FAILURE";

export const setIngredients = (ingredients) => ({
  type: SET_INGREDIENTS,
  payload: ingredients,
});

export const setCurrentIngredient = (ingredient) => ({
  type: SET_CURRENT_INGREDIENT,
  payload: ingredient,
});

export const setOrder = (order) => ({
  type: SET_ORDER,
  payload: order,
});

export const getIngredients = () => (dispatch) => {
  dispatch({ type: GET_INGREDIENTS_REQUEST });
  fetchIngredients()
    .then((res) => {
      return dispatch({ type: GET_INGREDIENTS_SUCCESS, payload: res });
    })
    .catch((error) => {
      dispatch({ type: GET_INGREDIENTS_FAILURE, payload: error.message });
    });
};
