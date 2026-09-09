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
import { getAmazing } from "../../../../Redux/Home/Amazing/action";
import { deleteAmazing } from "../../../../Api/Admin/amazingApi";
import type { IAmazing } from "../../../../Types/Home/IAmazing";

const Amazing = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const { amazing, loading, error } = useSelector(
    (state: RootState) => state.amazing,
  );

  const [currentPage, setCurrentPage] = useState(1);

  const itemsPerPage = 10;

  const totalPages = Math.ceil(amazing.length / itemsPerPage);

  const startIndex = (currentPage - 1) * itemsPerPage;

  const currentItems = amazing.slice(startIndex, startIndex + itemsPerPage);

  useEffect(() => {
    dispatch(getAmazing());
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
    navigate("/dashboard/amazing/create");
  };

  const handleEdit = (item: IAmazing) => {
    navigate(`/dashboard/amazing/edit/${item.id}`);
  };

  const handleDelete = async (id: IAmazing["id"]) => {
    const confirmed = window.confirm(
      "آیا از حذف این مورد شگفت‌انگیز مطمئن هستید؟",
    );

    if (!confirmed) {
      return;
    }

    try {
      await deleteAmazing(id);
      dispatch(getAmazing());
    } catch (error) {
      console.error(error);
      alert("حذف شگفت‌انگیز انجام نشد");
    }
  };

  return (
    <div className="w-full min-w-0">
      <div className="mb-5 flex flex-col gap-4 sm:mb-6 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-xl font-bold text-red-900 sm:text-2xl">
            شگفت‌انگیزها
          </h1>

          <p className="mt-1.5 text-xs text-gray-500 sm:mt-2 sm:text-sm">
            مدیریت آیتم‌های شگفت‌انگیز فروشگاه
          </p>
        </div>

        <button
          type="button"
          onClick={handleAdd}
          className="flex w-full cursor-pointer items-center justify-center gap-2 rounded-lg bg-green-700 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-green-800 sm:w-auto sm:px-5 sm:py-3"
        >
          <FaPlus />
          افزودن شگفت‌انگیز
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

        {!loading && !error && amazing.length > 0 && (
          <>
            <div className="hidden overflow-x-auto md:block">
              <table className="w-full min-w-[900px] text-right">
                <thead className="border-b border-gray-200 bg-gray-50">
                  <tr>
                    <th className="px-5 py-4 text-sm">ID</th>

                    <th className="px-5 py-4 text-sm">تصویر</th>

                    <th className="px-5 py-4 text-sm">عنوان</th>

                    <th className="px-5 py-4 text-sm">برند</th>

                    <th className="px-5 py-4 text-sm">عملیات</th>
                  </tr>
                </thead>

                <tbody>
                  {currentItems.map((item: IAmazing) => (
                    <tr
                      key={item.id}
                      className="border-b border-gray-100 last:border-0"
                    >
                      <td className="px-5 py-4 font-medium text-gray-700">
                        {item.id}
                      </td>

                      <td className="px-5 py-4">
                        <img
                          src={item.image}
                          alt={item.title}
                          className="h-14 w-24 rounded-lg object-cover"
                        />
                      </td>

                      <td className="max-w-xs px-5 py-4">
                        <span className="block truncate font-medium text-gray-700">
                          {item.title}
                        </span>
                      </td>

                      <td className="px-5 py-4">
                        <span className="rounded-lg bg-gray-100 px-3 py-2 text-sm text-gray-700">
                          {item.brand.title}
                        </span>
                      </td>

                      <td className="px-5 py-4">
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
              {currentItems.map((item: IAmazing) => (
                <div key={item.id} className="p-4">
                  <div className="flex gap-3">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="h-20 w-28 shrink-0 rounded-lg object-cover"
                    />

                    <div className="min-w-0 flex-1">
                      <div className="mb-2 flex items-center justify-between gap-2">
                        <span className="rounded-md bg-gray-100 px-2 py-1 text-xs text-gray-500">
                          ID: {item.id}
                        </span>

                        <span className="truncate rounded-md bg-gray-100 px-2 py-1 text-xs text-gray-700">
                          {item.brand.title}
                        </span>
                      </div>

                      <h2 className="line-clamp-2 text-sm font-semibold leading-6 text-gray-800">
                        {item.title}
                      </h2>
                    </div>
                  </div>

                  <div className="mt-4 grid grid-cols-2 gap-2">
                    <button
                      type="button"
                      onClick={() => handleEdit(item)}
                      className="flex cursor-pointer items-center justify-center gap-2 rounded-lg bg-yellow-500 px-3 py-2.5 text-xs font-medium text-red-900 transition hover:bg-yellow-600"
                    >
                      <FaEdit />
                      ویرایش
                    </button>

                    <button
                      type="button"
                      onClick={() => handleDelete(item.id)}
                      className="flex cursor-pointer items-center justify-center gap-2 rounded-lg bg-rose-600 px-3 py-2.5 text-xs font-medium text-white transition hover:bg-rose-700"
                    >
                      <FaTrash />
                      حذف
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {totalPages > 1 && (
              <div className="flex flex-col gap-4 border-t border-gray-200 px-4 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-6">
                <div className="text-center text-xs text-gray-500 sm:text-right sm:text-sm">
                  نمایش {startIndex + 1} تا{" "}
                  {Math.min(startIndex + itemsPerPage, amazing.length)} از{" "}
                  {amazing.length} مورد
                </div>

                <div className="flex items-center justify-center gap-1.5 sm:gap-2">
                  <button
                    type="button"
                    disabled={currentPage === 1}
                    onClick={() => setCurrentPage((page) => page - 1)}
                    className="flex h-9 w-9 cursor-pointer items-center justify-center rounded-lg border border-gray-200 text-sm text-gray-600 transition hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-40"
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
                            : "border border-gray-200 text-gray-600 hover:bg-gray-50"
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
                    className="flex h-9 w-9 cursor-pointer items-center justify-center rounded-lg border border-gray-200 text-sm text-gray-600 transition hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-40"
                  >
                    <FaChevronLeft />
                  </button>
                </div>
              </div>
            )}
          </>
        )}

        {!loading && !error && amazing.length === 0 && (
          <div className="p-8 text-center text-sm text-gray-500">
            آیتم شگفت‌انگیزی وجود ندارد
          </div>
        )}
      </div>
    </div>
  );
};

export default Amazing;
