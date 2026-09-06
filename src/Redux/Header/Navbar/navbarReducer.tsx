import type { INavBarItems } from "../../../Types/Header/INavbarItem";
import { GET_NAVBAR_MENU, SET_ACTIVE_NAVBAR } from "./actiontype";

interface INavBarState {
  NavBar: INavBarItems[];
  activeNavBar: string | null;
}

const initialState: INavBarState = {
  NavBar: [],
  activeNavBar: null,
};

interface IGetNavBarAction {
  type: typeof GET_NAVBAR_MENU;
  payload: INavBarItems[];
}

interface ISetActiveNavBarAction {
  type: typeof SET_ACTIVE_NAVBAR;
  payload: string | null;
}

type NavBarAction = IGetNavBarAction | ISetActiveNavBarAction;

const NavBarReducer = (
  state = initialState,
  action: NavBarAction,
): INavBarState => {
  switch (action.type) {
    case GET_NAVBAR_MENU:
      return {
        ...state,
        NavBar: action.payload,
      };

    case SET_ACTIVE_NAVBAR:
      return {
        ...state,
        activeNavBar: action.payload,
      };

    default:
      return state;
  }
};

export default NavBarReducer;
