import { TAuthActions } from "../actions/auth";
import { TOrderActions } from "../actions/order";
import { TConstructorActions } from "../actions/constructor";
import { TIngredientsActions } from "../actions/ingredients";
import { TModalActions } from "../actions/modal";
import { TTabActions } from "../actions/tabs";
import { TOrderFeedWsActions, TOrderHistoryWsActions } from "../actions/wsActions";

export type TApplicationActions =
  | TAuthActions
  | TOrderActions
  | TConstructorActions
  | TModalActions
  | TTabActions
  | TIngredientsActions
  | TOrderFeedWsActions
  | TOrderHistoryWsActions;
