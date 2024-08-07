import { ComponentType } from "react";

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

// Определяем типы контента модальных окон
export type ModalContentType = "ingredientDetails" | "orderDetails";

// Определяем типы пропсов для модальных компонентов
export interface ModalContentProps {
  ingredient?: any; // Замените `any` на реальный тип ингредиента
}

// Определяем карту компонентов
export type ComponentMap = {
  [key in ModalContentType]: ComponentType<ModalContentProps>;
};

export {};
