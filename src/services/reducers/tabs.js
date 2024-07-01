import { TAB_SWITCH } from '../actions/tabs';

const initialState = {
  currentTab: 'buns',
};

const tabReducer = (state = initialState, action) => {
  switch (action.type) {
    case TAB_SWITCH:
      return {
        ...state,
        currentTab: action.payload,
      };
    default:
      return state;
  }
};

export default tabReducer;