import {
  LuBaby,
  LuBookOpen,
  LuCar,
  LuCoins,
  LuCookingPot,
  LuDumbbell,
  LuGem,
  LuGift,
  LuHeartPulse,
  LuLaptop,
  LuMapPin,
  LuMonitor,
  LuPawPrint,
  LuRefrigerator,
  LuShirt,
  LuShoppingBag,
  LuShoppingBasket,
  LuSmartphone,
  LuSparkles,
  LuStethoscope,
  LuWrench,
} from "react-icons/lu";

import type { IMegaMenu } from "../../../../Types/Header/IMegaMenu";

interface MobileCategoriesSidebarProps {
  megaMenu: IMegaMenu[];
  activeMegaMenu: string | null;
  onSelect: (id: string) => void;
}

const menuIcons = {
  amazing: LuSparkles,
  laptop: LuLaptop,
  mobile: LuSmartphone,
  "digital-products": LuMonitor,
  "home-kitchen": LuCookingPot,
  "home-appliances": LuRefrigerator,
  "beauty-health": LuHeartPulse,
  fashion: LuShirt,
  "gold-silver": LuGem,
  "digital-gold": LuCoins,
  automotive: LuCar,
  "medical-health": LuStethoscope,
  "tools-equipment": LuWrench,
  "books-art": LuBookOpen,
  "sports-travel": LuDumbbell,
  "gift-card": LuGift,
  supermarket: LuShoppingBasket,
  "kids-baby-toys": LuBaby,
  "local-products": LuMapPin,
  "pet-shop": LuPawPrint,
  digistyle: LuShoppingBag,
};

const MobileCategoriesSidebar = ({
  megaMenu,
  activeMegaMenu,
  onSelect,
}: MobileCategoriesSidebarProps) => {
  return (
    <aside className="sticky top-14 h-[calc(100vh-3.5rem)] w-[36%] shrink-0 overflow-y-auto border-l border-gray-200 bg-gray-50">
      <div className="py-2">
        {megaMenu.map((menu) => {
          const isActive = menu.id === activeMegaMenu;

          const MenuIcon = menuIcons[menu.icon as keyof typeof menuIcons];

          return (
            <button
              key={menu.id}
              type="button"
              onClick={() => onSelect(menu.id)}
              className={`relative flex min-h-[60px] border-b  border-gray-200 w-full items-center gap-2 px-2 py-3 text-right ${
                isActive ? "bg-white text-red-500" : "text-gray-700"
              }`}
            >
              {isActive && (
                <span className="absolute right-0 top-2 bottom-2 w-1 rounded-l-full bg-red-500" />
              )}

              <span
                className={`flex h-8 w-8 shrink-0 items-center justify-center ${
                  isActive ? "text-red-500" : "text-gray-500"
                }`}
              >
                {MenuIcon && <MenuIcon size={18} strokeWidth={1.8} />}
              </span>

              <span
                className={`min-w-0 flex-1 truncate text-xs leading-5 ${
                  isActive ? "font-bold" : "font-medium"
                }`}
              >
                {menu.title}
              </span>
            </button>
          );
        })}
      </div>
    </aside>
  );
};

export default MobileCategoriesSidebar;
