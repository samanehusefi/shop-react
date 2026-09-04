import { combineReducers } from "redux";

import menuReducer from "./Header/Menu/menuReducer";
import searchReducer from "./Header/Search/searchReducer";
import headerReducer from "./Header/headerReducer";
import sliderReducer from "./Home/Slider/sliderReducer";
import circleBadgeReducer from "./Home/CircleBadge/circleBadgeReducer";
const rootReducer = combineReducers({
  header: headerReducer,
  menu: menuReducer,
  search: searchReducer,
  slider: sliderReducer,
   circleBadge: circleBadgeReducer,
});

export default rootReducer;
