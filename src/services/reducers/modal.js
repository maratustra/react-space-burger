import { OPEN_MODAL, CLOSE_MODAL } from "../actions/modal";

const initialState = {
  isOpen: false,
  contentType: null,
  contentProps: null,
  title: "",
};

const modalReducer = (state = initialState, action) => {
  switch (action.type) {
    case OPEN_MODAL:
      return {
        ...state,
        isOpen: true,
        contentType: action.payload.contentType,
        contentProps: action.payload.contentProps,
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