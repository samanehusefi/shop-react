import Amazing from "../Home/Amazing/Amazing";
import BottomBanner from "../Home/Banners/BottomBanner/BottomBanner";
import HeroBanner from "../Home/Banners/HeroBanner/HeroBanner";
import MiddleBanner from "../Home/Banners/MiddleBanner/MiddleBanner";
import TopBanner from "../Home/Banners/TopBanner/TopBanner";
import Categories from "../Home/Categories/Categories";
import CircleBadge from "../Home/CircleBadge/CircleBadge";
import Slider from "../Home/Slider/Slider";
import Header from "../Layout/Header/Header";

const App = () => {
  return (
    <div className="w-full  h-screen mx-auto">
      <>
        <Header />
        <Slider />
        <CircleBadge />
        <Amazing />
        <HeroBanner />
        <Categories />
        <TopBanner />
        <MiddleBanner />
        <BottomBanner />
      </>
    </div>
  );
};

export default App;
