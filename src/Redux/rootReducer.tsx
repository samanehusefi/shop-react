import { combineReducers } from "redux";

import menuReducer from "./Header/Menu/menuReducer";
import searchReducer from "./Header/Search/searchReducer";
import headerReducer from "./Header/headerReducer";

const rootReducer = combineReducers({
  header: headerReducer,
  menu: menuReducer,
  search: searchReducer,
});

export default rootReducer;
