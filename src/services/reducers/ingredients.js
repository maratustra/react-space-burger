import {
  SET_INGREDIENTS,
  ADD_INGREDIENT,
  REMOVE_INGREDIENT,
  SET_CURRENT_INGREDIENT,
  SET_ORDER,
} from "../actions/ingredients";

const initialState = {
  ingredients: [],
  constructorIngredients: [],
  currentIngredient: null,
  order: null,
};

export const ingredientsReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_INGREDIENTS:
      return {
        ...state,
        ingredients: action.payload,
      };
    case ADD_INGREDIENT:
      return {
        ...state,
        constructorIngredients: [
          ...state.constructorIngredients,
          action.payload,
        ],
      };
    case REMOVE_INGREDIENT:
      return {
        ...state,
        constructorIngredients: state.constructorIngredients.filter(
          (item) => item._id !== action.payload // TODO: или action.id ?
        ),
      };
    case SET_CURRENT_INGREDIENT:
      return {
        ...state,
        currentIngredient: action.payload,
      };
    case SET_ORDER:
      return {
        ...state,
        order: action.payload,
      };
    default:
      return state;
  }
};
