import { createSelector } from 'reselect';

const selectBun = state => state.constructorReducer.bun;
const selectConstructorIngredients = state => state.constructorReducer.constructorIngredients;

export const selectOrderTotal = createSelector(
  [selectBun, selectConstructorIngredients],
  (bun, constructorIngredients) => {
    const bunTotal = bun ? bun.price : 0;
    const ingredientsTotal = constructorIngredients.reduce((sum, ingredient) => sum + ingredient.price, 0);
    return bunTotal + ingredientsTotal;
  }
);
