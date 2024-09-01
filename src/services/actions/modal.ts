import { OPEN_MODAL, CLOSE_MODAL } from "../constants/modal";
import { type ModalContentType, type ModalContentProps } from "../../types";

export interface IOpenModalAction {
  readonly type: typeof OPEN_MODAL;
  readonly payload: {
    contentType: ModalContentType;
    contentProps: ModalContentProps;
    title: string;
  };
}

export interface ICloseModalAction {
  readonly type: typeof CLOSE_MODAL;
}

export type TModalActions = IOpenModalAction | ICloseModalAction;

export const openModal = (
  contentType: ModalContentType,
  contentProps: ModalContentProps,
  title: string
): IOpenModalAction => {
  return {
    type: OPEN_MODAL,
    payload: { contentType, contentProps, title },
  };
};

export const closeModal = (): ICloseModalAction => ({
  type: CLOSE_MODAL,
});
