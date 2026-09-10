import { useEffect, useState, type RefObject } from "react";
import { useDispatch, useSelector } from "react-redux";

import type { AppDispatch, RootState } from "../../../../../Redux/store";
import { setActiveMegaMenu } from "../../../../../Redux/Header/MegaMenu/action";

import type { IMegaMenuColumn } from "../../../../../Types/Header/IMegaMenu";
import MegaMenuColumn from "./MegaMenuColumn";
import { LuChevronLeft, menuIcons } from "./MenuIcons";

interface MegaMenuProps {
  anchorRef: RefObject<HTMLDivElement | null>;
}

const MegaMenu = ({ anchorRef }: MegaMenuProps) => {
  const dispatch = useDispatch<AppDispatch>();

  const megaMenu = useSelector((state: RootState) => state.menu.megaMenu);

  const activeMegaMenu = useSelector(
    (state: RootState) => state.menu.activeMegaMenu,
  );

  const [position, setPosition] = useState({
    top: 0,
    right: 0,
  });

  const activeMenu = megaMenu.find((menu) => menu.id === activeMegaMenu);

  useEffect(() => {
    const updatePosition = () => {
      if (!anchorRef.current) {
        return;
      }

      const rect = anchorRef.current.getBoundingClientRect();

      setPosition({
        top: rect.bottom,
        right: window.innerWidth - rect.right,
      });
    };

    updatePosition();

    window.addEventListener("resize", updatePosition);

    return () => {
      window.removeEventListener("resize", updatePosition);
    };
  }, [anchorRef]);

  if (!megaMenu.length) {
    return null;
  }

  return (
    <div
      dir="rtl"
      className="fixed z-[100] h-[70vh] w-[80vw] max-w-[1152px] overflow-hidden rounded-bl-2xl  bg-white shadow-[0_10px_35px_rgba(0,0,0,0.18)]"
      style={{
        top: position.top,
        right: position.right,
      }}
    >
      <div className="flex h-full w-full overflow-hidden">
        <aside
          dir="ltr"
          className="w-60 shrink-0 border-l border-gray-200 bg-gray-50"
        >
          <div className="h-full overflow-y-auto py-4">
            <div dir="rtl">
              <div className="space-y-1">
                {megaMenu.map((menu) => {
                  const isActive = menu.id === activeMegaMenu;

                  const MenuIcon =
                    menuIcons[menu.icon as keyof typeof menuIcons];

                  return (
                    <button
                      key={menu.id}
                      type="button"
                      onMouseEnter={() => dispatch(setActiveMegaMenu(menu.id))}
                      className={`flex w-full items-center gap-3 px-4 py-3 text-right text-sm transition-colors ${
                        isActive
                          ? "bg-white text-red-500"
                          : "text-gray-700 hover:bg-white"
                      }`}
                    >
                      <span
                        className={`flex h-8 w-8 shrink-0 items-center justify-center ${
                          isActive ? "text-red-500" : "text-gray-500"
                        }`}
                      >
                        {MenuIcon && <MenuIcon size={20} strokeWidth={1.8} />}
                      </span>

                      <span className="flex-1">{menu.title}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </aside>

        <main
          dir="ltr"
          className="min-h-0 min-w-0 flex-1 overflow-y-auto bg-white px-6 py-5"
        >
          {activeMenu && (
            <div dir="rtl">
              <div className="mb-6 flex items-center justify-between">
                <a
                  href={activeMenu.topLink.url}
                  className="flex items-center gap-1 text-sm font-medium text-[#0d4485]"
                >
                  {activeMenu.topLink.title}

                  <LuChevronLeft
                    className="shrink-0 text-[#0d4485]"
                    size={19}
                  />
                </a>
              </div>

              <div className="grid grid-cols-2 gap-x-8 gap-y-8 lg:grid-cols-3 xl:grid-cols-4">
                {activeMenu.columns.map(
                  (column: IMegaMenuColumn, index: number) => (
                    <MegaMenuColumn
                      key={`${column.title}-${index}`}
                      column={column}
                    />
                  ),
                )}
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default MegaMenu;
