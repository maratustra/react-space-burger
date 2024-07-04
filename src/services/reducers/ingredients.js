import {
  SET_INGREDIENTS,
  SET_CURRENT_INGREDIENT,
  SET_ORDER,
  GET_INGREDIENTS_REQUEST,
  GET_INGREDIENTS_SUCCESS,
  GET_INGREDIENTS_FAILURE
} from "../actions/ingredients";

const initialState = {
  ingredients: [],
  constructorIngredients: [],
  currentIngredient: null,
  order: null,
  error: null,
  isLoading: false
};

const ingredientsReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_INGREDIENTS_REQUEST: {
      return {
        ...state,
        isLoading: true,
      }
    }
    case GET_INGREDIENTS_SUCCESS: {
      return {
        ...state,
        isLoading: false,
        error: null,
        ingredients: action.payload
      }
    }
    case GET_INGREDIENTS_FAILURE: {
      return {
        ...state,
        isLoading: false,
        error: action.payload,
        ingredients: []
      }
    }
    case SET_INGREDIENTS:
      return {
        ...state,
        ingredients: action.payload,
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

export default ingredientsReducer;