import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { FaChevronLeft, FaChevronRight, FaEdit, FaTrash } from "react-icons/fa";

import type { AppDispatch, RootState } from "../../../../Redux/store";
import { getCategoriesAction } from "../../../../Redux/Home/Categories/action";
import type { ICategory } from "../../../../Types/Home/ICategory";
import {
  deleteCategory,
  updateCategory,
} from "../../../../Api/Admin/categoriesApi";

const Categories = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const { categories, loading, error } = useSelector(
    (state: RootState) => state.categories,
  );

  useEffect(() => {
    dispatch(getCategoriesAction());
  }, [dispatch]);

  useEffect(() => {
    const totalPages = Math.ceil(categories.length / itemsPerPage);

    if (totalPages > 0 && currentPage > totalPages) {
      setCurrentPage(totalPages);
    }

    if (totalPages === 0 && currentPage !== 1) {
      setCurrentPage(1);
    }
  }, [categories.length, currentPage]);

  const handleAdd = () => {
    navigate("/dashboard/categories/create");
  };

  const handleEdit = (category: ICategory) => {
    navigate(`/dashboard/categories/edit/${category.id}`);
  };

  const handleToggleActive = async (category: ICategory) => {
    try {
      await updateCategory(category.id, {
        isActive: !category.isActive,
      });

      dispatch(getCategoriesAction());
    } catch (error) {
      console.error(error);
      alert("تغییر وضعیت دسته‌بندی محصولات انجام نشد");
    }
  };

  const handleDelete = async (id: ICategory["id"]) => {
    const confirmed = window.confirm("آیا از حذف این دسته‌بندی  محصولات مطمئن هستید؟");

    if (!confirmed) {
      return;
    }

    try {
      await deleteCategory(id);

      if (
        currentPage > 1 &&
        categories.length - 1 <= (currentPage - 1) * itemsPerPage
      ) {
        setCurrentPage((page) => page - 1);
      }

      dispatch(getCategoriesAction());
    } catch (error) {
      console.error(error);
      alert("حذف دسته‌بندی محصولات انجام نشد");
    }
  };

  const totalPages = Math.ceil(categories.length / itemsPerPage);

  const startIndex = (currentPage - 1) * itemsPerPage;

  const currentCategories = categories.slice(
    startIndex,
    startIndex + itemsPerPage,
  );

  return (
    <div className="w-full min-w-0">
      <div className="mb-5 flex flex-col gap-4 sm:mb-6 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-xl font-bold text-red-900 sm:text-2xl">
            دسته‌بندی‌ محصولات
          </h1>

          <p className="mt-2 text-xs text-gray-500 sm:text-sm">
            مدیریت دسته‌بندی‌ محصولاتی فروشگاه
          </p>
        </div>

        <button
          type="button"
          onClick={handleAdd}
          className="w-full cursor-pointer rounded-lg bg-green-700 px-5 py-3 text-sm font-medium text-white transition hover:bg-green-800 sm:w-auto"
        >
          افزودن دسته‌بندی
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

        {!loading && !error && (
          <>
            <div className="hidden overflow-x-auto md:block">
              <table className="w-full min-w-[900px] text-right">
                <thead className="border-b border-gray-200 bg-gray-50">
                  <tr>
                    <th className="px-6 py-4">شناسه</th>
                    <th className="px-6 py-4">تصویر</th>
                    <th className="px-6 py-4">عنوان</th>
                    <th className="px-6 py-4">وضعیت</th>
                    <th className="px-6 py-4">عملیات</th>
                  </tr>
                </thead>

                <tbody>
                  {currentCategories.map((category) => (
                    <tr
                      key={category.id}
                      className="border-b border-gray-100 last:border-0"
                    >
                      <td className="px-6 py-4 font-medium text-gray-700">
                        {category.id}
                      </td>

                      <td className="px-6 py-4">
                        <img
                          src={category.image}
                          alt={category.title}
                          className="h-12 w-12 object-contain"
                        />
                      </td>

                      <td className="max-w-xs px-6 py-4">
                        <span className="block truncate font-medium text-gray-700">
                          {category.title}
                        </span>
                      </td>

                      <td className="px-6 py-4">
                        <button
                          type="button"
                          onClick={() => handleToggleActive(category)}
                          className={`relative h-6 w-11 cursor-pointer rounded-full transition-colors ${
                            category.isActive ? "bg-green-600" : "bg-gray-300"
                          }`}
                          aria-label={
                            category.isActive ? "غیرفعال کردن" : "فعال کردن"
                          }
                        >
                          <span
                            className={`absolute top-1 h-4 w-4 rounded-full bg-white transition-transform ${
                              category.isActive ? "right-1" : "right-6"
                            }`}
                          />
                        </button>
                      </td>

                      <td className="px-6 py-4">
                        <div className="flex gap-2">
                          <button
                            type="button"
                            onClick={() => handleEdit(category)}
                            className="flex cursor-pointer items-center gap-1.5 rounded-lg bg-yellow-500 px-3 py-2 text-sm text-red-900 transition hover:bg-yellow-600"
                          >
                            <FaEdit />
                            ویرایش
                          </button>

                          <button
                            type="button"
                            onClick={() => handleDelete(category.id)}
                            className="flex cursor-pointer items-center gap-1.5 rounded-lg bg-rose-600 px-3 py-2 text-sm text-white transition hover:bg-rose-700"
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
              {currentCategories.map((category) => (
                <div key={category.id} className="p-4">
                  <div className="flex items-start gap-3">
                    <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-lg border border-gray-100 bg-gray-50">
                      <img
                        src={category.image}
                        alt={category.title}
                        className="h-12 w-12 object-contain"
                      />
                    </div>

                    <div className="min-w-0 flex-1">
                      <div className="mb-1 text-xs text-gray-400">
                        شناسه: {category.id}
                      </div>

                      <h3 className="truncate text-sm font-semibold text-gray-800">
                        {category.title}
                      </h3>
                    </div>

                    <button
                      type="button"
                      onClick={() => handleToggleActive(category)}
                      className={`relative h-6 w-11 shrink-0 cursor-pointer rounded-full transition-colors ${
                        category.isActive ? "bg-green-600" : "bg-gray-300"
                      }`}
                      aria-label={
                        category.isActive ? "غیرفعال کردن" : "فعال کردن"
                      }
                    >
                      <span
                        className={`absolute top-1 h-4 w-4 rounded-full bg-white transition-transform ${
                          category.isActive ? "right-1" : "right-6"
                        }`}
                      />
                    </button>
                  </div>

                  <div className="mt-4 grid grid-cols-2 gap-2">
                    <button
                      type="button"
                      onClick={() => handleEdit(category)}
                      className="flex cursor-pointer items-center justify-center gap-2 rounded-lg bg-yellow-500 px-3 py-2.5 text-xs font-medium text-red-900 transition hover:bg-yellow-600 sm:text-sm"
                    >
                      <FaEdit />
                      ویرایش
                    </button>

                    <button
                      type="button"
                      onClick={() => handleDelete(category.id)}
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
      </div>
    </div>
  );
};

export default Categories;
