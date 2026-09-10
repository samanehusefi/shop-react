import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import type { AppDispatch, RootState } from "../../../Redux/store";

import { getCategoriesAction } from "../../../Redux/Home/Categories/action";
import { getBanners } from "../../../Redux/Home/Banner/action";
import { getSlider } from "../../../Redux/Home/Slider/action";
import { getCircleBadge } from "../../../Redux/Home/CircleBadge/action";
import { getAmazing } from "../../../Redux/Home/Amazing/action";
import { getBrands } from "../../../Redux/Home/Brands/action";
import DashboardSkeleton from "./DashboardSkeleton";

const Dashboard = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const {
    categories,
    loading: categoriesLoading,
    error: categoriesError,
  } = useSelector((state: RootState) => state.categories);

  const { banners, loading: bannersLoading } = useSelector(
    (state: RootState) => state.banner,
  );

  const { slider, loading: sliderLoading } = useSelector(
    (state: RootState) => state.slider,
  );

  const { circleBadge, loading: circleBadgeLoading } = useSelector(
    (state: RootState) => state.circleBadge,
  );

  const { amazing } = useSelector((state: RootState) => state.amazing);

  useEffect(() => {
    dispatch(getCategoriesAction());
    dispatch(getBanners());
    dispatch(getSlider());
    dispatch(getCircleBadge());
    dispatch(getAmazing());
    dispatch(getBrands);
  }, [dispatch]);

  const activeCategories = categories.filter(
    (category) => category.isActive,
  ).length;

  const inactiveCategories = categories.filter(
    (category) => !category.isActive,
  ).length;

  const activeCircleBadges = circleBadge.filter(
    (item) => item.is_digikala_service,
  ).length;

  const inactiveCircleBadges = circleBadge.filter(
    (item) => !item.is_digikala_service,
  ).length;

  if (
    categoriesLoading ||
    bannersLoading ||
    sliderLoading ||
    circleBadgeLoading
  ) {
    return <DashboardSkeleton />;
  }

  const cardClass =
    "w-full rounded-xl bg-white p-4 text-right shadow-sm transition hover:-translate-y-1 hover:shadow-md sm:p-5 lg:p-6";

  return (
    <div className="w-full min-w-0">
      <div className="mb-5 sm:mb-6">
        <h1 className="text-xl font-bold text-red-700 sm:text-2xl">داشبورد</h1>

        <p className="mt-1.5 text-xs text-gray-500 sm:mt-2 sm:text-sm">
          خلاصه وضعیت فروشگاه
        </p>
      </div>

      {categoriesError && (
        <div className="mb-5 rounded-xl bg-red-50 p-3 text-xs text-red-600 sm:mb-6 sm:p-4 sm:text-sm">
          خطا در دریافت اطلاعات
        </div>
      )}

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4 sm:gap-5 lg:gap-6">
        <button
          type="button"
          onClick={() => navigate("/dashboard/categories")}
          className={cardClass}
        >
          <div className="mb-3 sm:mb-4">
            <h2 className="text-sm font-semibold text-gray-800 sm:text-base">
              دسته‌بندی‌ها
            </h2>
          </div>

          <div className="text-2xl font-bold text-red-700 sm:text-3xl">
            {categories.length}
          </div>

          <p className="mt-1.5 text-xs text-gray-500 sm:mt-2 sm:text-sm">
            تعداد کل دسته‌بندی‌ها
          </p>
        </button>

        <button
          type="button"
          onClick={() => navigate("/dashboard/banners")}
          className={cardClass}
        >
          <div className="mb-3 sm:mb-4">
            <h2 className="text-sm font-semibold text-gray-800 sm:text-base">
              تبلیغات
            </h2>
          </div>

          <div className="text-2xl font-bold text-red-700 sm:text-3xl">
            {banners.length}
          </div>

          <p className="mt-1.5 text-xs text-gray-500 sm:mt-2 sm:text-sm">
            تعداد کل تبلیغات
          </p>
        </button>

        <button
          type="button"
          onClick={() => navigate("/dashboard/slider")}
          className={cardClass}
        >
          <div className="mb-3 sm:mb-4">
            <h2 className="text-sm font-semibold text-gray-800 sm:text-base">
              اسلایدرها
            </h2>
          </div>

          <div className="text-2xl font-bold text-red-700 sm:text-3xl">
            {slider.length}
          </div>

          <p className="mt-1.5 text-xs text-gray-500 sm:mt-2 sm:text-sm">
            تعداد کل اسلایدرها
          </p>
        </button>

        <button
          type="button"
          onClick={() => navigate("/dashboard/circle-badge")}
          className={cardClass}
        >
          <div className="mb-3 sm:mb-4">
            <h2 className="text-sm font-semibold text-gray-800 sm:text-base">
              خدمات فروشگاه
            </h2>
          </div>

          <div className="text-2xl font-bold text-red-700 sm:text-3xl">
            {circleBadge.length}
          </div>

          <p className="mt-1.5 text-xs text-gray-500 sm:mt-2 sm:text-sm">
            تعداد کل خدمات فروشگاه
          </p>
        </button>

        <button
          type="button"
          onClick={() => navigate("/dashboard/amazing")}
          className={cardClass}
        >
          <div className="mb-3 sm:mb-4">
            <h2 className="text-sm font-semibold text-gray-800 sm:text-base">
              شگفت‌انگیزها
            </h2>
          </div>

          <div className="text-2xl font-bold text-red-700 sm:text-3xl">
            {amazing.length}
          </div>

          <p className="mt-1.5 text-xs text-gray-500 sm:mt-2 sm:text-sm">
            تعداد کل شگفت‌انگیزها
          </p>
        </button>
      </div>

      <div className="mt-5 grid grid-cols-1 gap-4 sm:mt-6 sm:gap-5 xl:grid-cols-2 lg:gap-6">
        <div className="rounded-xl bg-white p-4 shadow-sm sm:p-5">
          <h2 className="mb-3 text-sm font-semibold text-gray-800 sm:mb-4 sm:text-base">
            وضعیت دسته‌بندی‌ها
          </h2>

          <div className="grid grid-cols-1 gap-3 min-[400px]:grid-cols-2">
            <div className="rounded-lg bg-green-50 p-3 sm:p-4">
              <p className="text-xs text-gray-500">دسته‌بندی‌های فعال</p>

              <p className="mt-1 text-lg font-bold text-green-700 sm:text-xl">
                {activeCategories}
              </p>
            </div>

            <div className="rounded-lg bg-red-50 p-3 sm:p-4">
              <p className="text-xs text-gray-500">دسته‌بندی‌های غیرفعال</p>

              <p className="mt-1 text-lg font-bold text-red-700 sm:text-xl">
                {inactiveCategories}
              </p>
            </div>
          </div>
        </div>

        <div className="rounded-xl bg-white p-4 shadow-sm sm:p-5">
          <h2 className="mb-3 text-sm font-semibold text-gray-800 sm:mb-4 sm:text-base">
            وضعیت خدمات فروشگاه
          </h2>

          <div className="grid grid-cols-1 gap-3 min-[400px]:grid-cols-2">
            <button
              type="button"
              onClick={() => navigate("/dashboard/circle-badge")}
              className="rounded-lg bg-green-50 p-3 text-right transition hover:-translate-y-0.5 hover:shadow-sm sm:p-4"
            >
              <p className="text-xs text-gray-500">خدمات فعال</p>

              <p className="mt-1 text-lg font-bold text-green-700 sm:text-xl">
                {activeCircleBadges}
              </p>
            </button>

            <button
              type="button"
              onClick={() => navigate("/dashboard/circle-badge")}
              className="rounded-lg bg-red-50 p-3 text-right transition hover:-translate-y-0.5 hover:shadow-sm sm:p-4"
            >
              <p className="text-xs text-gray-500">خدمات غیرفعال</p>

              <p className="mt-1 text-lg font-bold text-red-700 sm:text-xl">
                {inactiveCircleBadges}
              </p>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
