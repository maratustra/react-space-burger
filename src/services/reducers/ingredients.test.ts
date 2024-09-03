import ingredientsReducer, { TIngredientsState } from '../reducers/ingredients';
import {
  SET_INGREDIENTS,
  SET_CURRENT_INGREDIENT,
  SET_ORDER,
  GET_INGREDIENTS_REQUEST,
  GET_INGREDIENTS_SUCCESS,
  GET_INGREDIENTS_FAILURE,
} from '../constants/ingredients';
import { IIngredient } from '../../types';

const createIngredient = (): IIngredient => ({
  id: '1',
  _id: '1',
  name: 'test',
  calories: 0,
  proteins: 0,
  fat: 0,
  carbohydrates: 0,
  price: 0,
  image: 'test',
  image_mobile: 'test',
  image_large: 'test',
  type: 'main',
  key: '1',
  count: 0,
  __v: 0
});

describe('ingredientsReducer', () => {
  const initialState: TIngredientsState = {
    ingredients: [],
    constructorIngredients: [],
    currentIngredient: null,
    order: null,
    error: null,
    isLoading: false,
  };

  test('should return the initial state', () => {
    expect(ingredientsReducer(undefined, {} as any)).toEqual(initialState);
  });

  test('should handle GET_INGREDIENTS_REQUEST', () => {
    const expectedState = {
      ...initialState,
      isLoading: true,
    };

    expect(ingredientsReducer(initialState, { type: GET_INGREDIENTS_REQUEST })).toEqual(expectedState);
  });

  test('should handle GET_INGREDIENTS_SUCCESS', () => {
    const ingredients = [createIngredient()];
    const action = { type: GET_INGREDIENTS_SUCCESS, payload: ingredients };
    const expectedState = {
      ...initialState,
      isLoading: false,
      ingredients: ingredients,
      error: null,
    };

    expect(ingredientsReducer(initialState, action)).toEqual(expectedState);
  });

  test('should handle GET_INGREDIENTS_FAILURE', () => {
    const error = 'Failed to load ingredients';
    const action = { type: GET_INGREDIENTS_FAILURE, payload: error };
    const expectedState = {
      ...initialState,
      isLoading: false,
      error: error,
      ingredients: [],
    };

    expect(ingredientsReducer(initialState, action)).toEqual(expectedState);
  });

  test('should handle SET_INGREDIENTS', () => {
    const ingredients = [createIngredient()];
    const action = { type: SET_INGREDIENTS, payload: ingredients };
    const expectedState = {
      ...initialState,
      ingredients: ingredients,
    };

    expect(ingredientsReducer(initialState, action)).toEqual(expectedState);
  });

  test('should handle SET_CURRENT_INGREDIENT', () => {
    const ingredient = createIngredient();
    const action = { type: SET_CURRENT_INGREDIENT, payload: ingredient };
    const expectedState = {
      ...initialState,
      currentIngredient: ingredient,
    };

    expect(ingredientsReducer(initialState, action)).toEqual(expectedState);
  });

  test('should handle SET_ORDER', () => {
    const orderId = 'order123';
    const action = { type: SET_ORDER, payload: orderId };
    const expectedState = {
      ...initialState,
      order: orderId,
    };

    expect(ingredientsReducer(initialState, action)).toEqual(expectedState);
  });
});