import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { FaArrowRight } from "react-icons/fa";

import type { AppDispatch, RootState } from "../../../../../Redux/store";
import { getCategoriesAction } from "../../../../../Redux/Home/Categories/action";

import {
  createCategory,
  updateCategory,
} from "../../../../../Api/Admin/categoriesApi";

import type { ICategory } from "../../../../../Types/Home/ICategory";

const CategoryForm = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const { id } = useParams();

  const isEditMode = Boolean(id);

  const { categories, loading: categoriesLoading } = useSelector(
    (state: RootState) => state.categories,
  );

  const [image, setImage] = useState("");
  const [title, setTitle] = useState("");
  const [url, setUrl] = useState("");
  const [isActive, setIsActive] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    dispatch(getCategoriesAction());
  }, [dispatch]);

  useEffect(() => {
    if (!id || categories.length === 0) {
      return;
    }

    const selectedCategory = categories.find(
      (category: ICategory) => Number(category.id) === Number(id),
    );

    if (!selectedCategory) {
      alert("دسته‌بندی مورد نظر پیدا نشد");
      navigate("/dashboard/categories");
      return;
    }

    setImage(selectedCategory.image);
    setTitle(selectedCategory.title);
    setUrl(selectedCategory.url);
    setIsActive(Boolean(selectedCategory.isActive));
  }, [id, categories, navigate]);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!image.trim() || !title.trim() || !url.trim()) {
      return;
    }

    setLoading(true);

    try {
      const data = {
        image: image.trim(),
        title: title.trim(),
        url: url.trim(),
        isActive,
      };

      if (id) {
        await updateCategory(Number(id), data);
      } else {
        await createCategory(data);
      }

      navigate("/dashboard/categories");
    } catch (error) {
      console.error(error);

      alert(
        isEditMode ? "ویرایش دسته‌بندی انجام نشد" : "ایجاد دسته‌بندی انجام نشد",
      );
    } finally {
      setLoading(false);
    }
  };

  if (isEditMode && categoriesLoading) {
    return (
      <div className="rounded-xl bg-white p-8 text-center text-gray-500">
        در حال دریافت اطلاعات دسته‌بندی...
      </div>
    );
  }

  return (
    <div>
      <div className="mb-6 flex items-center gap-3">
        <button
          type="button"
          onClick={() => navigate("/dashboard/categories")}
          className="rounded-lg p-2 text-gray-600 transition hover:bg-gray-200"
        >
          <FaArrowRight />
        </button>

        <div>
          <h1 className="text-2xl font-bold text-red-900">
            {isEditMode ? "ویرایش دسته‌بندی" : "افزودن دسته‌بندی"}
          </h1>

          <p className="mt-2 text-sm text-gray-500">
            {isEditMode
              ? "ویرایش اطلاعات دسته‌بندی"
              : "ایجاد یک دسته‌بندی جدید"}
          </p>
        </div>
      </div>

      <div className="mx-auto w-full max-w-5xl rounded-xl bg-white p-6 shadow-sm">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">
              عنوان
            </label>

            <input
              type="text"
              value={title}
              onChange={(event) => setTitle(event.target.value)}
              placeholder="عنوان دسته‌بندی"
              className="w-full rounded-xl border border-blue-200 bg-gray-50 px-4 py-3.5 text-sm outline-none transition hover:border-blue-300 hover:bg-white focus:border-blue-600 focus:bg-white focus:ring-2 focus:ring-blue-100"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">
              لینک
            </label>

            <input
              type="text"
              value={url}
              onChange={(event) => setUrl(event.target.value)}
              placeholder="لینک دسته‌بندی"
              className="w-full rounded-xl border border-blue-200 bg-gray-50 px-4 py-3.5 text-sm outline-none transition hover:border-blue-300 hover:bg-white focus:border-blue-600 focus:bg-white focus:ring-2 focus:ring-blue-100"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">
              تصویر
            </label>

            <input
              type="text"
              value={image}
              onChange={(event) => setImage(event.target.value)}
              placeholder="آدرس تصویر دسته‌بندی"
              className="w-full rounded-xl border border-blue-200 bg-gray-50 px-4 py-3.5 text-sm outline-none transition hover:border-blue-300 hover:bg-white focus:border-blue-600 focus:bg-white focus:ring-2 focus:ring-blue-100"
            />

            {image && (
              <div className="mt-4 flex min-h-40 items-center justify-center rounded-xl border border-gray-200 bg-gray-50 p-4">
                <img
                  src={image}
                  alt={title || "Category"}
                  className="h-32 w-32 object-contain"
                />
              </div>
            )}
          </div>

          <div className="flex items-center justify-between rounded-xl border border-gray-200 bg-gray-50 p-4">
            <div>
              <p className="text-sm font-medium text-gray-700">
                وضعیت دسته‌بندی
              </p>

              <p className="mt-1 text-xs text-gray-500">
                این دسته‌بندی در فروشگاه فعال باشد
              </p>
            </div>

            <button
              type="button"
              onClick={() => setIsActive((active) => !active)}
              className={`relative h-7 w-12 rounded-full p-1 transition ${
                isActive ? "bg-green-600" : "bg-gray-300"
              }`}
            >
              <span
                className={`block h-5 w-5 rounded-full bg-white shadow-sm transition-transform ${
                  isActive ? "-translate-x-5" : "translate-x-0"
                }`}
              />
            </button>
          </div>

          <div className="flex justify-end gap-3 border-t border-gray-200 pt-6">
            <button
              type="button"
              onClick={() => navigate("/dashboard/categories")}
              className="flex-1 rounded-lg bg-blue-600 px-4 py-3 text-sm font-medium text-white transition hover:bg-blue-700"
            >
              انصراف
            </button>

            <button
              type="submit"
              disabled={
                loading || !image.trim() || !title.trim() || !url.trim()
              }
              className="flex-1 rounded-lg bg-green-600 px-4 py-3 text-sm font-medium text-white transition hover:bg-green-700 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading
                ? "در حال ذخیره..."
                : isEditMode
                  ? "ذخیره تغییرات"
                  : "ایجاد دسته‌بندی"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CategoryForm;
