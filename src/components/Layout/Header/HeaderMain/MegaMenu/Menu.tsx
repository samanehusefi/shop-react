import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../../../../../Redux/store";
import { setActiveMegaMenu } from "../../../../../Redux/Header/MegaMenu/action";
import { menuIcons, LuMenu } from "./MenuIcons";
import Address from "../Address/Address";

interface MenuProps {
  setIsMegaMenuOpen: (value: boolean) => void;
}

const Menu = ({ setIsMegaMenuOpen }: MenuProps) => {
  const dispatch = useDispatch<AppDispatch>();

  const megaMenu = useSelector((state: RootState) => state.menu.megaMenu);

  const navbar = useSelector((state: RootState) => state.navbar.NavBar);

  return (
    <nav dir="rtl" className="w-full overflow-hidden bg-white">
      <div className="mx-auto max-w-[1440px] flex w-full items-center px-4 py-1">
        <div
          className="relative shrink-0"
          onMouseEnter={() => {
            setIsMegaMenuOpen(true);

            if (megaMenu.length > 0) {
              dispatch(setActiveMegaMenu(megaMenu[0].id));
            }
          }}
        >
          <button
            type="button"
            className="flex items-center gap-2 whitespace-nowrap px-4 py-3 text-sm font-semibold text-gray-800 transition-colors hover:text-red-500"
          >
            <LuMenu className="shrink-0 text-[#0d4485]" size={19} />
            دسته‌بندی کالاها
          </button>
        </div>

        <span className="mx-2 h-5 w-px shrink-0 bg-gray-200" />

        <div className="flex min-w-0 flex-1 items-center overflow-x-auto scrollbar-none">
          {navbar.map((item) => {
            const Icon = menuIcons[item.icon as keyof typeof menuIcons];

            return (
              <button
                key={item.id}
                type="button"
                className="group relative flex shrink-0 items-center gap-2 whitespace-nowrap px-4 py-3 text-sm text-gray-600 transition-colors"
              >
                {Icon && (
                  <Icon size={18} strokeWidth={1.8} className="shrink-0" />
                )}

                {item.title}

                <span className="absolute bottom-0 right-0 h-0.5 w-0 bg-red-500 transition-all duration-200 group-hover:w-full" />
              </button>
            );
          })}
        </div>

        <div className="mr-4 shrink-0">
          <Address />
        </div>
      </div>
    </nav>
  );
};

export default Menu;
