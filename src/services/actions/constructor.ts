import { v4 as uuidv4 } from "uuid";
import { IIngredient } from "../../types/index";

import {
  ADD_INGREDIENT,
  REMOVE_INGREDIENT,
  MOVE_INGREDIENT,
  INCREMENT_COUNT,
  DECREMENT_COUNT,
  CLEAR_CONSTRUCTOR,
} from "../constants/constructor";

export interface IAddIngredientAction {
  readonly type: typeof ADD_INGREDIENT;
  readonly payload: IIngredient & { key: string };
}

export interface IRemoveIngredientAction {
  readonly type: typeof REMOVE_INGREDIENT;
  readonly payload: string;
}

export interface IMoveIngredientAction {
  readonly type: typeof MOVE_INGREDIENT;
  readonly payload: {
    dragIndex: number;
    toIndex: number;
  };
}

export interface IIncrementCountAction {
  readonly type: typeof INCREMENT_COUNT;
  readonly payload: string;
}

export interface IDecrementCountAction {
  readonly type: typeof DECREMENT_COUNT;
  readonly payload: string;
}

export interface IClearConstructorAction {
  readonly type: typeof CLEAR_CONSTRUCTOR;
}

export type TConstructorActions =
  | IAddIngredientAction
  | IRemoveIngredientAction
  | IMoveIngredientAction
  | IIncrementCountAction
  | IDecrementCountAction
  | IClearConstructorAction;

export const addIngredient = (
  ingredient: IIngredient
): IAddIngredientAction => ({
  type: ADD_INGREDIENT,
  payload: { ...ingredient, key: uuidv4() },
});

export const removeIngredient = (key: string): IRemoveIngredientAction => ({
  type: REMOVE_INGREDIENT,
  payload: key,
});

export const moveIngredient = (
  dragIndex: number,
  toIndex: number
): IMoveIngredientAction => ({
  type: MOVE_INGREDIENT,
  payload: { dragIndex, toIndex },
});

export const incrementCount = (id: string): IIncrementCountAction => ({
  type: INCREMENT_COUNT,
  payload: id,
});

export const decrementCount = (id: string): IDecrementCountAction => ({
  type: DECREMENT_COUNT,
  payload: id,
});

export const clearConstructor = (): IClearConstructorAction => ({
  type: CLEAR_CONSTRUCTOR,
});
