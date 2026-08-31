import HeaderMain from "./HeaderMain/HeaderMain";
import Menu from "./HeaderMain/Menu/Menu";
import TopBanner from "./TopBanner/TopBanner";
import { fetchHeader } from "../../../Redux/Header/action";
import { useDispatch } from "react-redux";
import { useEffect } from "react";

const Header = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchHeader() as any);
  }, [dispatch]);

  return (
    <header>
      <TopBanner />
      <div
        className="bg-white shadow flex flex-wrap left-0 w-full z-40 transition-all duration-500 ease-in-out md:py-3"
        id="navbar"
      >
        <HeaderMain />
        <Menu />
      </div>
    </header>
  );
};

export default Header;
