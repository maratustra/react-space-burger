export interface IIngredient {
  id: string;
  _id: string;
  name: string;
  calories: number;
  proteins: number;
  fat: number;
  carbohydrates: number;
  price: number;
  image: string;
  image_mobile: string;
  image_large: string;
  type: string;
  key: string;
  count: number;
  __v: number;
}

export const ItemTypes = {
  INGREDIENT: "ingredient",
  MOVABLEINGREDIENT: "movableIngredient"
};

export {};
