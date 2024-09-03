import { fetchIngredients } from "../../utils/api";
import { IIngredient } from "../../types/index";
import { type AppDispatch } from "../store";

import {
  SET_INGREDIENTS,
  SET_CURRENT_INGREDIENT,
  SET_ORDER,
  GET_INGREDIENTS_REQUEST,
  GET_INGREDIENTS_SUCCESS,
  GET_INGREDIENTS_FAILURE,
} from "../constants/ingredients";

export interface ISetIngredientsAction {
  readonly type: typeof SET_INGREDIENTS;
  readonly payload: IIngredient[];
}

export interface ISetCurrentIngredientAction {
  readonly type: typeof SET_CURRENT_INGREDIENT;
  readonly payload: IIngredient;
}

export interface ISetOrderAction {
  readonly type: typeof SET_ORDER;
  readonly payload: string;
}

export interface IGetIngredientsRequestAction {
  readonly type: typeof GET_INGREDIENTS_REQUEST;
}

export interface IGetIngredientsSuccessAction {
  readonly type: typeof GET_INGREDIENTS_SUCCESS;
  readonly payload: IIngredient[];
}

export interface IGetIngredientsFailureAction {
  readonly type: typeof GET_INGREDIENTS_FAILURE;
  readonly payload: string;
}

export type TIngredientsActions =
  | ISetIngredientsAction
  | ISetCurrentIngredientAction
  | ISetOrderAction
  | IGetIngredientsRequestAction
  | IGetIngredientsSuccessAction
  | IGetIngredientsFailureAction;

export const setIngredients = (
  ingredients: IIngredient[]
): ISetIngredientsAction => ({
  type: SET_INGREDIENTS,
  payload: ingredients,
});

export const setCurrentIngredient = (
  ingredient: IIngredient
): ISetCurrentIngredientAction => ({
  type: SET_CURRENT_INGREDIENT,
  payload: ingredient,
});

export const setOrder = (order: string): ISetOrderAction => ({
  type: SET_ORDER,
  payload: order,
});

export const getIngredients = () => (dispatch: AppDispatch) => {
  dispatch({ type: GET_INGREDIENTS_REQUEST });
  fetchIngredients()
    .then((res) => {
      return dispatch({ type: GET_INGREDIENTS_SUCCESS, payload: res });
    })
    .catch((error) => {
      dispatch({ type: GET_INGREDIENTS_FAILURE, payload: error.message });
    });
};
