import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../../../../../Redux/store";
import { setActiveMegaMenu } from "../../../../../Redux/Header/MegaMenu/action";
import { menuIcons, LuMenu } from "./MenuIcons";

interface MenuProps {
  isMegaMenuOpen: boolean;
  setIsMegaMenuOpen: (value: boolean) => void;
}

const Menu = ({ setIsMegaMenuOpen }: MenuProps) => {
  const dispatch = useDispatch<AppDispatch>();

  const megaMenu = useSelector((state: RootState) => state.menu.megaMenu);
  const navbar = useSelector((state: RootState) => state.navbar.NavBar);

  return (
    <nav dir="rtl" className="w-full bg-white">
      <div className="mx-auto flex w-full items-center px-4">
        <div
          className="relative"
          onMouseEnter={() => {
            setIsMegaMenuOpen(true);

            if (megaMenu.length > 0) {
              dispatch(setActiveMegaMenu(megaMenu[0].id));
            }
          }}
          onMouseLeave={() => setIsMegaMenuOpen(false)}
        >
          <button
            type="button"
            className="flex items-center gap-2 whitespace-nowrap px-4 py-3 text-sm font-semibold text-gray-800 transition-colors hover:text-red-500"
          >
            <span className="text-lg">
              <LuMenu className="shrink-0 text-[#0d4485]" size={19} />
            </span>
            دسته‌بندی کالاها
          </button>
        </div>

        <span className="mx-2 h-5 w-px bg-gray-200" />

        {navbar.map((item) => {
          const Icon = menuIcons[item.icon as keyof typeof menuIcons];

          return (
            <button
              key={item.id}
              type="button"
              className="flex items-center group relative gap-2 whitespace-nowrap px-4 py-3 text-sm text-gray-600 transition-colors hover:border-b-red-500 "
            >
              {Icon && <Icon size={18} strokeWidth={1.8} />}
              {item.title}
              <span className="absolute bottom-0 right-0 h-0.5 w-0 bg-red-500 transition-all duration-200 group-hover:w-full" />
            </button>
          );
        })}

        <div className="mr-auto flex items-center">
          <button
            type="button"
            className="flex items-center gap-2 whitespace-nowrap px-4 py-3 text-sm font-medium text-orange-500"
          >
            <span>📍</span>
            انتخاب آدرس
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Menu;
