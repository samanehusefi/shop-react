import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { FaArrowRight } from "react-icons/fa";

import {
  createCircleBadge,
  getAdminCircleBadge,
  updateCircleBadge,
} from "../../../../../Api/Admin/circleBadgeApi";

import type { ICircleBadge } from "../../../../../Types/Home/ICircleBadge";

const CircleBadgeForm = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const isEditMode = Boolean(id);

  const [image, setImage] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [url, setUrl] = useState("");
  const [isDigikalaService, setIsDigikalaService] = useState(false);

  const [loading, setLoading] = useState(false);
  const [pageLoading, setPageLoading] = useState(false);

  useEffect(() => {
    if (!id) {
      setImage("");
      setTitle("");
      setDescription("");
      setUrl("");
      setIsDigikalaService(false);
      return;
    }

    const loadCircleBadge = async () => {
      setPageLoading(true);

      try {
        const data = await getAdminCircleBadge();

        const selectedCircleBadge = data.find(
          (item: ICircleBadge) => Number(item.id) === Number(id),
        );

        if (!selectedCircleBadge) {
          throw new Error("اطلاعات Circle Badge پیدا نشد");
        }

        setImage(selectedCircleBadge.image);
        setTitle(selectedCircleBadge.title);
        setDescription(selectedCircleBadge.description || "");
        setUrl(selectedCircleBadge.url);
        setIsDigikalaService(selectedCircleBadge.is_digikala_service);
      } catch (error) {
        console.error("خطا در دریافت Circle Badge:", error);
        alert("اطلاعات مورد نظر دریافت نشد");
        navigate("/dashboard/circle-badge");
      } finally {
        setPageLoading(false);
      }
    };

    loadCircleBadge();
  }, [id, navigate]);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!image.trim() || !title.trim() || !url.trim()) {
      return;
    }

    setLoading(true);

    try {
      const data: Omit<ICircleBadge, "id"> = {
        image: image.trim(),
        title: title.trim(),
        description: description.trim(),
        url: url.trim(),
        is_digikala_service: isDigikalaService,
      };

      if (id) {
        await updateCircleBadge(Number(id), data);
      } else {
        await createCircleBadge(data);
      }

      navigate("/dashboard/circle-badge");
    } catch (error) {
      console.error("خطا در ذخیره Circle Badge:", error);

      alert(isEditMode ? "ویرایش انجام نشد" : "ایجاد مورد جدید انجام نشد");
    } finally {
      setLoading(false);
    }
  };

  if (pageLoading) {
    return (
      <div className="rounded-xl bg-white p-8 text-center text-gray-500">
        <span className="loading loading-dots loading-xl"></span>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-6 flex items-center gap-3">
        <button
          type="button"
          onClick={() => navigate("/dashboard/circle-badge")}
          className="rounded-lg p-2 text-gray-600 transition hover:bg-gray-200"
        >
          <FaArrowRight />
        </button>

        <div>
          <h1 className="text-2xl font-bold text-red-900">
            {isEditMode ? "ویرایش خدمات فروشگاه" : "افزودن خدمت فروشگاه"}
          </h1>

          <p className="mt-2 text-sm text-gray-500">
            {isEditMode ? "ویرایش اطلاعات خدمات" : "ایجاد یک خدمات جدید"}
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
              placeholder="عنوان"
              className="w-full rounded-lg border border-blue-200 px-4 py-3 text-sm outline-none transition focus:border-blue-600 focus:ring-1 focus:ring-blue-600"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">
              توضیحات
            </label>

            <textarea
              value={description}
              onChange={(event) => setDescription(event.target.value)}
              placeholder="توضیحات"
              rows={4}
              className="w-full resize-none rounded-lg border border-blue-200 px-4 py-3 text-sm outline-none transition focus:border-blue-600 focus:ring-1 focus:ring-blue-600"
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
              placeholder="آدرس لینک"
              className="w-full rounded-lg border border-blue-200 px-4 py-3 text-sm outline-none transition focus:border-blue-600 focus:ring-1 focus:ring-blue-600"
            />
          </div>

          <div className="flex items-center justify-between rounded-xl border border-gray-200 bg-gray-50 p-4">
            <div>
              <p className="text-sm font-medium text-gray-700">
                نمایش در خدمات فروشگاه
              </p>

              <p className="mt-1 text-xs text-gray-500">
                این مورد در بخش خدمات فروشگاه نمایش داده شود
              </p>
            </div>

            <button
              type="button"
              onClick={() => setIsDigikalaService(!isDigikalaService)}
              className={`relative h-7 w-12 rounded-full p-1 transition ${
                isDigikalaService ? "bg-green-600" : "bg-gray-300"
              }`}
            >
              <span
                className={`block h-5 w-5 rounded-full bg-white shadow-sm transition-transform ${
                  isDigikalaService ? "-translate-x-5" : "translate-x-0"
                }`}
              />
            </button>
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">
              آدرس تصویر
            </label>

            <input
              type="text"
              value={image}
              onChange={(event) => setImage(event.target.value)}
              placeholder="آدرس تصویر را وارد کنید"
              className="w-full rounded-lg border border-blue-200 px-4 py-3 text-sm outline-none transition focus:border-blue-600 focus:ring-1 focus:ring-blue-600"
            />

            {image && (
              <div className="mt-4">
                <img
                  src={image}
                  alt={title || "خدمات"}
                  className="h-20 w-20 rounded-full object-cover"
                />
              </div>
            )}
          </div>

          <div className="flex justify-end gap-3 border-t border-gray-200 pt-6">
            <button
              type="button"
              onClick={() => navigate("/dashboard/circle-badge")}
              className="flex-1 rounded-lg bg-blue-600 px-4 py-3 text-sm font-medium text-white hover:bg-blue-700"
            >
              انصراف
            </button>

            <button
              type="submit"
              disabled={
                loading || !image.trim() || !title.trim() || !url.trim()
              }
              className="flex-1 rounded-lg bg-green-600 px-4 py-3 text-sm font-medium text-white hover:bg-green-700 disabled:opacity-60"
            >
              {loading ? (
                <span className="flex items-center justify-center">
                  <span className="loading loading-spinner loading-sm"></span>
                </span>
              ) : isEditMode ? (
                "ذخیره تغییرات"
              ) : (
                "ایجاد مورد"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CircleBadgeForm;
