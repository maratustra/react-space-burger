import { TAB_SWITCH } from '../constants/tabs';
import { TTabActions } from '../actions/tabs';

export type TTabState = {
  currentTab: string
} 

export const initialState: TTabState = {
  currentTab: 'buns',
};

const tabReducer = (state: TTabState = initialState, action: TTabActions): TTabState => {
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