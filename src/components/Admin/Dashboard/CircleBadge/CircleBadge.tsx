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
import { getCircleBadge } from "../../../../Redux/Home/CircleBadge/action";
import type { ICircleBadge } from "../../../../Types/Home/ICircleBadge";

import {
  deleteCircleBadge,
  updateCircleBadge,
} from "../../../../Api/Admin/circleBadgeApi";

const CircleBadge = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const { circleBadge, loading, error } = useSelector(
    (state: RootState) => state.circleBadge,
  );

  const [currentPage, setCurrentPage] = useState(1);
  const [statusLoadingId, setStatusLoadingId] = useState<number | null>(null);

  const itemsPerPage = 10;

  useEffect(() => {
    dispatch(getCircleBadge());
  }, [dispatch]);

  const totalPages = Math.ceil(circleBadge.length / itemsPerPage);

  const startIndex = (currentPage - 1) * itemsPerPage;

  const currentItems = circleBadge.slice(startIndex, startIndex + itemsPerPage);

  useEffect(() => {
    if (totalPages > 0 && currentPage > totalPages) {
      setCurrentPage(totalPages);
    }

    if (totalPages === 0 && currentPage !== 1) {
      setCurrentPage(1);
    }
  }, [currentPage, totalPages]);

  const handleAdd = () => {
    navigate("/dashboard/circle-badge/create");
  };

  const handleEdit = (item: ICircleBadge) => {
    navigate(`/dashboard/circle-badge/edit/${item.id}`);
  };

  const handleDelete = async (id: ICircleBadge["id"]) => {
    const confirmed = window.confirm(
      "آیا از حذف این Circle Badge مطمئن هستید؟",
    );

    if (!confirmed) {
      return;
    }

    try {
      await deleteCircleBadge(id);

      if (
        currentPage > 1 &&
        circleBadge.length - 1 <= (currentPage - 1) * itemsPerPage
      ) {
        setCurrentPage((page) => page - 1);
      }

      dispatch(getCircleBadge());
    } catch (error) {
      console.error(error);
      alert("حذف مورد انجام نشد");
    }
  };

  const handleToggleStatus = async (item: ICircleBadge) => {
    setStatusLoadingId(item.id);

    try {
      await updateCircleBadge(item.id, {
        is_digikala_service: !item.is_digikala_service,
      });

      dispatch(getCircleBadge());
    } catch (error) {
      console.error(error);
      alert("تغییر وضعیت انجام نشد");
    } finally {
      setStatusLoadingId(null);
    }
  };

  return (
    <div className="w-full min-w-0">
      <div className="mb-5 flex flex-col gap-4 sm:mb-6 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-xl font-bold text-red-900 sm:text-2xl">
            خدمات فروشگاه
          </h1>

          <p className="mt-2 text-xs text-gray-500 sm:text-sm">
            مدیریت خدمات فروشگاه
          </p>
        </div>

        <button
          type="button"
          onClick={handleAdd}
          className="flex w-full cursor-pointer items-center justify-center gap-2 rounded-lg bg-green-700 px-5 py-3 text-sm font-medium text-white transition hover:bg-green-800 sm:w-auto"
        >
          <FaPlus />
          افزودن مورد جدید
        </button>
      </div>

      <div className="overflow-hidden rounded-xl bg-white shadow-sm">
        {loading && (
          <div className="p-6 text-center text-sm text-gray-500">
            <span className="loading loading-spinner loading-sm"></span>
          </div>
        )}
        {error && (
          <div className="p-6 text-center text-sm text-red-500">
            خطا در دریافت اطلاعات
          </div>
        )}

        {!loading && !error && circleBadge.length > 0 && (
          <>
            <div className="hidden overflow-x-auto md:block">
              <table className="w-full min-w-[1000px] text-right">
                <thead className="border-b border-gray-200 bg-gray-50">
                  <tr>
                    <th className="px-6 py-4">شناسه</th>
                    <th className="px-6 py-4">تصویر</th>
                    <th className="px-6 py-4">عنوان</th>
                    <th className="px-6 py-4">توضیحات</th>
                    <th className="px-6 py-4">وضعیت</th>
                    <th className="px-6 py-4">لینک</th>
                    <th className="px-6 py-4">عملیات</th>
                  </tr>
                </thead>

                <tbody>
                  {currentItems.map((item: ICircleBadge) => (
                    <tr
                      key={item.id}
                      className="border-b border-gray-100 last:border-0"
                    >
                      <td className="px-6 py-4 font-medium text-gray-700">
                        {item.id}
                      </td>

                      <td className="px-6 py-4">
                        <img
                          src={item.image}
                          alt={item.title}
                          className="h-12 w-12 rounded-full object-cover"
                        />
                      </td>

                      <td className="px-6 py-4 font-medium text-gray-700">
                        {item.title}
                      </td>

                      <td className="max-w-xs px-6 py-4 text-gray-500">
                        <div className="line-clamp-2">
                          {item.description || "-"}
                        </div>
                      </td>

                      <td className="px-6 py-4">
                        <button
                          type="button"
                          onClick={() => handleToggleStatus(item)}
                          disabled={statusLoadingId === item.id}
                          className={`relative flex h-7 w-12 items-center rounded-full p-1 transition ${
                            item.is_digikala_service
                              ? "bg-green-600"
                              : "bg-gray-300"
                          } ${
                            statusLoadingId === item.id
                              ? "cursor-not-allowed opacity-60"
                              : "cursor-pointer"
                          }`}
                        >
                          <span
                            className={`h-5 w-5 rounded-full bg-white shadow-sm transition-transform ${
                              item.is_digikala_service
                                ? "-translate-x-5"
                                : "translate-x-0"
                            }`}
                          />
                        </button>

                        <span
                          className={`mt-1 block text-xs ${
                            item.is_digikala_service
                              ? "text-green-600"
                              : "text-gray-500"
                          }`}
                        >
                          {item.is_digikala_service ? "فعال" : "غیرفعال"}
                        </span>
                      </td>

                      <td className="max-w-xs px-6 py-4">
                        <a
                          href={item.url}
                          target="_blank"
                          rel="noreferrer"
                          className="block truncate text-sm text-blue-600 hover:text-blue-800"
                        >
                          {item.url}
                        </a>
                      </td>

                      <td className="px-6 py-4">
                        <div className="flex gap-2">
                          <button
                            type="button"
                            onClick={() => handleEdit(item)}
                            className="flex cursor-pointer items-center gap-2 rounded-lg bg-yellow-500 px-3 py-2 text-sm text-red-900 transition hover:bg-yellow-600"
                          >
                            <FaEdit />
                            ویرایش
                          </button>

                          <button
                            type="button"
                            onClick={() => handleDelete(item.id)}
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
              {currentItems.map((item: ICircleBadge) => (
                <div key={item.id} className="p-4">
                  <div className="flex items-start gap-3">
                    <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full border border-gray-100 bg-gray-50">
                      <img
                        src={item.image}
                        alt={item.title}
                        className="h-14 w-14 rounded-full object-cover"
                      />
                    </div>

                    <div className="min-w-0 flex-1">
                      <div className="mb-1 text-xs text-gray-400">
                        شناسه: {item.id}
                      </div>

                      <h3 className="truncate text-sm font-semibold text-gray-800">
                        {item.title}
                      </h3>
                    </div>

                    <button
                      type="button"
                      onClick={() => handleToggleStatus(item)}
                      disabled={statusLoadingId === item.id}
                      className={`relative flex h-7 w-12 shrink-0 items-center rounded-full p-1 transition ${
                        item.is_digikala_service
                          ? "bg-green-600"
                          : "bg-gray-300"
                      } ${
                        statusLoadingId === item.id
                          ? "cursor-not-allowed opacity-60"
                          : "cursor-pointer"
                      }`}
                    >
                      <span
                        className={`h-5 w-5 rounded-full bg-white shadow-sm transition-transform ${
                          item.is_digikala_service
                            ? "-translate-x-5"
                            : "translate-x-0"
                        }`}
                      />
                    </button>
                  </div>

                  <div className="mt-4 space-y-3">
                    <div>
                      <span className="mb-1 block text-xs text-gray-400">
                        وضعیت
                      </span>

                      <span
                        className={`text-xs font-medium ${
                          item.is_digikala_service
                            ? "text-green-600"
                            : "text-gray-500"
                        }`}
                      >
                        {item.is_digikala_service ? "فعال" : "غیرفعال"}
                      </span>
                    </div>

                    <div>
                      <span className="mb-1 block text-xs text-gray-400">
                        توضیحات
                      </span>

                      <p className="text-sm leading-6 text-gray-600">
                        {item.description || "-"}
                      </p>
                    </div>

                    <div>
                      <span className="mb-1 block text-xs text-gray-400">
                        لینک
                      </span>

                      <a
                        href={item.url}
                        target="_blank"
                        rel="noreferrer"
                        className="block truncate text-sm text-blue-600 hover:text-blue-800"
                      >
                        {item.url || "-"}
                      </a>
                    </div>
                  </div>

                  <div className="mt-4 grid grid-cols-2 gap-2">
                    <button
                      type="button"
                      onClick={() => handleEdit(item)}
                      className="flex cursor-pointer items-center justify-center gap-2 rounded-lg bg-yellow-500 px-3 py-2.5 text-xs font-medium text-red-900 transition hover:bg-yellow-600 sm:text-sm"
                    >
                      <FaEdit />
                      ویرایش
                    </button>

                    <button
                      type="button"
                      onClick={() => handleDelete(item.id)}
                      className="flex cursor-pointer items-center justify-center gap-2 rounded-lg bg-rose-600 px-3 py-2.5 text-xs font-medium text-white transition hover:bg-rose-700 sm:text-sm"
                    >
                      <FaTrash />
                      حذف
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {totalPages > 0 && (
              <div className="flex flex-col gap-3 border-t border-gray-200 px-4 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-6">
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

                  {Array.from(
                    { length: totalPages },
                    (_, index) => index + 1,
                  ).map((page) => (
                    <button
                      key={page}
                      type="button"
                      onClick={() => setCurrentPage(page)}
                      className={`h-9 min-w-9 cursor-pointer rounded-lg px-2.5 text-xs transition sm:px-3 sm:text-sm ${
                        currentPage === page
                          ? "bg-green-600 text-white"
                          : "border border-gray-300 text-gray-700 hover:bg-green-50"
                      }`}
                    >
                      {page}
                    </button>
                  ))}

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

        {!loading && !error && circleBadge.length === 0 && (
          <div className="p-8 text-center text-sm text-gray-500">
            موردی وجود ندارد
          </div>
        )}
      </div>
    </div>
  );
};

export default CircleBadge;
