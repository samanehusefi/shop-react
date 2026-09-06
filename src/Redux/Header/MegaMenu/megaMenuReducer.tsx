import type { IMegaMenu } from "../../../Types/Header/IMegaMenu";
import { GET_MEGA_MENU, SET_ACTIVE_MEGA_MENU } from "./actiontype";
interface IMegaMenuState {
  megaMenu: IMegaMenu[];
  activeMegaMenu: string | null;
}

const initialState: IMegaMenuState = {
  megaMenu: [],
  activeMegaMenu: null,
};

interface ISetActiveMegaMenuAction {
  type: typeof SET_ACTIVE_MEGA_MENU;
  payload: string | null;
}
interface IGetMegaMenuAction {
  type: typeof GET_MEGA_MENU;
  payload: IMegaMenu[];
}
type MegaMenuAction = IGetMegaMenuAction | ISetActiveMegaMenuAction;

const megaMenuReducer = (
  state = initialState,
  action: MegaMenuAction,
): IMegaMenuState => {
  switch (action.type) {
    case GET_MEGA_MENU:
      return {
        ...state,
        megaMenu: action.payload,
      };

    case SET_ACTIVE_MEGA_MENU:
      return {
        ...state,
        activeMegaMenu: action.payload,
      };

    default:
      return state;
  }
};

export default megaMenuReducer;
