export const OPEN_MODAL = "OPEN_MODAL";
export const CLOSE_MODAL = "CLOSE_MODAL";

export const openModal = (contentType, contentProps, title) => ({
  type: OPEN_MODAL,
  payload: { contentType, contentProps, title },
});

export const closeModal = () => ({
  type: CLOSE_MODAL,
});