import { NavLink } from "react-router-dom";
import {
  MdDashboard,
  MdHome,
  MdViewList,
  MdImage,
  MdSlideshow,
} from "react-icons/md";

const Sidebar = () => {
  const menuItems = [
    {
      title: "داشبورد",
      path: "/dashboard",
      icon: <MdDashboard />,
    },
    {
      title: "دسته‌بندی‌ها",
      path: "/dashboard/categories",
      icon: <MdViewList />,
    },
    {
      title: "بنرها",
      path: "/dashboard/banners",
      icon: <MdImage />,
    },
    {
      title: "اسلایدر",
      path: "/dashboard/slider",
      icon: <MdSlideshow />,
    },
    {
      title: "Home",
      path: "/dashboard/home",
      icon: <MdHome />,
    },
    {
      title: "Footer",
      path: "/dashboard/footer",
    },
  ];

  return (
    <aside className="fixed right-0 top-0 h-screen w-64 border-l border-gray-200 bg-white">
      <div className="flex h-16 items-center justify-center border-b border-gray-200">
        <h1 className="text-xl font-bold text-red-700">پنل مدیریت</h1>
      </div>

      <nav className="p-4">
        <ul className="space-y-2">
          {menuItems.map((item) => (
            <li key={item.path}>
              <NavLink
                to={item.path}
                end={item.path === "/dashboard"}
                className={({ isActive }) =>
                  `flex items-center gap-3 rounded-lg px-4 py-3 text-sm transition ${
                    isActive
                      ? "bg-red-700 text-white"
                      : "text-gray-700 hover:bg-red-50 hover:text-red-700"
                  }`
                }
              >
                <span className="text-xl">{item.icon}</span>
                <span>{item.title}</span>
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;
