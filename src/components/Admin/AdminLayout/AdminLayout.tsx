import { Outlet } from "react-router-dom";

import Sidebar from "../AdminLayout/Sidebar/Sidebar";
import { FaKey, FaPowerOff, FaUser } from "react-icons/fa";

const AdminLayout = () => {
  return (
    <div className="min-h-screen bg-gray-100">
      <Sidebar />

      <main className="mr-64 min-h-screen">
        <header className="flex h-16 items-center justify-between border-b border-gray-200 bg-white px-6">
          <h3 className="flex text-lg font-semibold text-gray-700">
            <FaUser className="mx-2 fill-red-800 items-center" />
            خوش آمدید، <span className="text-red-800">ادمین</span>
          </h3>
          <button
            type="button"
            onClick={() => {
              localStorage.removeItem("isAdmin");
              window.location.href = "/login";
            }}
            className="flex rounded-lg px-4 py-2 text-sm text-red-900 transition hover:bg-red-50"
          >
            <FaPowerOff className="mx-2" />
            خروج
          </button>
        </header>

        <section className="p-6">
          <Outlet />
        </section>
      </main>
    </div>
  );
};

export default AdminLayout;
