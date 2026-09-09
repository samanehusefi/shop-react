import { useEffect, useState } from "react";

import {
  createCategory,
  updateCategory,
} from "../../../../Api/Admin/categoriesApi";
import type { ICategory } from "../../../../Types/Home/ICategory";

interface CategoryModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
  category?: ICategory | null;
}

const CategoryModal = ({
  isOpen,
  onClose,
  onSuccess,
  category,
}: CategoryModalProps) => {
  const [title, setTitle] = useState("");
  const [url, setUrl] = useState("");
  const [image, setImage] = useState("");
  const [isActive, setIsActive] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (category) {
      setTitle(category.title);
      setUrl(category.url);
      setImage(category.image);
      setIsActive(category.isActive);
    } else {
      setTitle("");
      setUrl("");
      setImage("");
      setIsActive(true);
    }

    setError("");
  }, [category, isOpen]);

  if (!isOpen) {
    return null;
  }

  const isEditMode = Boolean(category);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!title.trim() || !url.trim()) {
      setError("عنوان و URL الزامی هستند");
      return;
    }

    try {
      setLoading(true);
      setError("");

      if (category) {
        await updateCategory(category.id, {
          title: title.trim(),
          url: url.trim(),
          image: image.trim(),
          isActive,
        });
      } else {
        await createCategory({
          title: title.trim(),
          url: url.trim(),
          image: image.trim(),
          isActive,
        });
      }

      onSuccess();
      onClose();
    } catch (error) {
      console.error(error);
      setError(
        isEditMode ? "ویرایش دسته‌بندی انجام نشد" : "ایجاد دسته‌بندی انجام نشد",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
      <div className="w-full max-w-lg rounded-2xl bg-white p-6 shadow-xl">
        <div className="mb-6 flex items-center justify-between">
          <h4 className="text-xl font-bold text-gray-700">
            {isEditMode ? "ویرایش دسته‌بندی" : "افزودن دسته‌بندی"}
          </h4>

          <button
            type="button"
            onClick={onClose}
            className="text-xl text-gray-400 hover:text-gray-700"
          >
            ×
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">
              عنوان
            </label>

            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="مثلاً موبایل"
              className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-red-900"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">
              URL
            </label>

            <input
              type="text"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="/mobile"
              className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-red-900"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">
              آدرس تصویر
            </label>

            <input
              type="text"
              value={image}
              onChange={(e) => setImage(e.target.value)}
              placeholder="/images/mobile.png"
              className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-red-900"
            />
          </div>

          <div className="flex items-center justify-between rounded-lg bg-gray-50 px-4 py-3">
            <span className="text-sm font-medium text-gray-700">
              وضعیت دسته‌بندی
            </span>

            <button
              type="button"
              onClick={() => setIsActive((prev) => !prev)}
              className={`relative h-6 w-11 rounded-full transition-colors ${
                isActive ? "bg-green-600" : "bg-gray-300"
              }`}
            >
              <span
                className={`absolute top-1 h-4 w-4 rounded-full bg-white transition-all ${
                  isActive ? "right-1" : "right-6"
                }`}
              />
            </button>
          </div>

          {error && <p className="text-sm text-red-500">{error}</p>}

          <div className="flex gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 rounded-lg border border-gray-300 bg-blue-600 px-4 py-3 text-sm font-medium text-white hover:bg-blue-700"
            >
              انصراف
            </button>

            <button
              type="submit"
              disabled={loading}
              className="flex-1 rounded-lg bg-green-600 px-4 py-3 text-sm font-medium text-white hover:bg-green-700 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading
                ? "در حال ثبت..."
                : isEditMode
                  ? "ذخیره تغییرات"
                  : "ثبت دسته‌بندی"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CategoryModal;
