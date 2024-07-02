import {
  ADD_INGREDIENT,
  REMOVE_INGREDIENT,
  INCREMENT_COUNT,
  DECREMENT_COUNT,
} from "../actions/constructor";

const initialState = {
  bun: null,
  constructorIngredients: [],
};

const constructorReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_INGREDIENT:
      if (action.payload.type === 'bun') {
        const existingBun = state.bun ? [state.bun] : [];
        return {
          ...state,
          bun: action.payload,
          constructorIngredients: [
            ...state.constructorIngredients.filter(ingredient => ingredient.type !== 'bun'),
            action.payload
          ],
        }
      } else {
        return {
          ...state,
          constructorIngredients: [...state.constructorIngredients, action.payload],
        };
      }
    case REMOVE_INGREDIENT:
      return {
        ...state,
        constructorIngredients: state.constructorIngredients.filter((ingredient) => 
          ingredient.key !== action.payload
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
    default:
      return state;
  }
};

export default constructorReducer;
