import { TAuthActions } from "../actions/auth";
import { TOrderActions } from "../actions/order";
import { TConstructorActions } from "../actions/constructor";
import { TIngredientsActions } from "../actions/ingredients";
import { TModalActions } from "../actions/modal";
import { TTabActions } from "../actions/tabs";

// Общий тип всех actions
export type TApplicationActions =
  | TAuthActions
  | TOrderActions
  | TConstructorActions
  | TModalActions
  | TTabActions
  | TIngredientsActions;

