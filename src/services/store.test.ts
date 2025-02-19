import fetchMock from "jest-fetch-mock";
import { rootReducer } from "./store";
import { TIngredientsActions } from "./actions/ingredients";
import { GET_INGREDIENTS_REQUEST, GET_INGREDIENTS_SUCCESS, GET_INGREDIENTS_FAILURE } from "./constants/ingredients";
import { IIngredient } from "../types/index";

describe("Redux store and actions", () => {
  beforeEach(() => {
    fetchMock.resetMocks();
    fetchMock.mockResponseOnce(JSON.stringify({ result: "OK" }));
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  test("should return the initial state", () => {
    expect(rootReducer(undefined, {} as any)).toEqual({
      user: expect.any(Object),
      ingredients: expect.any(Object),
      modal: expect.any(Object),
      order: expect.any(Object),
      tabs: expect.any(Object),
      constructorReducer: expect.any(Object),
      orderFeed: expect.any(Object),
      orderHistory: expect.any(Object),
    });
  });

  test("should handle GET_INGREDIENTS_REQUEST", () => {
    const initialState = rootReducer(undefined, {} as TIngredientsActions);
    const action: TIngredientsActions = { type: GET_INGREDIENTS_REQUEST };
    const newState = rootReducer(initialState, action);

    expect(newState.ingredients).toEqual({
      ...initialState.ingredients,
      isLoading: true,
      error: null,
    });
  });

  test("should handle GET_INGREDIENTS_SUCCESS", () => {
    const initialState = rootReducer(undefined, {} as TIngredientsActions);
    const mockIngredients: IIngredient[] = [
      {
        id: "1",
        _id: "1",
        name: "test",
        calories: 0,
        proteins: 0,
        fat: 0,
        carbohydrates: 0,
        price: 0,
        image: "test",
        image_mobile: "test",
        image_large: "test",
        type: "bun",
        key: "1",
        count: 0,
        __v: 0
      },
      {
        id: "2",
        _id: "2",
        name: "test",
        calories: 0,
        proteins: 0,
        fat: 0,
        carbohydrates: 0,
        price: 0,
        image: "test",
        image_mobile: "test",
        image_large: "test",
        type: "main",
        key: "2",
        count: 0,
        __v: 0
      }
    ];
    const action: TIngredientsActions = { 
      type: GET_INGREDIENTS_SUCCESS, 
      payload: mockIngredients 
    };
    const newState = rootReducer(initialState, action);

    expect(newState.ingredients).toEqual({
      ...initialState.ingredients,
      ingredients: mockIngredients,
      isLoading: false,
      error: null,
      constructorIngredients: [],
      currentIngredient: null,
      order: null
    });
  });

  test("should handle GET_INGREDIENTS_FAILURE", () => {
    const initialState = rootReducer(undefined, {} as TIngredientsActions);
    const errorMessage = "Failed to fetch ingredients";
    const action: TIngredientsActions = { 
      type: GET_INGREDIENTS_FAILURE, 
      payload: errorMessage 
    };
    const newState = rootReducer(initialState, action);

    expect(newState.ingredients).toEqual({
      ...initialState.ingredients,
      isLoading: false,
      error: errorMessage,
      ingredients: [],
      constructorIngredients: [],
      currentIngredient: null,
      order: null
    });
  });
});
