import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

import HeaderMain from "./HeaderMain/HeaderMain";
import MegaMenu from "./HeaderMain/MegaMenu/MegaMenu";
import TopBanner from "./TopBanner/TopBanner";
import Menu from "./HeaderMain/MegaMenu/Menu";

import { fetchHeader } from "../../../Redux/Header/action";
import { getMegaMenuAction } from "../../../Redux/Header/MegaMenu/action";
import { getNavBarAction } from "../../../Redux/Header/Navbar/action";
import type { AppDispatch } from "../../../Redux/store";

const Header = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [isMegaMenuOpen, setIsMegaMenuOpen] = useState(false);

  useEffect(() => {
    dispatch(fetchHeader());
    dispatch(getMegaMenuAction());
    dispatch(getNavBarAction());
  }, [dispatch]);

  return (
    <header>
      <TopBanner />

      <div
        className="relative z-40 flex w-full flex-wrap bg-white  shadow transition-all duration-500 ease-in-out "
        id="navbar"
      >
        <HeaderMain />

        <div
          className="relative hidden w-full md:block"
          onMouseLeave={() => setIsMegaMenuOpen(false)}
        >
          <Menu setIsMegaMenuOpen={setIsMegaMenuOpen} />

          {isMegaMenuOpen && <MegaMenu />}
        </div>
      </div>
    </header>
  );
};

export default Header;
