import { useEffect, useState } from "react";
import { createPortal } from "react-dom";

import { createSlider, updateSlider } from "../../../../Api/Admin/sliderApi";

import type { ISlider } from "../../../../Types/Home/ISlider";

interface SliderModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
  slider?: ISlider | null;
}

const SliderModal = ({
  isOpen,
  onClose,
  onSuccess,
  slider,
}: SliderModalProps) => {
  const [imageSrc, setImageSrc] = useState("");
  const [imageMobileSrc, setImageMobileSrc] = useState("");
  const [title, setTitle] = useState("");
  const [link, setLink] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (slider) {
      setImageSrc(slider.imageSrc);
      setImageMobileSrc(slider.imageMobileSrc);
      setTitle(slider.title);
      setLink(slider.link);
    } else {
      setImageSrc("");
      setImageMobileSrc("");
      setTitle("");
      setLink("");
    }

    setError("");
  }, [slider, isOpen]);

  if (!isOpen) {
    return null;
  }

  const isEditMode = Boolean(slider);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (
      !imageSrc.trim() ||
      !imageMobileSrc.trim() ||
      !title.trim() ||
      !link.trim()
    ) {
      setError("تمام فیلدها الزامی هستند");
      return;
    }

    try {
      setLoading(true);
      setError("");

      const data = {
        imageSrc: imageSrc.trim(),
        imageMobileSrc: imageMobileSrc.trim(),
        title: title.trim(),
        link: link.trim(),
      };

      if (slider) {
        await updateSlider(slider.id, data);
      } else {
        await createSlider(data);
      }

      onSuccess();
      onClose();
    } catch (error) {
      console.error(error);

      setError(
        isEditMode ? "ویرایش اسلایدر انجام نشد" : "ایجاد اسلایدر انجام نشد",
      );
    } finally {
      setLoading(false);
    }
  };

  return createPortal(
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/50 px-4"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) {
          onClose();
        }
      }}
    >
      <div className="w-full max-w-lg rounded-2xl bg-white p-6 shadow-2xl">
        <div className="mb-6 flex items-center justify-between">
          <h4 className="text-xl font-bold text-gray-700">
            {isEditMode ? "ویرایش اسلایدر" : "افزودن اسلایدر"}
          </h4>

          <button
            type="button"
            onClick={onClose}
            className="text-2xl text-gray-400 transition hover:text-gray-700"
          >
            ×
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">
              تصویر دسکتاپ
            </label>

            <input
              type="text"
              value={imageSrc}
              onChange={(event) => setImageSrc(event.target.value)}
              placeholder="/images/slider/desktop.webp"
              className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-red-900"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">
              تصویر موبایل
            </label>

            <input
              type="text"
              value={imageMobileSrc}
              onChange={(event) => setImageMobileSrc(event.target.value)}
              placeholder="/images/slider/mobile.webp"
              className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-red-900"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">
              عنوان
            </label>

            <input
              type="text"
              value={title}
              onChange={(event) => setTitle(event.target.value)}
              placeholder="عنوان اسلایدر"
              className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-red-900"
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
              placeholder="/product/..."
              className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-red-900"
            />
          </div>

          {error && <p className="text-sm text-red-500">{error}</p>}

          <div className="flex gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 rounded-lg border border-gray-300 bg-blue-600 px-4 py-3 text-sm font-medium text-white transition hover:bg-blue-700"
            >
              انصراف
            </button>

            <button
              type="submit"
              disabled={loading}
              className="flex-1 rounded-lg bg-green-600 px-4 py-3 text-sm font-medium text-white transition hover:bg-green-700 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading
                ? "در حال ثبت..."
                : isEditMode
                  ? "ذخیره تغییرات"
                  : "ثبت اسلایدر"}
            </button>
          </div>
        </form>
      </div>
    </div>,
    document.body,
  );
};

export default SliderModal;
