import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { FaArrowRight, FaChevronDown } from "react-icons/fa";

import type { AppDispatch, RootState } from "../../../../../Redux/store";
import { getBanners } from "../../../../../Redux/Home/Banner/action";

import { createBanner, updateBanner } from "../../../../../Api/Admin/bannerApi";

import type { IBanner } from "../../../../../Types/Home/IBanner";

const BannerForm = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const { id } = useParams();

  const isEditMode = Boolean(id);

  const { banners, loading: bannersLoading } = useSelector(
    (state: RootState) => state.banner,
  );

  const [image, setImage] = useState("");
  const [title, setTitle] = useState("");
  const [position, setPosition] = useState<IBanner["position"] | "">("");
  const [url, setUrl] = useState("");

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    dispatch(getBanners());
  }, [dispatch]);

  useEffect(() => {
    if (!id || banners.length === 0) {
      return;
    }

    const selectedBanner = banners.find(
      (banner: IBanner) => Number(banner.id) === Number(id),
    );

    if (!selectedBanner) {
      alert("تبلیغات مورد نظر پیدا نشد");
      navigate("/dashboard/banners");
      return;
    }

    setImage(selectedBanner.image);
    setTitle(selectedBanner.title);
    setPosition(selectedBanner.position);
    setUrl(selectedBanner.url);
  }, [id, banners, navigate]);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!image.trim() || !title.trim() || !position || !url.trim()) {
      return;
    }

    setLoading(true);

    try {
      const data = {
        image: image.trim(),
        title: title.trim(),
        position,
        url: url.trim(),
      };

      if (id) {
        await updateBanner(Number(id), data);
      } else {
        await createBanner(data);
      }

      navigate("/dashboard/banners");
    } catch (error) {
      console.error(error);

      alert(
        isEditMode ? "ویرایش تبلیغات انجام نشد" : "ایجاد تبلیغات انجام نشد",
      );
    } finally {
      setLoading(false);
    }
  };

  if (isEditMode && bannersLoading) {
    return (
      <div className="rounded-xl bg-white p-8 text-center text-gray-500">
        در حال دریافت اطلاعات تبلیغات...
      </div>
    );
  }

  return (
    <div>
      <div className="mb-6 flex items-center gap-3">
        <button
          type="button"
          onClick={() => navigate("/dashboard/banners")}
          className="rounded-lg p-2 text-gray-600 transition hover:bg-gray-200"
        >
          <FaArrowRight />
        </button>

        <div>
          <h1 className="text-2xl font-bold text-red-900">
            {isEditMode ? "ویرایش تبلیغات" : "افزودن تبلیغات"}
          </h1>

          <p className="mt-2 text-sm text-gray-500">
            {isEditMode ? "ویرایش اطلاعات تبلیغات" : "ایجاد یک تبلیغات جدید"}
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
              placeholder="عنوان تبلیغات"
              className="w-full rounded-lg border border-blue-200 px-4 py-3 text-sm outline-none transition focus:border-blue-600 focus:ring-1 focus:ring-blue-600"
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
              placeholder="لینک تبلیغات"
              className="w-full rounded-lg border border-blue-200 px-4 py-3 text-sm outline-none transition focus:border-blue-600 focus:ring-1 focus:ring-blue-600"
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
              placeholder="آدرس تصویر تبلیغات"
              className="w-full rounded-lg border border-blue-200 px-4 py-3 text-sm outline-none transition focus:border-blue-600 focus:ring-1 focus:ring-blue-600"
            />

            {image && (
              <div className="mt-4">
                <img
                  src={image}
                  alt={title || "Banner"}
                  className="h-32 w-48 rounded-lg object-cover"
                />
              </div>
            )}
          </div>
          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">
              موقعیت نمایش
            </label>

            <div className="relative">
              <select
                value={position}
                onChange={(event) =>
                  setPosition(event.target.value as IBanner["position"] | "")
                }
                className="w-full appearance-none rounded-xl border border-gray-200 bg-gray-50 px-4 py-3.5 text-sm text-gray-700 outline-none transition hover:border-blue-300 hover:bg-white focus:border-blue-600 focus:bg-white focus:ring-2 focus:ring-blue-100"
              >
                <option value="" disabled>
                  انتخاب موقعیت نمایش تبلیغات
                </option>

                <option value="hero">بعد از شگفت انگیزها</option>
                <option value="top-banner">بعد از گروه محصولات</option>
                <option value="middle-banner">بعد از محصولات</option>
                <option value="bottom-banner">بعد از برند</option>
              </select>

              <div className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                <FaChevronDown />
              </div>
            </div>
          </div>

          <div className="flex justify-end gap-3 border-t border-gray-200 pt-6">
            <button
              type="button"
              onClick={() => navigate("/dashboard/banners")}
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
                  : "ایجاد تبلیغات"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default BannerForm;
