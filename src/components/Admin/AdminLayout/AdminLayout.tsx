import { useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { FaPowerOff, FaUser } from "react-icons/fa";

import Sidebar from "../AdminLayout/Sidebar/Sidebar";

const AdminLayout = () => {
  const navigate = useNavigate();

  const [isSidebarOpen, setIsSidebarOpen] = useState(
    () => window.innerWidth >= 1024,
  );

  const handleLogout = () => {
    localStorage.removeItem("isAdmin");
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Sidebar
        isOpen={isSidebarOpen}
        setIsOpen={setIsSidebarOpen}
      />

      <main
        className={`min-h-screen pt-16 transition-all duration-300 lg:pt-0 ${
          isSidebarOpen ? "lg:mr-64" : "lg:mr-20"
        }`}
      >
        <header className="flex min-h-16 items-center justify-between gap-3 border-b border-gray-200 bg-white px-3 py-3 sm:px-5 lg:px-6">
          <h3 className="flex min-w-0 items-center text-sm font-semibold text-gray-700 sm:text-base lg:text-lg">
            <FaUser className="mx-1.5 shrink-0 text-red-800 sm:mx-2" />

            <span className="hidden sm:inline">خوش آمدید،</span>

            <span className="mr-1 text-red-800 sm:mr-1.5">
              ادمین
            </span>
          </h3>

          <button
            type="button"
            onClick={handleLogout}
            className="flex shrink-0 cursor-pointer items-center rounded-lg px-2.5 py-2 text-xs text-red-900 transition hover:bg-red-50 sm:px-4 sm:text-sm"
          >
            <FaPowerOff className="mx-1.5 sm:mx-2" />
            <span>خروج</span>
          </button>
        </header>

        <section className="w-full min-w-0 p-3 sm:p-5 lg:p-6">
          <Outlet />
        </section>
      </main>
    </div>
  );
};

export default AdminLayout;