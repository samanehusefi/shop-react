import { useEffect } from "react";
import { useDispatch } from "react-redux";

import type { AppDispatch } from "../../Redux/store";

import Amazing from "../Home/Amazing/Amazing";
import BottomBanner from "../Home/Banners/BottomBanner/BottomBanner";
import HeroBanner from "../Home/Banners/HeroBanner/HeroBanner";
import MiddleBanner from "../Home/Banners/MiddleBanner/MiddleBanner";
import TopBanner from "../Home/Banners/TopBanner/TopBanner";
import Brands from "../Home/Brands/Brands";
import Categories from "../Home/Categories/Categories";
import CircleBadge from "../Home/CircleBadge/CircleBadge";
import Products from "../Home/Products/Products";
import Slider from "../Home/Slider/Slider";

import { getSlider } from "../../Redux/Home/Slider/action";
import { getCircleBadge } from "../../Redux/Home/CircleBadge/action";
import { getAmazing } from "../../Redux/Home/Amazing/action";
import { getCategoriesAction } from "../../Redux/Home/Categories/action";
import { getProducts } from "../../Redux/Home/Products/action";
import { getBrands } from "../../Redux/Home/Brands/action";
import { getBanners } from "../../Redux/Home/Banner/action";

const App = () => {
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(getSlider());
    dispatch(getCircleBadge());
    dispatch(getAmazing());
    dispatch(getCategoriesAction());
    dispatch(getProducts());
    dispatch(getBrands());
    dispatch(getBanners());
  }, [dispatch]);

  return (
    <div className="mx-auto min-h-screen w-full">
      <Slider />
      <CircleBadge />
      <Amazing />
      <HeroBanner />
      <Categories />
      <TopBanner />
      <Products />
      <MiddleBanner />
      <Brands />
      <BottomBanner />
    </div>
  );
};

export default App;
