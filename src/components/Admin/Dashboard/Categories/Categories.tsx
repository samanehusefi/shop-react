import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";

import type { AppDispatch, RootState } from "../../../../Redux/store";
import { getCategoriesAction } from "../../../../Redux/Home/Categories/action";
import CategoryModal from "./CategoryModal";
import type { ICategory } from "../../../../Types/Home/ICategory";
import {
  deleteCategory,
  updateCategory,
} from "../../../../Api/Admin/categoriesApi";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

const Categories = () => {
  const dispatch = useDispatch<AppDispatch>();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState<ICategory | null>(
    null,
  );
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const { categories, loading, error } = useSelector(
    (state: RootState) => state.categories,
  );

  useEffect(() => {
    dispatch(getCategoriesAction());
  }, [dispatch]);

  const handleToggleActive = async (category: ICategory) => {
    try {
      await updateCategory(category.id, {
        isActive: !category.isActive,
      });

      dispatch(getCategoriesAction());
    } catch (error) {
      console.error(error);
      alert("تغییر وضعیت دسته‌بندی انجام نشد");
    }
  };

  const handleDelete = async (id: ICategory["id"]) => {
    const confirmed = window.confirm("آیا از حذف این دسته‌بندی مطمئن هستید؟");

    if (!confirmed) {
      return;
    }

    try {
      await deleteCategory(id);

      dispatch(getCategoriesAction());
    } catch (error) {
      console.error(error);
      alert("حذف دسته‌بندی انجام نشد");
    }
  };
  const totalPages = Math.ceil(categories.length / itemsPerPage);

  const startIndex = (currentPage - 1) * itemsPerPage;

  const currentCategories = categories.slice(
    startIndex,
    startIndex + itemsPerPage,
  );
  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-red-900">دسته‌بندی‌ها</h1>

          <p className="mt-2 text-sm text-gray-500">
            مدیریت دسته‌بندی‌های فروشگاه
          </p>
        </div>

        <button
          type="button"
          onClick={() => {
            setEditingCategory(null);
            setIsModalOpen(true);
          }}
          className="rounded-lg bg-green-700 px-5 py-3 text-sm font-medium text-white hover:bg-green-800"
        >
          افزودن دسته‌بندی
        </button>
      </div>

      <div className="overflow-hidden rounded-xl bg-white shadow-sm">
        {loading && (
          <div className="p-6 text-center text-gray-500">
            در حال دریافت اطلاعات...
          </div>
        )}

        {error && (
          <div className="p-6 text-center text-red-500">
            خطا در دریافت اطلاعات
          </div>
        )}

        {!loading && !error && (
          <table className="w-full text-right">
            <thead className="border-b border-gray-200 bg-gray-50">
              <tr>
                <th className="px-6 py-4"></th>
                <th className="px-6 py-4">تصویر</th>
                <th className="px-6 py-4">عنوان</th>
                <th className="px-6 py-4">وضعیت</th>
                <th className="px-6 py-4">عملیات</th>
              </tr>
            </thead>

            <tbody>
              {currentCategories.map((category) => (
                <tr key={category.id} className="border-b border-gray-100">
                  <td className="px-6 py-4">{category.id}</td>

                  <td className="px-6 py-4">
                    <img
                      src={category.image}
                      alt={category.title}
                      className="h-12 w-12 object-contain"
                    />
                  </td>

                  <td className="px-6 py-4">{category.title}</td>

                  <td className="px-6 py-4">
                    <button
                      type="button"
                      onClick={() => handleToggleActive(category)}
                      className={`relative h-6 w-11 rounded-full transition-colors ${
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
                        onClick={() => {
                          setEditingCategory(category);
                          setIsModalOpen(true);
                        }}
                        className="rounded-lg bg-yellow-500 px-3 py-2 text-sm text-red-900"
                      >
                        ویرایش
                      </button>

                      <button
                        type="button"
                        onClick={() => handleDelete(category.id)}
                        className="rounded-lg bg-rose-600 px-3 py-2 text-sm text-white"
                      >
                        حذف
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
        <div className="flex items-center justify-between border-t border-gray-200 px-6 py-4">
          <span className="text-sm text-gray-500">
            صفحه {currentPage} از {totalPages}
          </span>

          <div className="flex items-center gap-2">
            <button
              type="button"
              disabled={currentPage === 1}
              onClick={() => setCurrentPage((page) => page - 1)}
              className="rounded-lg border border-gray-300 px-4 py-2 text-sm text-gray-700 disabled:cursor-not-allowed disabled:opacity-40"
            >
              <FaChevronRight />
            </button>

            {Array.from({ length: totalPages }, (_, index) => index + 1).map(
              (page) => (
                <button
                  key={page}
                  type="button"
                  onClick={() => setCurrentPage(page)}
                  className={`h-9 w-9 rounded-lg text-sm ${
                    currentPage === page
                      ? "bg-emerald-600 text-white"
                      : "border border-gray-300 text-gray-700 hover:bg-emerald-50"
                  }`}
                >
                  {page}
                </button>
              ),
            )}

            <button
              type="button"
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage((page) => page + 1)}
              className="rounded-lg border border-gray-300 px-4 py-2 text-sm text-gray-700 transition hover:border-emerald-500 hover:bg-emerald-50 disabled:cursor-not-allowed disabled:opacity-40"
            >
              <FaChevronLeft />
            </button>
          </div>
        </div>
      </div>

      <CategoryModal
        isOpen={isModalOpen}
        category={editingCategory}
        onClose={() => {
          setIsModalOpen(false);
          setEditingCategory(null);
        }}
        onSuccess={() => dispatch(getCategoriesAction())}
      />
    </div>
  );
};

export default Categories;
