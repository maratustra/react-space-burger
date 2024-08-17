import { OPEN_MODAL, CLOSE_MODAL } from "../constants/modal";
import { TModalActions } from "../actions/modal";
import { type ModalContentType, type ModalContentProps } from '../../types';
import OrderDetails from "../../components/order-details/order-details";
import IngredientDetails from "../../components/ingredient-details/ingredient-details";

export type TModalState = {
  isOpen: boolean;
  contentType: ModalContentType | null;
  contentProps: ModalContentProps | null;
  title: string;
};

const initialState: TModalState = {
  isOpen: false,
  contentType: null,
  contentProps: null,
  title: "",
};

const componentMap = {
  ingredientDetails: IngredientDetails,
  orderDetails: OrderDetails,
};

const modalReducer = (state: TModalState = initialState, action: TModalActions): TModalState => {
  switch (action.type) {
    case OPEN_MODAL:
      console.log('contentProps in OPEN_MODAL action:', action.payload.contentProps);
      return {
        ...state,
        isOpen: true,
        contentType: action.payload.contentType,
        contentProps: action.payload.contentProps || {},
        title: action.payload.title,
      };
    case CLOSE_MODAL:
      return {
        ...state,
        isOpen: false,
        contentType: null,
        contentProps: null,
        title: "",
      };
    default:
      return state;
  }
};

export default modalReducer;
export { componentMap };