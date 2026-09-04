import type { Reducer } from "redux";

interface MenuState {
  isOpen: boolean;
}

interface MenuAction {
  type: string;
  payload?: boolean;
}

const initialState: MenuState = {
  isOpen: false,
};

const menuReducer: Reducer<MenuState, MenuAction> = (
  state = initialState,
  action,
): MenuState => {
  switch (action.type) {
    default:
      return state;
  }
};

export default menuReducer;
