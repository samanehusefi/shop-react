import { useEffect } from "react";
import { NavLink } from "react-router-dom";
import {
  MdDashboard,
  MdCampaign,
  MdDiscount,
  MdMenu,
  MdClose,
  MdVerified,
  MdViewCarousel,
  MdChevronRight,
  MdChevronLeft,
  MdAdminPanelSettings,
  MdInventory2,
} from "react-icons/md";
import { BiSolidCategory } from "react-icons/bi";
import { GrServices } from "react-icons/gr";

interface SidebarProps {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const Sidebar = ({ isOpen, setIsOpen }: SidebarProps) => {
  const menuItems = [
    {
      title: "داشبورد",
      path: "/dashboard",
      icon: <MdDashboard />,
    },
    {
      title: "برند",
      path: "/dashboard/brands",
      icon: <MdVerified />,
    },
    {
      title: "تبلیغات",
      path: "/dashboard/banners",
      icon: <MdCampaign />,
    },
    {
      title: "اسلایدر",
      path: "/dashboard/slider",
      icon: <MdViewCarousel />,
    },
    {
      title: "دسته‌بندی‌ محصولات",
      path: "/dashboard/categories",
      icon: <BiSolidCategory />,
    },
    {
      title: " محصولات",
      path: "/dashboard/products",
      icon: <MdInventory2 />,
    },
    {
      title: "خدمات فروشگاه",
      path: "/dashboard/circle-badge",
      icon: <GrServices />,
    },
    {
      title: "شگفت‌انگیزها",
      path: "/dashboard/amazing",
      icon: <MdDiscount />,
    },
  ];

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 1024) {
        setIsOpen(false);
      } else {
        setIsOpen(true);
      }
    };

    handleResize();

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [setIsOpen]);

  return (
    <>
      <aside
        className={`fixed right-0 top-0 z-50 h-screen border-l border-gray-200 bg-white shadow-sm transition-all duration-300 ${
          isOpen
            ? "w-64 translate-x-0"
            : "w-20 translate-x-full lg:translate-x-0"
        }`}
      >
        <div
          className={`flex h-16 items-center border-b border-gray-200 ${
            isOpen ? "justify-between px-4" : "justify-center"
          }`}
        >
          {isOpen && (
            <h1 className="flex items-center gap-2 text-lg font-bold text-red-700">
              <MdAdminPanelSettings size={24} />
              پنل مدیریت
            </h1>
          )}

          <button
            type="button"
            onClick={() => setIsOpen((prev) => !prev)}
            className="hidden h-10 w-10 cursor-pointer items-center justify-center rounded-lg text-gray-600 transition hover:bg-gray-100 lg:flex"
            aria-label={isOpen ? "بستن منو" : "باز کردن منو"}
          >
            {isOpen ? (
              <MdChevronRight size={26} />
            ) : (
              <MdChevronLeft size={26} />
            )}
          </button>

          <button
            type="button"
            onClick={() => setIsOpen(false)}
            className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-lg text-gray-600 transition hover:bg-gray-100 lg:hidden"
            aria-label="بستن منو"
          >
            <MdClose size={24} />
          </button>
        </div>

        <nav className="p-3">
          <ul className="space-y-2">
            {menuItems.map((item) => (
              <li key={item.path}>
                <NavLink
                  to={item.path}
                  end={item.path === "/dashboard"}
                  onClick={() => {
                    if (window.innerWidth < 1024) {
                      setIsOpen(false);
                    }
                  }}
                  className={({ isActive }) =>
                    `flex items-center rounded-lg py-3 text-sm transition ${
                      isOpen ? "gap-3 px-4" : "justify-center px-2"
                    } ${
                      isActive
                        ? "bg-red-700 text-white"
                        : "text-gray-700 hover:bg-red-50 hover:text-red-700"
                    }`
                  }
                  title={!isOpen ? item.title : undefined}
                >
                  <span className="shrink-0 text-xl">{item.icon}</span>

                  {isOpen && (
                    <span className="whitespace-nowrap">{item.title}</span>
                  )}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>
      </aside>

      <div className="fixed right-0 top-0 z-40 flex h-16 w-full items-center justify-between border-b border-gray-200 bg-white px-4 lg:hidden">
        <button
          type="button"
          onClick={() => setIsOpen(true)}
          className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-lg text-gray-700 transition hover:bg-gray-100"
          aria-label="باز کردن منو"
        >
          <MdMenu size={26} />
        </button>

        <h1 className="text-lg font-bold text-red-700">پنل مدیریت</h1>
      </div>

      {isOpen && (
        <button
          type="button"
          onClick={() => setIsOpen(false)}
          className="fixed inset-0 z-40 bg-black/30 lg:hidden"
          aria-label="بستن منو"
        />
      )}
    </>
  );
};

export default Sidebar;
