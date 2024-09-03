import modalReducer, { TModalState } from '../reducers/modal';
import { OPEN_MODAL, CLOSE_MODAL } from '../constants/modal';
import { ModalContentType } from '../../types';

const modalPayload = {
  contentType: 'ingredientDetails' as ModalContentType,
  contentProps: { id: '123' },
  title: 'Детали заказа',
};

describe('modalReducer', () => {
  const initialState: TModalState = {
    isOpen: false,
    contentType: null,
    contentProps: null,
    title: '',
  };

  test('should return the initial state', () => {
    expect(modalReducer(undefined, {})).toEqual(initialState);
  });

  test('should handle OPEN_MODAL', () => {
    const action = { type: OPEN_MODAL, payload: modalPayload };
    const expectedState = {
      ...initialState,
      isOpen: true,
      contentType: modalPayload.contentType,
      contentProps: modalPayload.contentProps,
      title: modalPayload.title,
    };

    expect(modalReducer(initialState, action)).toEqual(expectedState);
  });

  test('should handle CLOSE_MODAL', () => {
    const stateWithModalOpen = {
      ...initialState,
      isOpen: true,
      contentType: modalPayload.contentType,
      contentProps: modalPayload.contentProps,
      title: modalPayload.title,
    };
    const expectedState = initialState;

    expect(modalReducer(stateWithModalOpen, { type: CLOSE_MODAL })).toEqual(expectedState);
  });
});