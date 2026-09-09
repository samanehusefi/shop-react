import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  FaChevronLeft,
  FaChevronRight,
  FaEdit,
  FaPlus,
  FaTrash,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";

import type { AppDispatch, RootState } from "../../../../Redux/store";
import { getBanners } from "../../../../Redux/Home/Banner/action";
import { deleteBanner } from "../../../../Api/Admin/bannerApi";
import type { IBanner } from "../../../../Types/Home/IBanner";

const Banners = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const { banners, loading, error } = useSelector(
    (state: RootState) => state.banner,
  );

  const [currentPage, setCurrentPage] = useState(1);

  const itemsPerPage = 10;

  const totalPages = Math.ceil(banners.length / itemsPerPage);

  const startIndex = (currentPage - 1) * itemsPerPage;

  const currentBanners = banners.slice(startIndex, startIndex + itemsPerPage);

  useEffect(() => {
    dispatch(getBanners());
  }, [dispatch]);

  useEffect(() => {
    if (totalPages > 0 && currentPage > totalPages) {
      setCurrentPage(totalPages);
    }

    if (totalPages === 0 && currentPage !== 1) {
      setCurrentPage(1);
    }
  }, [currentPage, totalPages]);

  const handleAdd = () => {
    navigate("/dashboard/banners/create");
  };

  const handleEdit = (banner: IBanner) => {
    navigate(`/dashboard/banners/edit/${banner.id}`);
  };

  const handleDelete = async (id: IBanner["id"]) => {
    const confirmed = window.confirm("آیا از حذف این تبلیغات مطمئن هستید؟");

    if (!confirmed) {
      return;
    }

    try {
      await deleteBanner(id);

      if (
        currentPage > 1 &&
        banners.length - 1 <= (currentPage - 1) * itemsPerPage
      ) {
        setCurrentPage((page) => page - 1);
      }

      dispatch(getBanners());
    } catch (error) {
      console.error(error);
      alert("حذف تبلیغات انجام نشد");
    }
  };

  const getPositionTitle = (position: IBanner["position"]) => {
    const positions: Record<IBanner["position"], string> = {
      hero: "بعد از شگفت انگیزها",
      "top-banner": "بعد از دسته بندی ها",
      "middle-banner": "بعد از محصولات",
      "bottom-banner": "بعد از برند",
    };

    return positions[position];
  };

  return (
    <div className="w-full min-w-0">
      <div className="mb-5 flex flex-col gap-4 sm:mb-6 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-xl font-bold text-red-900 sm:text-2xl">
            تبلیغات
          </h1>

          <p className="mt-1.5 text-xs text-gray-500 sm:mt-2 sm:text-sm">
            مدیریت تبلیغات فروشگاه
          </p>
        </div>

        <button
          type="button"
          onClick={handleAdd}
          className="flex w-full cursor-pointer items-center justify-center gap-2 rounded-lg bg-green-700 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-green-800 sm:w-auto sm:px-5 sm:py-3"
        >
          <FaPlus />
          افزودن تبلیغات
        </button>
      </div>

      <div className="overflow-hidden rounded-xl bg-white shadow-sm">
        {loading && (
          <div className="p-6 text-center text-sm text-gray-500">
            در حال دریافت اطلاعات...
          </div>
        )}

        {error && (
          <div className="p-6 text-center text-sm text-red-500">
            خطا در دریافت اطلاعات
          </div>
        )}

        {!loading && !error && banners.length > 0 && (
          <>
            <div className="hidden overflow-x-auto md:block">
              <table className="w-full min-w-[1000px] text-right">
                <thead className="border-b border-gray-200 bg-gray-50">
                  <tr>
                    <th className="px-5 py-4 text-sm">ID</th>

                    <th className="px-5 py-4 text-sm">تصویر</th>

                    <th className="px-5 py-4 text-sm">عنوان</th>

                    <th className="px-5 py-4 text-sm">موقعیت</th>

                    <th className="px-5 py-4 text-sm">لینک</th>

                    <th className="px-5 py-4 text-sm">عملیات</th>
                  </tr>
                </thead>

                <tbody>
                  {currentBanners.map((banner: IBanner) => (
                    <tr
                      key={banner.id}
                      className="border-b border-gray-100 last:border-0"
                    >
                      <td className="px-5 py-4 font-medium text-gray-700">
                        {banner.id}
                      </td>

                      <td className="px-5 py-4">
                        <img
                          src={banner.image}
                          alt={banner.title}
                          className="h-14 w-24 rounded-lg object-cover"
                        />
                      </td>

                      <td className="max-w-xs px-5 py-4">
                        <span className="block truncate font-medium text-gray-700">
                          {banner.title}
                        </span>
                      </td>

                      <td className="px-5 py-4">
                        <span className="inline-block rounded-lg bg-gray-100 px-3 py-2 text-sm text-gray-700">
                          {getPositionTitle(banner.position)}
                        </span>
                      </td>

                      <td className="max-w-xs px-5 py-4">
                        <a
                          href={banner.url}
                          target="_blank"
                          rel="noreferrer"
                          className="block truncate text-sm text-blue-600 transition hover:text-blue-800"
                        >
                          {banner.url}
                        </a>
                      </td>

                      <td className="px-5 py-4">
                        <div className="flex gap-2">
                          <button
                            type="button"
                            onClick={() => handleEdit(banner)}
                            className="flex cursor-pointer items-center gap-2 rounded-lg bg-yellow-500 px-3 py-2 text-sm text-red-900 transition hover:bg-yellow-600"
                          >
                            <FaEdit />
                            ویرایش
                          </button>

                          <button
                            type="button"
                            onClick={() => handleDelete(banner.id)}
                            className="flex cursor-pointer items-center gap-2 rounded-lg bg-rose-600 px-3 py-2 text-sm text-white transition hover:bg-rose-700"
                          >
                            <FaTrash />
                            حذف
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="divide-y divide-gray-100 md:hidden">
              {currentBanners.map((banner: IBanner) => (
                <div key={banner.id} className="p-4">
                  <div className="flex gap-3">
                    <img
                      src={banner.image}
                      alt={banner.title}
                      className="h-20 w-28 shrink-0 rounded-lg object-cover"
                    />

                    <div className="min-w-0 flex-1">
                      <div className="mb-2 flex items-center justify-between gap-2">
                        <span className="shrink-0 rounded-md bg-gray-100 px-2 py-1 text-xs text-gray-500">
                          ID: {banner.id}
                        </span>

                        <span className="truncate rounded-md bg-gray-100 px-2 py-1 text-xs text-gray-700">
                          {getPositionTitle(banner.position)}
                        </span>
                      </div>

                      <h2 className="line-clamp-2 text-sm font-semibold leading-6 text-gray-800">
                        {banner.title}
                      </h2>
                    </div>
                  </div>

                  <div className="mt-3 rounded-lg bg-gray-50 p-3">
                    <p className="mb-1 text-xs text-gray-500">لینک تبلیغات</p>

                    <a
                      href={banner.url}
                      target="_blank"
                      rel="noreferrer"
                      className="block truncate text-xs text-blue-600 hover:text-blue-800"
                    >
                      {banner.url}
                    </a>
                  </div>

                  <div className="mt-3 grid grid-cols-2 gap-2">
                    <button
                      type="button"
                      onClick={() => handleEdit(banner)}
                      className="flex cursor-pointer items-center justify-center gap-2 rounded-lg bg-yellow-500 px-3 py-2.5 text-xs font-medium text-red-900 transition hover:bg-yellow-600"
                    >
                      <FaEdit />
                      ویرایش
                    </button>

                    <button
                      type="button"
                      onClick={() => handleDelete(banner.id)}
                      className="flex cursor-pointer items-center justify-center gap-2 rounded-lg bg-rose-600 px-3 py-2.5 text-xs font-medium text-white transition hover:bg-rose-700"
                    >
                      <FaTrash />
                      حذف
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {totalPages > 0 && (
              <div className="flex flex-col gap-4 border-t border-gray-200 px-4 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-6">
                <span className="text-center text-xs text-gray-500 sm:text-right sm:text-sm">
                  صفحه {currentPage} از {totalPages}
                </span>

                <div className="flex items-center justify-center gap-1.5 sm:gap-2">
                  <button
                    type="button"
                    disabled={currentPage === 1}
                    onClick={() => setCurrentPage((page) => page - 1)}
                    className="flex h-9 w-9 cursor-pointer items-center justify-center rounded-lg border border-gray-300 text-sm text-gray-700 transition hover:border-green-600 hover:bg-green-50 disabled:cursor-not-allowed disabled:opacity-40"
                    title="صفحه قبل"
                  >
                    <FaChevronRight />
                  </button>

                  <div className="flex items-center gap-1.5 sm:gap-2">
                    {Array.from(
                      { length: totalPages },
                      (_, index) => index + 1,
                    ).map((page) => (
                      <button
                        key={page}
                        type="button"
                        onClick={() => setCurrentPage(page)}
                        className={`flex h-9 min-w-9 cursor-pointer items-center justify-center rounded-lg px-2 text-xs transition sm:px-3 sm:text-sm ${
                          currentPage === page
                            ? "bg-green-600 text-white"
                            : "border border-gray-300 text-gray-700 hover:bg-green-50"
                        }`}
                      >
                        {page}
                      </button>
                    ))}
                  </div>

                  <button
                    type="button"
                    disabled={currentPage === totalPages}
                    onClick={() => setCurrentPage((page) => page + 1)}
                    className="flex h-9 w-9 cursor-pointer items-center justify-center rounded-lg border border-gray-300 text-sm text-gray-700 transition hover:border-green-600 hover:bg-green-50 disabled:cursor-not-allowed disabled:opacity-40"
                    title="صفحه بعد"
                  >
                    <FaChevronLeft />
                  </button>
                </div>
              </div>
            )}
          </>
        )}

        {!loading && !error && banners.length === 0 && (
          <div className="p-8 text-center text-sm text-gray-500">
            تبلیغاتی وجود ندارد
          </div>
        )}
      </div>
    </div>
  );
};

export default Banners;
