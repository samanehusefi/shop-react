import { useEffect, useRef, useState } from "react";
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

  const categoryMenuRef = useRef<HTMLDivElement>(null);

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
    <header className="shadow-lg">
      <div
        className={`bg-white  ${
          isScrolled
            ? "fixed left-0 right-0 top-0 z-40 shadow-lg"
            : "relative z-50"
        }`}
      >
        <TopBanner />
        <HeaderMain />
      </div>

      {!isScrolled && (
        <div
          className="relative z-40 hidden w-full md:block"
          onMouseLeave={() => setIsMegaMenuOpen(false)}
        >
          <Menu
            setIsMegaMenuOpen={setIsMegaMenuOpen}
            categoryMenuRef={categoryMenuRef}
          />

          {isMegaMenuOpen && <MegaMenu anchorRef={categoryMenuRef} />}
        </div>
      )}
    </header>
  );
};

export default Header;
