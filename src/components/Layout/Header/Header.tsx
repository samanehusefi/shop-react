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
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    dispatch(fetchHeader());
    dispatch(getMegaMenuAction());
    dispatch(getNavBarAction());
  }, [dispatch]);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);

      if (window.scrollY > 50) {
        setIsMegaMenuOpen(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <header>
      <TopBanner />

      <div
        className={`z-40 bg-white ${
          isScrolled ? "fixed left-0 right-0 top-0" : "relative"
        }`}
      >
        <HeaderMain />
      </div>

      {!isScrolled && (
        <div
          className={`relative hidden w-full md:block transition-transform duration-1000 ease-in-out ${
            isScrolled
              ? "-translate-y-full pointer-events-none"
              : "translate-y-0"
          }`}
          onMouseLeave={() => setIsMegaMenuOpen(false)}
        >
          <Menu setIsMegaMenuOpen={setIsMegaMenuOpen} />

          {!isScrolled && isMegaMenuOpen && <MegaMenu />}
        </div>
      )}
    </header>
  );
};

export default Header;
