import topNavGif from "/assets/header/topnav.gif";
import topNavWebp from "/assets/header/topnav.webp";
const TopBanner = () => {
  return (
    <div
      id="topBanner"
      className="top-nav bg-gray-200 z-40 relative transition-all
      duration-300 overflow-hidden"
    >
      <img
        className="block lg:hidden"
        src={topNavGif}
        alt="header-top-banner"
      />

      <img
        className="hidden lg:block"
        src={topNavWebp}
        alt="header-top-banner"
      />
    </div>
  );
};

export default TopBanner;
