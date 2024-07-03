import { v4 as uuidv4 } from 'uuid';

export const ADD_INGREDIENT = 'ADD_INGREDIENT';
export const REMOVE_INGREDIENT = 'REMOVE_INGREDIENT';

export const INCREMENT_COUNT = 'INCREMENT_COUNT';
export const DECREMENT_COUNT = 'DECREMENT_COUNT';

export const MOVE_INGREDIENT = 'MOVE_INGREDIENT';

export const addIngredient = (ingredient) => ({
  type: ADD_INGREDIENT,
  payload: { ...ingredient, key: uuidv4() }
});

export const removeIngredient = (key) => ({
  type: REMOVE_INGREDIENT,
  payload: key
});

export const incrementCount = (id) => ({
  type: INCREMENT_COUNT,
  payload: id
});

export const decrementCount = (id) => ({
  type: DECREMENT_COUNT,
  payload: id
});

export const moveIngredient = (dragIndex, toIndex) => ({
  type: MOVE_INGREDIENT,
  payload: { dragIndex, toIndex }
});
