import { useEffect, useState } from "react";

import { createBanner, updateBanner } from "../../../../Api/Admin/bannerApi";

import type { IBanner } from "../../../../Types/Home/IBanner";

interface BannerModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
  banner?: IBanner | null;
}

const BannerModal = ({
  isOpen,
  onClose,
  onSuccess,
  banner,
}: BannerModalProps) => {
  const [title, setTitle] = useState("");
  const [url, setUrl] = useState("");
  const [image, setImage] = useState("");
  const [position, setPosition] = useState<IBanner["position"] | "select">(
    "select",
  );

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (banner) {
      setTitle(banner.title);
      setUrl(banner.url);
      setImage(banner.image);
      setPosition(banner.position);
    } else {
      setTitle("");
      setUrl("");
      setImage("");
      setPosition("select");
    }

    setError("");
  }, [banner, isOpen]);

  if (!isOpen) {
    return null;
  }

  const isEditMode = Boolean(banner);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (
      !title.trim() ||
      !url.trim() ||
      !image.trim() ||
      position === "select"
    ) {
      setError("تمام فیلدها الزامی هستند");
      return;
    }

    try {
      setLoading(true);
      setError("");

      const data = {
        title: title.trim(),
        url: url.trim(),
        image: image.trim(),
        position: position as IBanner["position"],
      };

      if (banner) {
        await updateBanner(banner.id, data);
      } else {
        await createBanner(data);
      }

      onSuccess();
      onClose();
    } catch (error) {
      console.error(error);

      setError(isEditMode ? "ویرایش بنر انجام نشد" : "ایجاد بنر انجام نشد");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/60 p-4">
      <div className="w-full max-w-lg rounded-2xl bg-white p-6 shadow-2xl">
        <div className="mb-6 flex items-center justify-between">
          <h4 className="text-xl font-bold text-gray-700">
            {isEditMode ? "ویرایش بنر" : "افزودن بنر"}
          </h4>

          <button
            type="button"
            onClick={onClose}
            className="text-2xl text-gray-400 hover:text-gray-700"
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
              onChange={(event) => setTitle(event.target.value)}
              placeholder="عنوان بنر"
              className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-red-900"
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
              placeholder="https://..."
              className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-red-900"
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
              placeholder="https://..."
              className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-red-900"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">
              موقعیت بنر
            </label>

            <select
              value={position}
              onChange={(event) =>
                setPosition(
                  event.target.value as IBanner["position"] | "select",
                )
              }
              className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 outline-none focus:border-red-900"
            >
              <option value="select">مکان نمایش بنر را انتخاب کنید</option>
              <option value="hero">بعد از شگفت انگیزها</option>
              <option value="top-banner">بعد از دسته بندی ها</option>
              <option value="middle-banner">بعد از محصولات</option>
              <option value="bottom-banner">بعد از برندها</option>
            </select>
          </div>

          {error && <p className="text-sm text-red-500">{error}</p>}

          <div className="flex gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 rounded-lg bg-blue-600 px-4 py-3 text-sm font-medium text-white hover:bg-blue-700"
            >
              انصراف
            </button>

            <button
              type="submit"
              disabled={loading}
              className="flex-1 rounded-lg bg-green-600 px-4 py-3 text-sm font-medium text-white hover:bg-green-700 disabled:opacity-60"
            >
              {loading
                ? "در حال ثبت..."
                : isEditMode
                  ? "ذخیره تغییرات"
                  : "ثبت بنر"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default BannerModal;
