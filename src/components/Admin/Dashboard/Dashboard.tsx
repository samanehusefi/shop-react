import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import type { AppDispatch, RootState } from "../../../Redux/store";
import { getCategoriesAction } from "../../../Redux/Home/Categories/action";

const Dashboard = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const { categories, loading, error } = useSelector(
    (state: RootState) => state.categories,
  );

  useEffect(() => {
    dispatch(getCategoriesAction());
  }, [dispatch]);

  const activeCategories = categories.filter(
    (category) => category.isActive,
  ).length;

  const inactiveCategories = categories.filter(
    (category) => !category.isActive,
  ).length;

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-red-700">داشبورد</h1>

        <p className="mt-2 text-sm text-gray-500">خلاصه وضعیت فروشگاه</p>
      </div>

      {error && (
        <div className="mb-6 rounded-xl bg-red-50 p-4 text-sm text-red-600">
          خطا در دریافت اطلاعات
        </div>
      )}

      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        <button
          type="button"
          onClick={() => navigate("/dashboard/categories")}
          className="rounded-xl bg-white p-6 text-right shadow-sm transition hover:-translate-y-1 hover:shadow-md"
        >
          <div className="mb-4 flex items-center justify-between">
            <h2 className="font-semibold text-gray-800">دسته‌بندی‌ها</h2>

            <span className="rounded-lg bg-red-100 px-3 py-1 text-sm text-red-700">
              مدیریت
            </span>
          </div>

          <div className="text-3xl font-bold text-red-700">
            {loading ? "..." : categories.length}
          </div>

          <p className="mt-2 text-sm text-gray-500">تعداد کل دسته‌بندی‌ها</p>
        </button>

        <div className="rounded-xl bg-white p-6 shadow-sm">
          <h2 className="mb-4 font-semibold text-gray-800">بنرها</h2>

          <div className="text-3xl font-bold text-red-700">-</div>

          <p className="mt-2 text-sm text-gray-500">تعداد کل بنرها</p>
        </div>

        <div className="rounded-xl bg-white p-6 shadow-sm">
          <h2 className="mb-4 font-semibold text-gray-800">اسلایدرها</h2>

          <div className="text-3xl font-bold text-red-700">-</div>

          <p className="mt-2 text-sm text-gray-500">تعداد کل اسلایدرها</p>
        </div>
      </div>

      <div className="mt-6 rounded-xl bg-white p-6 shadow-sm">
        <h2 className="mb-6 text-lg font-semibold text-gray-800">
          وضعیت دسته‌بندی‌ها
        </h2>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <div className="rounded-xl bg-green-50 p-5">
            <p className="text-sm text-gray-500">دسته‌بندی‌های فعال</p>

            <p className="mt-2 text-2xl font-bold text-green-700">
              {loading ? "..." : activeCategories}
            </p>
          </div>

          <div className="rounded-xl bg-red-50 p-5">
            <p className="text-sm text-gray-500">دسته‌بندی‌های غیرفعال</p>

            <p className="mt-2 text-2xl font-bold text-red-700">
              {loading ? "..." : inactiveCategories}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
