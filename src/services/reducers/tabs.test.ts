import tabReducer, { TTabState } from '../reducers/tabs';
import { TAB_SWITCH } from '../constants/tabs';

describe('tabReducer', () => {
  const initialState: TTabState = {
    currentTab: 'buns',
  };

  test('should return the initial state', () => {
    expect(tabReducer(undefined, {})).toEqual(initialState);
  });

  test('should handle TAB_SWITCH', () => {
    const newTab = 'sauces';
    const action = { type: TAB_SWITCH, payload: newTab };
    const expectedState = {
      ...initialState,
      currentTab: newTab,
    };

    expect(tabReducer(initialState, action)).toEqual(expectedState);
  });
});