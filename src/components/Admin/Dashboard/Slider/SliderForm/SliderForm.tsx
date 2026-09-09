import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { FaArrowRight } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";

import type { AppDispatch, RootState } from "../../../../../Redux/store";
import { getSlider } from "../../../../../Redux/Home/Slider/action";

import { createSlider, updateSlider } from "../../../../../Api/Admin/sliderApi";

import type { ISlider } from "../../../../../Types/Home/ISlider";

const SliderForm = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const { id } = useParams();

  const isEditMode = Boolean(id);

  const { slider, loading: sliderLoading } = useSelector(
    (state: RootState) => state.slider,
  );

  const [imageSrc, setImageSrc] = useState("");
  const [imageMobileSrc, setImageMobileSrc] = useState("");
  const [title, setTitle] = useState("");
  const [link, setLink] = useState("");

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    dispatch(getSlider());
  }, [dispatch]);

  useEffect(() => {
    if (!id || slider.length === 0) {
      return;
    }

    const selectedSlider = slider.find(
      (item: ISlider) => Number(item.id) === Number(id),
    );

    if (!selectedSlider) {
      alert("اسلایدر مورد نظر پیدا نشد");
      navigate("/dashboard/slider");
      return;
    }

    setImageSrc(selectedSlider.imageSrc);
    setImageMobileSrc(selectedSlider.imageMobileSrc);
    setTitle(selectedSlider.title);
    setLink(selectedSlider.link);
  }, [id, slider, navigate]);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (
      !imageSrc.trim() ||
      !imageMobileSrc.trim() ||
      !title.trim() ||
      !link.trim()
    ) {
      return;
    }

    setLoading(true);

    try {
      const data = {
        imageSrc: imageSrc.trim(),
        imageMobileSrc: imageMobileSrc.trim(),
        title: title.trim(),
        link: link.trim(),
      };

      if (id) {
        await updateSlider(Number(id), data);
      } else {
        await createSlider(data);
      }

      navigate("/dashboard/slider");
    } catch (error) {
      console.error(error);

      alert(
        isEditMode ? "ویرایش اسلایدر انجام نشد" : "ایجاد اسلایدر انجام نشد",
      );
    } finally {
      setLoading(false);
    }
  };

  if (isEditMode && sliderLoading) {
    return (
      <div className="rounded-xl bg-white p-8 text-center text-gray-500">
        در حال دریافت اطلاعات اسلایدر...
      </div>
    );
  }

  return (
    <div>
      <div className="mb-6 flex items-center gap-3">
        <button
          type="button"
          onClick={() => navigate("/dashboard/slider")}
          className="rounded-lg p-2 text-gray-600 transition hover:bg-gray-200"
        >
          <FaArrowRight />
        </button>

        <div>
          <h1 className="text-2xl font-bold text-red-900">
            {isEditMode ? "ویرایش اسلایدر" : "افزودن اسلایدر"}
          </h1>

          <p className="mt-2 text-sm text-gray-500">
            {isEditMode ? "ویرایش اطلاعات اسلایدر" : "ایجاد یک اسلایدر جدید"}
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
              placeholder="عنوان اسلایدر"
              className="w-full rounded-lg border border-blue-200 px-4 py-3 text-sm outline-none transition focus:border-blue-600 focus:ring-1 focus:ring-blue-600"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">
              لینک
            </label>

            <input
              type="text"
              value={link}
              onChange={(event) => setLink(event.target.value)}
              placeholder="لینک اسلایدر"
              className="w-full rounded-lg border border-blue-200 px-4 py-3 text-sm outline-none transition focus:border-blue-600 focus:ring-1 focus:ring-blue-600"
            />
          </div>
          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">
              تصویر دسکتاپ
            </label>

            <input
              type="text"
              value={imageSrc}
              onChange={(event) => setImageSrc(event.target.value)}
              placeholder="آدرس تصویر دسکتاپ"
              className="w-full rounded-lg border border-blue-200 px-4 py-3 text-sm outline-none transition focus:border-blue-600 focus:ring-1 focus:ring-blue-600"
            />

            {imageSrc && (
              <div className="mt-4">
                <img
                  src={imageSrc}
                  alt={title || "Slider"}
                  className="h-32 w-full rounded-lg object-cover"
                />
              </div>
            )}
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">
              تصویر موبایل
            </label>

            <input
              type="text"
              value={imageMobileSrc}
              onChange={(event) => setImageMobileSrc(event.target.value)}
              placeholder="آدرس تصویر موبایل"
              className="w-full rounded-lg border border-blue-200 px-4 py-3 text-sm outline-none transition focus:border-blue-600 focus:ring-1 focus:ring-blue-600"
            />

            {imageMobileSrc && (
              <div className="mt-4">
                <img
                  src={imageMobileSrc}
                  alt={title || "Slider Mobile"}
                  className="h-32 w-full rounded-lg object-cover"
                />
              </div>
            )}
          </div>

          <div className="flex justify-end gap-3 border-t border-gray-200 pt-6">
            <button
              type="button"
              onClick={() => navigate("/dashboard/slider")}
              className="flex-1 rounded-lg bg-blue-600 px-4 py-3 text-sm font-medium text-white transition hover:bg-blue-700"
            >
              انصراف
            </button>

            <button
              type="submit"
              disabled={
                loading ||
                !imageSrc.trim() ||
                !imageMobileSrc.trim() ||
                !title.trim() ||
                !link.trim()
              }
              className="flex-1 rounded-lg bg-green-600 px-4 py-3 text-sm font-medium text-white transition hover:bg-green-700 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading
                ? "در حال ذخیره..."
                : isEditMode
                  ? "ذخیره تغییرات"
                  : "ایجاد اسلایدر"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SliderForm;
