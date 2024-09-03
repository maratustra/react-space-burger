import { TAB_SWITCH } from '../constants/tabs';

export interface ITabSwitchAction {
  readonly type: typeof TAB_SWITCH;
  readonly payload: string;
}

export const switchTab = (tab: string): ITabSwitchAction => ({
  type: TAB_SWITCH,
  payload: tab,
});

export type TTabActions = | {} | ITabSwitchAction;
