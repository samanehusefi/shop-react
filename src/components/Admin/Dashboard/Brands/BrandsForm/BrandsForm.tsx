import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { FaArrowRight } from "react-icons/fa";

import type { AppDispatch, RootState } from "../../../../../Redux/store";
import {
  getBrands,
  addBrand,
  editBrand,
} from "../../../../../Redux/Home/Brands/action";

import type { IBrand } from "../../../../../Types/Home/IBrand";

const BrandForm = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const { id } = useParams();

  const isEditMode = Boolean(id);

  const { brands, loading: brandsLoading } = useSelector(
    (state: RootState) => state.brands,
  );

  const [code, setCode] = useState("");
  const [titleFa, setTitleFa] = useState("");
  const [src, setSrc] = useState("");
  const [visibility, setVisibility] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (brands.length === 0) {
      dispatch(getBrands());
    }
  }, [dispatch, brands.length]);

  useEffect(() => {
    if (!id || brands.length === 0) {
      return;
    }

    const selectedBrand = brands.find(
      (brand) => Number(brand.id) === Number(id),
    );

    if (!selectedBrand) {
      alert("برند مورد نظر پیدا نشد");
      navigate("/dashboard/brands");
      return;
    }

    setCode(selectedBrand.code ?? "");
    setTitleFa(selectedBrand.title_fa ?? "");
    setSrc(selectedBrand.src ?? "");
    setVisibility(Boolean(selectedBrand.visibility));
  }, [id, brands, navigate]);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const trimmedCode = code.trim();
    const trimmedTitle = titleFa.trim();
    const trimmedSrc = src.trim();

    if (!trimmedCode || !trimmedTitle || !trimmedSrc) {
      return;
    }

    setLoading(true);

    try {
      const brandData: Omit<IBrand, "id"> = {
        code: trimmedCode,
        title_fa: trimmedTitle,
        title_en: "",
        url: "",
        src: trimmedSrc,
        visibility,
        is_premium: false,
      };

      if (isEditMode) {
        const brandId = Number(id);

        if (!Number.isInteger(brandId)) {
          throw new Error("شناسه برند نامعتبر است");
        }

        await dispatch(editBrand(brandId, brandData));
      } else {
        await dispatch(addBrand(brandData));
      }

      navigate("/dashboard/brands");
    } catch (error) {
      console.error("Brand form error:", error);

      alert(isEditMode ? "ویرایش برند انجام نشد" : "ایجاد برند انجام نشد");
    } finally {
      setLoading(false);
    }
  };

  if (isEditMode && brandsLoading) {
    return (
      <div className="rounded-xl bg-white p-8 text-center text-gray-500">
        <span className="loading loading-spinner loading-sm"></span>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-6 flex items-center gap-3">
        <button
          type="button"
          onClick={() => navigate("/dashboard/brands")}
          className="rounded-lg p-2 text-gray-600 transition hover:bg-gray-200"
        >
          <FaArrowRight />
        </button>

        <div>
          <h1 className="text-2xl font-bold text-blue-900">
            {isEditMode ? "ویرایش برند" : "افزودن برند"}
          </h1>

          <p className="mt-2 text-sm text-gray-500">
            {isEditMode ? "ویرایش اطلاعات برند" : "ایجاد یک برند جدید"}
          </p>
        </div>
      </div>

      <div className="mx-auto w-full max-w-5xl rounded-xl bg-white p-6 shadow-sm">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">
              کد برند
            </label>

            <input
              type="text"
              value={code}
              onChange={(event) => setCode(event.target.value)}
              placeholder="کد برند"
              className="w-full rounded-xl border border-blue-200 bg-gray-50 px-4 py-3.5 text-sm outline-none transition hover:border-blue-300 hover:bg-white focus:border-blue-600 focus:bg-white focus:ring-2 focus:ring-blue-100"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">
              عنوان برند
            </label>

            <input
              type="text"
              value={titleFa}
              onChange={(event) => setTitleFa(event.target.value)}
              placeholder="عنوان برند"
              className="w-full rounded-xl border border-blue-200 bg-gray-50 px-4 py-3.5 text-sm outline-none transition hover:border-blue-300 hover:bg-white focus:border-blue-600 focus:bg-white focus:ring-2 focus:ring-blue-100"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">
              تصویر برند
            </label>

            <input
              type="text"
              value={src}
              onChange={(event) => setSrc(event.target.value)}
              placeholder="آدرس تصویر برند"
              className="w-full rounded-xl border border-blue-200 bg-gray-50 px-4 py-3.5 text-sm outline-none transition hover:border-blue-300 hover:bg-white focus:border-blue-600 focus:bg-white focus:ring-2 focus:ring-blue-100"
            />

            {src && (
              <div className="mt-4 flex min-h-40 items-center justify-center rounded-xl border border-gray-200 bg-gray-50 p-4">
                <img
                  src={src}
                  alt={titleFa || "Brand"}
                  className="h-32 w-32 object-contain"
                />
              </div>
            )}
          </div>

          <div className="flex items-center justify-between rounded-xl border border-gray-200 bg-gray-50 p-4">
            <div>
              <p className="text-sm font-medium text-gray-700">وضعیت برند</p>

              <p className="mt-1 text-xs text-gray-500">
                این برند در فروشگاه فعال باشد
              </p>
            </div>

            <button
              type="button"
              onClick={() => setVisibility((active) => !active)}
              className={`relative h-7 w-12 rounded-full p-1 transition ${
                visibility ? "bg-green-600" : "bg-gray-300"
              }`}
            >
              <span
                className={`block h-5 w-5 rounded-full bg-white shadow-sm transition-transform ${
                  visibility ? "-translate-x-5" : "translate-x-0"
                }`}
              />
            </button>
          </div>

          <div className="flex justify-end gap-3 border-t border-gray-200 pt-6">
            <button
              type="button"
              onClick={() => navigate("/dashboard/brands")}
              className="flex-1 rounded-lg bg-blue-600 px-4 py-3 text-sm font-medium text-white transition hover:bg-blue-700"
            >
              انصراف
            </button>

            <button
              type="submit"
              disabled={
                loading || !code.trim() || !titleFa.trim() || !src.trim()
              }
              className="flex-1 rounded-lg bg-green-600 px-4 py-3 text-sm font-medium text-white transition hover:bg-green-700 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading ? (
                <span className="flex items-center justify-center">
                  <span className="loading loading-spinner loading-sm"></span>
                </span>
              ) : isEditMode ? (
                "ذخیره تغییرات"
              ) : (
                "ایجاد برند"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default BrandForm;
