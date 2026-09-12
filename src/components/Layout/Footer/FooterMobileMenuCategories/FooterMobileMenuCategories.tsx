import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { LuArrowRight } from "react-icons/lu";

import type { AppDispatch, RootState } from "../../../../Redux/store";
import {
  getMegaMenuAction,
  setActiveMegaMenu,
} from "../../../../Redux/Header/MegaMenu/action";

import MobileCategoriesSidebar from "./MobileCategoriesSidebar";
import MobileCategoriesContent from "./MobileCategoriesContent";
import FooterBottomNav from "../FooterBottomNav";
import Search from "../../Header/HeaderMain/Search/Search";
const FooterMobileMenuCategories = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();

  const megaMenu = useSelector((state: RootState) => state.menu.megaMenu);

  const activeMegaMenu = useSelector(
    (state: RootState) => state.menu.activeMegaMenu,
  );

  useEffect(() => {
    if (!megaMenu.length) {
      dispatch(getMegaMenuAction());
    }
  }, [dispatch, megaMenu.length]);

  useEffect(() => {
    if (megaMenu.length && !activeMegaMenu) {
      dispatch(setActiveMegaMenu(megaMenu[0].id));
    }
  }, [dispatch, megaMenu, activeMegaMenu]);

  const activeMenu = megaMenu.find((menu) => menu.id === activeMegaMenu);

  return (
    <div dir="rtl" className="min-h-screen bg-white pb-16">
      <header className="sticky top-0 z-40 border-b border-gray-200 bg-white">
        <div className="flex h-24 items-center gap-3 px-3">
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-gray-700 transition hover:bg-gray-100"
          >
            <LuArrowRight size={22} />
          </button>

          <div className="flex h-10 flex-1 items-center gap-2 rounded-full bg-gray-100 px-3">
            <Search />
          </div>
        </div>
      </header>

      <main className="min-h-[calc(100vh-7rem)]">
        <div className="flex min-h-[calc(100vh-7rem)]">
          <MobileCategoriesSidebar
            megaMenu={megaMenu}
            activeMegaMenu={activeMegaMenu}
            onSelect={(id) => dispatch(setActiveMegaMenu(id))}
          />

          <MobileCategoriesContent activeMenu={activeMenu} />
        </div>
      </main>

      <FooterBottomNav />
    </div>
  );
};

export default FooterMobileMenuCategories;
