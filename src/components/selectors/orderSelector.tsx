import { createSelector } from 'reselect';
import { IIngredient } from "../../types";

const selectBun = (state: any) => state.constructorReducer.bun;
const selectConstructorIngredients = (state: any)  => state.constructorReducer.constructorIngredients;

export const selectOrderTotal = createSelector(
  [selectBun, selectConstructorIngredients],
  (bun: IIngredient | null, constructorIngredients: IIngredient[]): number => {
    const bunTotal = bun ? bun.price : 0;
    const ingredientsTotal = constructorIngredients.reduce((sum: number, ingredient: IIngredient) => sum + ingredient.price, 0);
    return bunTotal + ingredientsTotal;
  }
);
