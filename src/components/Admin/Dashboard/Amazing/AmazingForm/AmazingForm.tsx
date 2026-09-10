import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { FaArrowRight, FaPlus, FaTrash } from "react-icons/fa";

import type { IAmazing } from "../../../../../Types/Home/IAmazing";
import type { AppDispatch } from "../../../../../Redux/store";

import {
  createAmazing,
  getAdminAmazing,
  updateAmazing,
} from "../../../../../Api/Admin/amazingApi";

import { getAmazing } from "../../../../../Redux/Home/Amazing/action";

const AmazingForm = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const dispatch = useDispatch<AppDispatch>();

  const isEditMode = Boolean(id);

  const [title, setTitle] = useState("");
  const [image, setImage] = useState("");
  const [url, setUrl] = useState("");

  const [selling, setSelling] = useState("");
  const [original, setOriginal] = useState("");
  const [discount, setDiscount] = useState("");

  const [timer, setTimer] = useState("");

  const [rate, setRate] = useState("");
  const [count, setCount] = useState("");

  const [brandTitle, setBrandTitle] = useState("");
  const [brandLogo, setBrandLogo] = useState("");

  const [colors, setColors] = useState<{ title: string; hex: string }[]>([]);

  const [loading, setLoading] = useState(false);
  const [pageLoading, setPageLoading] = useState(false);

  useEffect(() => {
    if (!id) {
      return;
    }

    const loadAmazing = async () => {
      setPageLoading(true);

      try {
        const data = await getAdminAmazing();

        const selectedAmazing = data.find(
          (item) => Number(item.id) === Number(id),
        );

        if (!selectedAmazing) {
          throw new Error("اطلاعات شگفت‌انگیز پیدا نشد");
        }

        setTitle(selectedAmazing.title);
        setImage(selectedAmazing.image);
        setUrl(selectedAmazing.url);

        setSelling(String(selectedAmazing.price.selling));
        setOriginal(String(selectedAmazing.price.original));
        setDiscount(String(selectedAmazing.price.discount));

        setTimer(String(selectedAmazing.timer));

        setRate(String(selectedAmazing.rating.rate));
        setCount(String(selectedAmazing.rating.count));

        setBrandTitle(selectedAmazing.brand.title);
        setBrandLogo(selectedAmazing.brand.logo);

        setColors(selectedAmazing.colors || []);
      } catch (error) {
        console.error("خطا در دریافت اطلاعات Amazing:", error);

        alert(
          error instanceof Error
            ? error.message
            : "اطلاعات شگفت‌انگیز دریافت نشد",
        );

        navigate("/dashboard/amazing");
      } finally {
        setPageLoading(false);
      }
    };

    loadAmazing();
  }, [id, navigate]);

  const handleAddColor = () => {
    setColors([
      ...colors,
      {
        title: "",
        hex: "#000000",
      },
    ]);
  };

  const handleColorChange = (
    index: number,
    field: "title" | "hex",
    value: string,
  ) => {
    setColors(
      colors.map((color, colorIndex) =>
        colorIndex === index
          ? {
              ...color,
              [field]: value,
            }
          : color,
      ),
    );
  };

  const handleRemoveColor = (index: number) => {
    setColors(colors.filter((_, colorIndex) => colorIndex !== index));
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (
      !title.trim() ||
      !image.trim() ||
      !url.trim() ||
      !selling ||
      !original ||
      !discount ||
      !timer ||
      !rate ||
      !count ||
      !brandTitle.trim() ||
      !brandLogo.trim()
    ) {
      alert("لطفاً تمام فیلدهای الزامی را تکمیل کنید");
      return;
    }

    setLoading(true);

    try {
      const data: Omit<IAmazing, "id"> = {
        title: title.trim(),
        image: image.trim(),
        price: {
          selling: Number(selling),
          original: Number(original),
          discount: Number(discount),
        },
        timer: Number(timer),
        rating: {
          rate: Number(rate),
          count: Number(count),
        },
        brand: {
          title: brandTitle.trim(),
          logo: brandLogo.trim(),
        },
        url: url.trim(),
        colors: colors.map((color) => ({
          title: color.title.trim(),
          hex: color.hex,
        })),
      };

      if (id) {
        await updateAmazing(Number(id), data);
      } else {
        await createAmazing(data);
      }

      await dispatch(getAmazing());

      navigate("/dashboard/amazing");
    } catch (error) {
      console.error("خطا در ذخیره Amazing:", error);

      alert(
        error instanceof Error
          ? error.message
          : isEditMode
            ? "ویرایش شگفت‌انگیز انجام نشد"
            : "ایجاد شگفت‌انگیز انجام نشد",
      );
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
          onClick={() => navigate("/dashboard/amazing")}
          className="rounded-lg bg-gray-100 p-3 text-gray-600 transition hover:bg-gray-200"
        >
          <FaArrowRight />
        </button>

        <div>
          <h1 className="text-2xl font-bold text-red-700">
            {isEditMode ? "ویرایش شگفت‌انگیز" : "افزودن شگفت‌انگیز"}
          </h1>

          <p className="mt-2 text-sm text-gray-500">
            اطلاعات محصول شگفت‌انگیز را وارد کنید
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="rounded-xl bg-white p-6 shadow-sm">
          <h2 className="mb-5 text-lg font-semibold text-gray-800">
            اطلاعات اصلی
          </h2>

          <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700">
                عنوان
              </label>

              <input
                type="text"
                value={title}
                onChange={(event) => setTitle(event.target.value)}
                className="w-full rounded-lg border border-blue-300 px-4 py-3 text-sm outline-none transition focus:border-blue-600 focus:ring-2 focus:ring-blue-100"
                placeholder="عنوان محصول"
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
                className="w-full rounded-lg border border-blue-300 px-4 py-3 text-sm outline-none transition focus:border-blue-600 focus:ring-2 focus:ring-blue-100"
                placeholder="لینک محصول"
              />
            </div>

            <div className="md:col-span-2">
              <label className="mb-2 block text-sm font-medium text-gray-700">
                تصویر
              </label>

              <input
                type="text"
                value={image}
                onChange={(event) => setImage(event.target.value)}
                className="w-full rounded-lg border border-blue-300 px-4 py-3 text-sm outline-none transition focus:border-blue-600 focus:ring-2 focus:ring-blue-100"
                placeholder="آدرس تصویر"
              />
            </div>
          </div>
        </div>

        <div className="rounded-xl bg-white p-6 shadow-sm">
          <h2 className="mb-5 text-lg font-semibold text-gray-800">قیمت</h2>

          <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700">
                قیمت فروش
              </label>

              <input
                type="number"
                value={selling}
                onChange={(event) => setSelling(event.target.value)}
                className="w-full rounded-lg border border-blue-300 px-4 py-3 text-sm outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700">
                قیمت اصلی
              </label>

              <input
                type="number"
                value={original}
                onChange={(event) => setOriginal(event.target.value)}
                className="w-full rounded-lg border border-blue-300 px-4 py-3 text-sm outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700">
                درصد تخفیف
              </label>

              <input
                type="number"
                value={discount}
                onChange={(event) => setDiscount(event.target.value)}
                className="w-full rounded-lg border border-blue-300 px-4 py-3 text-sm outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100"
              />
            </div>
          </div>
        </div>

        <div className="rounded-xl bg-white p-6 shadow-sm">
          <h2 className="mb-5 text-lg font-semibold text-gray-800">
            زمان و امتیاز
          </h2>

          <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700">
                تایمر
              </label>

              <input
                type="number"
                value={timer}
                onChange={(event) => setTimer(event.target.value)}
                className="w-full rounded-lg border border-blue-300 px-4 py-3 text-sm outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700">
                امتیاز
              </label>

              <input
                type="number"
                step="0.1"
                value={rate}
                onChange={(event) => setRate(event.target.value)}
                className="w-full rounded-lg border border-blue-300 px-4 py-3 text-sm outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700">
                تعداد امتیازها
              </label>

              <input
                type="number"
                value={count}
                onChange={(event) => setCount(event.target.value)}
                className="w-full rounded-lg border border-blue-300 px-4 py-3 text-sm outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100"
              />
            </div>
          </div>
        </div>

        <div className="rounded-xl bg-white p-6 shadow-sm">
          <h2 className="mb-5 text-lg font-semibold text-gray-800">برند</h2>

          <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700">
                نام برند
              </label>

              <input
                type="text"
                value={brandTitle}
                onChange={(event) => setBrandTitle(event.target.value)}
                className="w-full rounded-lg border border-blue-300 px-4 py-3 text-sm outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700">
                لوگوی برند
              </label>

              <input
                type="text"
                value={brandLogo}
                onChange={(event) => setBrandLogo(event.target.value)}
                className="w-full rounded-lg border border-blue-300 px-4 py-3 text-sm outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100"
              />
            </div>
          </div>
        </div>

        <div className="rounded-xl bg-white p-6 shadow-sm">
          <div className="mb-5 flex items-center justify-between">
            <h2 className="text-lg font-semibold text-gray-800">رنگ‌ها</h2>

            <button
              type="button"
              onClick={handleAddColor}
              className="flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-blue-700"
            >
              <FaPlus />
              افزودن رنگ
            </button>
          </div>

          {colors.length === 0 ? (
            <p className="text-sm text-gray-500">
              رنگی برای این محصول ثبت نشده است.
            </p>
          ) : (
            <div className="space-y-4">
              {colors.map((color, index) => (
                <div
                  key={index}
                  className="grid grid-cols-1 items-end gap-4 rounded-lg border border-gray-200 bg-gray-50 p-4 md:grid-cols-[1fr_1fr_auto]"
                >
                  <div>
                    <label className="mb-2 block text-sm font-medium text-gray-700">
                      نام رنگ
                    </label>

                    <input
                      type="text"
                      value={color.title}
                      onChange={(event) =>
                        handleColorChange(index, "title", event.target.value)
                      }
                      className="w-full rounded-lg border border-blue-300 bg-white px-4 py-3 text-sm outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100"
                    />
                  </div>

                  <div>
                    <label className="mb-2 block text-sm font-medium text-gray-700">
                      کد رنگ
                    </label>

                    <input
                      type="text"
                      value={color.hex}
                      onChange={(event) =>
                        handleColorChange(index, "hex", event.target.value)
                      }
                      className="w-full rounded-lg border border-blue-300 bg-white px-4 py-3 text-sm outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100"
                    />
                  </div>

                  <button
                    type="button"
                    onClick={() => handleRemoveColor(index)}
                    className="rounded-lg bg-red-50 p-3 text-red-600 transition hover:bg-red-100"
                    title="حذف رنگ"
                  >
                    <FaTrash />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="flex justify-end gap-3">
          <button
            type="button"
            onClick={() => navigate("/dashboard/amazing")}
            className="flex-1 rounded-lg bg-blue-600 px-4 py-3 text-sm font-medium text-white transition hover:bg-blue-700"
          >
            انصراف
          </button>

          <button
            type="submit"
            disabled={loading}
            className="flex-1 rounded-lg bg-green-600 px-4 py-3 text-sm font-medium text-white transition hover:bg-green-700 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {loading ? (
              <span className="flex items-center justify-center">
                <span className="loading loading-spinner loading-sm"></span>
              </span>
            ) : isEditMode ? (
              "ذخیره تغییرات"
            ) : (
              "ایجاد شگفت‌انگیز"
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AmazingForm;
