import {
  ADD_INGREDIENT,
  REMOVE_INGREDIENT,
  INCREMENT_COUNT,
  DECREMENT_COUNT,
  MOVE_INGREDIENT,
  CLEAR_CONSTRUCTOR
} from "../actions/constructor";
import update from "immutability-helper";

const initialState = {
  bun: null,
  constructorIngredients: [],
};

const constructorReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_INGREDIENT:
      if (action.payload.type === "bun") {
        return {
          ...state,
          bun: action.payload,
        };
      } else {
        return {
          ...state,
          constructorIngredients: [
            ...state.constructorIngredients,
            action.payload,
          ],
        };
      }
    case REMOVE_INGREDIENT:
      return {
        ...state,
        constructorIngredients: state.constructorIngredients.filter(
          (ingredient) => ingredient.key !== action.payload
        ),
      };
    case INCREMENT_COUNT:
      return {
        ...state,
        constructorIngredients: state.constructorIngredients.map((ingredient) =>
          ingredient._id === action.payload
            ? { ...ingredient, count: (ingredient.count ?? 0) + 1 }
            : ingredient
        ),
      };
    case DECREMENT_COUNT:
      return {
        ...state,
        constructorIngredients: state.constructorIngredients.map((ingredient) =>
          ingredient._id === action.payload
            ? { ...ingredient, count: (ingredient.count ?? 0) - 1 }
            : ingredient
        ),
      };
    case MOVE_INGREDIENT:
      const { dragIndex, toIndex } = action.payload;

      const newState = update(state, {
        constructorIngredients: {
          $splice: [
            [dragIndex, 1],
            [toIndex, 0, state.constructorIngredients[dragIndex]],
          ],
        },
      });

      return newState;
    case CLEAR_CONSTRUCTOR:
        return initialState;

    default:
      return state;
  }
};

export default constructorReducer;
