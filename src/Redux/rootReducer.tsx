import { combineReducers } from "redux";

import menuReducer from "./Header/MegaMenu/megaMenuReducer";
import searchReducer from "./Header/Search/searchReducer";
import headerReducer from "./Header/headerReducer";
import sliderReducer from "./Home/Slider/sliderReducer";
import circleBadgeReducer from "./Home/CircleBadge/circleBadgeReducer";
import amazingReducer from "./Home/Amazing/amazingReducer";
import NavBarReducer from "./Header/Navbar/navbarReducer";
import bannerReducer from "./Home/Banner/bannerReducer";
import categoriesReducer from "./Home/Categories/categoriesReducer";
const rootReducer = combineReducers({
  header: headerReducer,
  menu: menuReducer,
  search: searchReducer,
  slider: sliderReducer,
  circleBadge: circleBadgeReducer,
  amazing: amazingReducer,
  navbar: NavBarReducer,
  banner: bannerReducer,
  categories: categoriesReducer,
});

export default rootReducer;
