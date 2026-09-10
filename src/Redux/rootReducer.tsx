import { combineReducers } from "redux";

import menuReducer from "./Header/MegaMenu/megaMenuReducer";
import searchReducer from "./Header/Search/searchReducer";
import headerReducer from "./Header/headerReducer";
import sliderReducer from "./Home/Slider/sliderReducer";
import circleBadgeReducer from "./Home/CircleBadge/circleBadgeReducer";
import amazingReducer from "./Home/Amazing/amazingReducer";
import navBarReducer from "./Header/Navbar/navbarReducer";
import bannerReducer from "./Home/Banner/bannerReducer";
import categoriesReducer from "./Home/Categories/categoriesReducer";
import footerReducer from "./Footer/footerReducer";
import brandsReducer from "./Home/Brands/brandsReducer";
const rootReducer = combineReducers({
  header: headerReducer,
  menu: menuReducer,
  search: searchReducer,
  slider: sliderReducer,
  circleBadge: circleBadgeReducer,
  amazing: amazingReducer,
  navbar: navBarReducer,
  banner: bannerReducer,
  categories: categoriesReducer,
  footer: footerReducer,
  brands: brandsReducer,
});

export default rootReducer;
