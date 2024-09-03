import constructorReducer, { TConstructorState } from "../reducers/constructor";
import {
  ADD_INGREDIENT,
  REMOVE_INGREDIENT,
  MOVE_INGREDIENT,
  INCREMENT_COUNT,
  DECREMENT_COUNT,
  CLEAR_CONSTRUCTOR,
} from "../constants/constructor";

const createIngredient = (type: string, key: string) => ({
  id: '1',
  _id: '1',
  name: 'test',
  type: type,
  key: key,
  calories: 0,
  proteins: 0,
  fat: 0,
  carbohydrates: 0,
  price: 0,
  image: 'test',
  image_mobile: 'test',
  image_large: 'test',
  count: 0,
  __v: 0
});

describe("constructorReducer", () => {
  const initialState: TConstructorState = {
    ingredients: [],
    bun: null,
    constructorIngredients: [],
  };

  const bun = createIngredient('bun', '1');
  const main = createIngredient('main', '2');
  const sauce = createIngredient('sauce', '3');

  test("should return the initial state", () => {
    expect(constructorReducer(undefined, {} as any)).toEqual(
      initialState
    );
  });

  test('should handle ADD_INGREDIENT "bun"', () => {
    const action = {
      type: ADD_INGREDIENT,
      payload: bun,
    };

    const expectedState = {
      ...initialState,
      bun: bun,
    };

    expect(constructorReducer(initialState, action)).toEqual(expectedState);
  });

  test('should handle ADD_INGREDIENT "main"', () => {
    const action = {
      type: ADD_INGREDIENT,
      payload: main,
    };

    const expectedState = {
      ...initialState,
      constructorIngredients: [main],
    };

    expect(constructorReducer(initialState, action)).toEqual(expectedState);
  });

  test('should handle ADD_INGREDIENT "sauce"', () => {
    const action = {
      type: ADD_INGREDIENT,
      payload: sauce,
    };

    const expectedState = {
      ...initialState,
      constructorIngredients: [sauce],
    };

    expect(constructorReducer(initialState, action)).toEqual(expectedState);
  });


  test("should handle REMOVE_INGREDIENT", () => {
    const stateWithIngredient = {
      ...initialState,
      constructorIngredients: [main],
    };

    const action = {
      type: REMOVE_INGREDIENT,
      payload: main.key,
    };

    const expectedState = {
      ...initialState,
      constructorIngredients: [],
    };

    expect(constructorReducer(stateWithIngredient, action)).toEqual(
      expectedState
    );
  });

  test("should handle INCREMENT_COUNT", () => {
    const stateWithIngredient = {
      ...initialState,
      constructorIngredients: [{ ...main, count: 1 }],
    };

    const action = {
      type: INCREMENT_COUNT,
      payload: main._id,
    };

    const expectedState = {
      ...initialState,
      constructorIngredients: [{ ...main, count: 2 }],
    };

    expect(constructorReducer(stateWithIngredient, action)).toEqual(
      expectedState
    );
  });

  test("should handle DECREMENT_COUNT", () => {
    const stateWithIngredient = {
      ...initialState,
      constructorIngredients: [{ ...main, count: 2 }],
    };

    const action = {
      type: DECREMENT_COUNT,
      payload: main._id,
    };

    const expectedState = {
      ...initialState,
      constructorIngredients: [{ ...main, count: 1 }],
    };

    expect(constructorReducer(stateWithIngredient, action)).toEqual(
      expectedState
    );
  });

  test("should handle MOVE_INGREDIENT", () => {
    const stateWithIngredients = {
      ...initialState,
      constructorIngredients: [
        { ...main, key: "2" },
        { ...main, key: "3" },
      ],
    };

    const action = {
      type: MOVE_INGREDIENT,
      payload: { dragIndex: 0, toIndex: 1 },
    };

    const expectedState = {
      ...initialState,
      constructorIngredients: [
        { ...main, key: "3" },
        { ...main, key: "2" },
      ],
    };

    expect(constructorReducer(stateWithIngredients, action)).toEqual(
      expectedState
    );
  });

  test("should handle CLEAR_CONSTRUCTOR", () => {
    const stateWithIngredients = {
      ...initialState,
      constructorIngredients: [main],
      bun: bun,
    };

    const action = { type: CLEAR_CONSTRUCTOR };

    expect(constructorReducer(stateWithIngredients, action)).toEqual(
      initialState
    );
  });
});
