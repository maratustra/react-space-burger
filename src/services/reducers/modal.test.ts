import modalReducer, { initialState } from '../reducers/modal';
import { OPEN_MODAL, CLOSE_MODAL } from '../constants/modal';
import { ModalContentType } from '../../types';
import { describe, test, expect } from 'vitest'; 

const modalPayload = {
  contentType: 'ingredientDetails' as ModalContentType,
  contentProps: { id: '123' },
  title: 'Order details',
};

describe('modalReducer', () => {
  test('should return the initial state', () => {
    expect(modalReducer(undefined, {} as any)).toEqual(initialState);
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