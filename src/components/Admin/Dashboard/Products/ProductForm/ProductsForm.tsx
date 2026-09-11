import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { FaArrowRight } from "react-icons/fa";

import {
  createProduct,
  getAdminProducts,
  updateProduct,
} from "../../../../../Api/Admin/productsApi";

import type {
  ICreateProduct,
  IProduct,
} from "../../../../../Types/Home/IProduct";

const ProductForm = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const isEditMode = Boolean(id);

  const [products, setProducts] = useState<IProduct[]>([]);

  const [title, setTitle] = useState("");
  const [englishTitle, setEnglishTitle] = useState("");
  const [brand, setBrand] = useState("");
  const [category, setCategory] = useState("");
  const [image, setImage] = useState("");

  const [price, setPrice] = useState("");
  const [oldPrice, setOldPrice] = useState("");
  const [discount, setDiscount] = useState("");
  const [stock, setStock] = useState("");

  const [rating, setRating] = useState("0");
  const [ratingCount, setRatingCount] = useState("0");

  const [status, setStatus] = useState("active");

  const [isPromotion, setIsPromotion] = useState(false);
  const [isAmazing, setIsAmazing] = useState(false);

  const [seller, setSeller] = useState("");
  const [warranty, setWarranty] = useState("");

  const [colorTitle, setColorTitle] = useState("");
  const [colorHex, setColorHex] = useState("#000000");

  const [shippingAvailable, setShippingAvailable] = useState(true);
  const [shippingFast, setShippingFast] = useState(false);
  const [shippingDescription, setShippingDescription] = useState("");

  const [url, setUrl] = useState("");

  const [loading, setLoading] = useState(false);
  const [productsLoading, setProductsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadProducts = async () => {
      try {
        setProductsLoading(true);
        setError("");

        const data = await getAdminProducts();

        setProducts(data);
      } catch (error) {
        console.error("خطا در دریافت محصولات:", error);

        setError(
          error instanceof Error ? error.message : "دریافت محصولات انجام نشد",
        );
      } finally {
        setProductsLoading(false);
      }
    };

    loadProducts();
  }, []);

  useEffect(() => {
    if (!id || products.length === 0) {
      return;
    }

    const selectedProduct = products.find(
      (product) => Number(product.id) === Number(id),
    );

    if (!selectedProduct) {
      alert("محصول مورد نظر پیدا نشد");
      navigate("/dashboard/products");
      return;
    }

    setTitle(selectedProduct.title);
    setEnglishTitle(selectedProduct.english_title);
    setBrand(selectedProduct.brand);
    setCategory(selectedProduct.category);
    setImage(selectedProduct.image);

    setPrice(String(selectedProduct.price));
    setOldPrice(String(selectedProduct.old_price));
    setDiscount(String(selectedProduct.discount));
    setStock(String(selectedProduct.stock));

    setRating(String(selectedProduct.rating));
    setRatingCount(String(selectedProduct.rating_count));

    setStatus(selectedProduct.status);

    setIsPromotion(Boolean(selectedProduct.is_promotion));
    setIsAmazing(Boolean(selectedProduct.is_amazing));

    setSeller(selectedProduct.seller);
    setWarranty(selectedProduct.warranty);

    setColorTitle(selectedProduct.color?.title ?? "");
    setColorHex(selectedProduct.color?.hex ?? "#000000");

    setShippingAvailable(Boolean(selectedProduct.shipping?.available));

    setShippingFast(Boolean(selectedProduct.shipping?.fast));

    setShippingDescription(selectedProduct.shipping?.description ?? "");

    setUrl(selectedProduct.url);
  }, [id, products, navigate]);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (
      !title.trim() ||
      !brand.trim() ||
      !category.trim() ||
      !image.trim() ||
      !price.trim() ||
      !stock.trim() ||
      !seller.trim() ||
      !url.trim()
    ) {
      alert("لطفاً تمام فیلدهای الزامی را تکمیل کنید");
      return;
    }

    setLoading(true);

    try {
      const productData: ICreateProduct = {
        title: title.trim(),
        english_title: englishTitle.trim(),
        brand: brand.trim(),
        category: category.trim(),
        image: image.trim(),

        price: Number(price),
        old_price: Number(oldPrice) || 0,
        discount: Number(discount) || 0,
        stock: Number(stock),

        rating: Number(rating) || 0,
        rating_count: Number(ratingCount) || 0,

        status,

        is_promotion: isPromotion,
        is_amazing: isAmazing,

        seller: seller.trim(),
        warranty: warranty.trim(),

        color: {
          title: colorTitle.trim(),
          hex: colorHex,
        },

        shipping: {
          available: shippingAvailable,
          fast: shippingFast,
          description: shippingDescription.trim(),
        },

        url: url.trim(),
      };

      if (id) {
        await updateProduct(Number(id), productData);
      } else {
        await createProduct(productData);
      }

      navigate("/dashboard/products");
    } catch (error) {
      console.error("خطا در ذخیره محصول:", error);

      alert(
        error instanceof Error
          ? error.message
          : isEditMode
            ? "ویرایش محصول انجام نشد"
            : "ایجاد محصول انجام نشد",
      );
    } finally {
      setLoading(false);
    }
  };

  if (isEditMode && productsLoading) {
    return (
      <div className="flex min-h-60 items-center justify-center rounded-xl bg-white">
        <span className="loading loading-spinner loading-lg text-blue-600"></span>
      </div>
    );
  }

  if (isEditMode && error) {
    return (
      <div className="flex min-h-60 flex-col items-center justify-center gap-3 rounded-xl bg-white">
        <p className="text-sm text-red-600">دریافت اطلاعات محصول انجام نشد</p>

        <p className="text-xs text-gray-500">{error}</p>

        <button
          type="button"
          onClick={() => window.location.reload()}
          className="rounded-lg bg-blue-600 px-4 py-2 text-sm text-white transition hover:bg-blue-700"
        >
          تلاش مجدد
        </button>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-6 flex items-center gap-3">
        <button
          type="button"
          onClick={() => navigate("/dashboard/products")}
          className="rounded-lg p-2 text-gray-600 transition hover:bg-gray-200"
        >
          <FaArrowRight />
        </button>

        <div>
          <h1 className="text-2xl font-bold text-red-900">
            {isEditMode ? "ویرایش محصول" : "افزودن محصول"}
          </h1>

          <p className="mt-2 text-sm text-gray-500">
            {isEditMode ? "ویرایش اطلاعات محصول" : "ایجاد یک محصول جدید"}
          </p>
        </div>
      </div>

      <div className="mx-auto w-full max-w-6xl rounded-xl bg-white p-6 shadow-sm">
        <form onSubmit={handleSubmit} className="space-y-8">
          <section>
            <h2 className="mb-5 border-b border-gray-200 pb-3 text-lg font-bold text-gray-800">
              اطلاعات اصلی محصول
            </h2>

            <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
              <div className="md:col-span-2">
                <label className="mb-2 block text-sm font-medium text-gray-700">
                  عنوان محصول *
                </label>

                <input
                  type="text"
                  value={title}
                  onChange={(event) => setTitle(event.target.value)}
                  placeholder="عنوان محصول"
                  className="w-full rounded-xl border border-blue-200 bg-gray-50 px-4 py-3.5 text-sm outline-none transition hover:border-blue-300 hover:bg-white focus:border-blue-600 focus:bg-white focus:ring-2 focus:ring-blue-100"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">
                  عنوان انگلیسی
                </label>

                <input
                  type="text"
                  dir="ltr"
                  value={englishTitle}
                  onChange={(event) => setEnglishTitle(event.target.value)}
                  placeholder="English product title"
                  className="w-full rounded-xl border border-blue-200 bg-gray-50 px-4 py-3.5 text-sm outline-none transition hover:border-blue-300 hover:bg-white focus:border-blue-600 focus:bg-white focus:ring-2 focus:ring-blue-100"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">
                  برند *
                </label>

                <input
                  type="text"
                  value={brand}
                  onChange={(event) => setBrand(event.target.value)}
                  placeholder="نام برند"
                  className="w-full rounded-xl border border-blue-200 bg-gray-50 px-4 py-3.5 text-sm outline-none transition hover:border-blue-300 hover:bg-white focus:border-blue-600 focus:bg-white focus:ring-2 focus:ring-blue-100"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">
                  دسته‌بندی *
                </label>

                <input
                  type="text"
                  value={category}
                  onChange={(event) => setCategory(event.target.value)}
                  placeholder="دسته‌بندی محصول"
                  className="w-full rounded-xl border border-blue-200 bg-gray-50 px-4 py-3.5 text-sm outline-none transition hover:border-blue-300 hover:bg-white focus:border-blue-600 focus:bg-white focus:ring-2 focus:ring-blue-100"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">
                  لینک محصول *
                </label>

                <input
                  type="text"
                  dir="ltr"
                  value={url}
                  onChange={(event) => setUrl(event.target.value)}
                  placeholder="لینک محصول"
                  className="w-full rounded-xl border border-blue-200 bg-gray-50 px-4 py-3.5 text-sm outline-none transition hover:border-blue-300 hover:bg-white focus:border-blue-600 focus:bg-white focus:ring-2 focus:ring-blue-100"
                />
              </div>

              <div className="md:col-span-2">
                <label className="mb-2 block text-sm font-medium text-gray-700">
                  تصویر محصول *
                </label>

                <input
                  type="text"
                  dir="ltr"
                  value={image}
                  onChange={(event) => setImage(event.target.value)}
                  placeholder="آدرس تصویر محصول"
                  className="w-full rounded-xl border border-blue-200 bg-gray-50 px-4 py-3.5 text-sm outline-none transition hover:border-blue-300 hover:bg-white focus:border-blue-600 focus:bg-white focus:ring-2 focus:ring-blue-100"
                />

                {image && (
                  <div className="mt-4 flex min-h-48 items-center justify-center rounded-xl border border-gray-200 bg-gray-50 p-4">
                    <img
                      src={image}
                      alt={title || "Product"}
                      className="h-40 w-40 object-contain"
                    />
                  </div>
                )}
              </div>
            </div>
          </section>

          <section>
            <h2 className="mb-5 border-b border-gray-200 pb-3 text-lg font-bold text-gray-800">
              قیمت و موجودی
            </h2>

            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">
                  قیمت *
                </label>

                <input
                  type="number"
                  min="0"
                  value={price}
                  onChange={(event) => setPrice(event.target.value)}
                  placeholder="قیمت"
                  className="w-full rounded-xl border border-blue-200 bg-gray-50 px-4 py-3.5 text-sm outline-none transition hover:border-blue-300 hover:bg-white focus:border-blue-600 focus:bg-white focus:ring-2 focus:ring-blue-100"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">
                  قیمت قبلی
                </label>

                <input
                  type="number"
                  min="0"
                  value={oldPrice}
                  onChange={(event) => setOldPrice(event.target.value)}
                  placeholder="قیمت قبلی"
                  className="w-full rounded-xl border border-blue-200 bg-gray-50 px-4 py-3.5 text-sm outline-none transition hover:border-blue-300 hover:bg-white focus:border-blue-600 focus:bg-white focus:ring-2 focus:ring-blue-100"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">
                  درصد تخفیف
                </label>

                <input
                  type="number"
                  min="0"
                  max="100"
                  value={discount}
                  onChange={(event) => setDiscount(event.target.value)}
                  placeholder="مثلاً 20"
                  className="w-full rounded-xl border border-blue-200 bg-gray-50 px-4 py-3.5 text-sm outline-none transition hover:border-blue-300 hover:bg-white focus:border-blue-600 focus:bg-white focus:ring-2 focus:ring-blue-100"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">
                  موجودی *
                </label>

                <input
                  type="number"
                  min="0"
                  value={stock}
                  onChange={(event) => setStock(event.target.value)}
                  placeholder="تعداد موجودی"
                  className="w-full rounded-xl border border-blue-200 bg-gray-50 px-4 py-3.5 text-sm outline-none transition hover:border-blue-300 hover:bg-white focus:border-blue-600 focus:bg-white focus:ring-2 focus:ring-blue-100"
                />
              </div>
            </div>
          </section>

          <section>
            <h2 className="mb-5 border-b border-gray-200 pb-3 text-lg font-bold text-gray-800">
              فروشنده و گارانتی
            </h2>

            <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">
                  فروشنده *
                </label>

                <input
                  type="text"
                  value={seller}
                  onChange={(event) => setSeller(event.target.value)}
                  placeholder="نام فروشنده"
                  className="w-full rounded-xl border border-blue-200 bg-gray-50 px-4 py-3.5 text-sm outline-none transition hover:border-blue-300 hover:bg-white focus:border-blue-600 focus:bg-white focus:ring-2 focus:ring-blue-100"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">
                  گارانتی
                </label>

                <input
                  type="text"
                  value={warranty}
                  onChange={(event) => setWarranty(event.target.value)}
                  placeholder="نام گارانتی"
                  className="w-full rounded-xl border border-blue-200 bg-gray-50 px-4 py-3.5 text-sm outline-none transition hover:border-blue-300 hover:bg-white focus:border-blue-600 focus:bg-white focus:ring-2 focus:ring-blue-100"
                />
              </div>
            </div>
          </section>

          <section>
            <h2 className="mb-5 border-b border-gray-200 pb-3 text-lg font-bold text-gray-800">
              رنگ محصول
            </h2>

            <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">
                  نام رنگ
                </label>

                <input
                  type="text"
                  value={colorTitle}
                  onChange={(event) => setColorTitle(event.target.value)}
                  placeholder="مثلاً مشکی"
                  className="w-full rounded-xl border border-blue-200 bg-gray-50 px-4 py-3.5 text-sm outline-none transition hover:border-blue-300 hover:bg-white focus:border-blue-600 focus:bg-white focus:ring-2 focus:ring-blue-100"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">
                  کد رنگ
                </label>

                <div className="flex gap-3">
                  <input
                    type="color"
                    value={colorHex}
                    onChange={(event) => setColorHex(event.target.value)}
                    className="h-12 w-16 cursor-pointer rounded-lg border border-gray-200 bg-white p-1"
                  />

                  <input
                    type="text"
                    dir="ltr"
                    value={colorHex}
                    onChange={(event) => setColorHex(event.target.value)}
                    className="flex-1 rounded-xl border border-blue-200 bg-gray-50 px-4 py-3.5 text-sm outline-none transition focus:border-blue-600 focus:ring-2 focus:ring-blue-100"
                  />
                </div>
              </div>
            </div>
          </section>

          <section>
            <h2 className="mb-5 border-b border-gray-200 pb-3 text-lg font-bold text-gray-800">
              ارسال
            </h2>

            <div className="space-y-4">
              <div className="flex items-center justify-between rounded-xl border border-gray-200 bg-gray-50 p-4">
                <div>
                  <p className="text-sm font-medium text-gray-700">
                    امکان ارسال
                  </p>

                  <p className="mt-1 text-xs text-gray-500">
                    این محصول امکان ارسال دارد
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => setShippingAvailable((value) => !value)}
                  className={`relative h-7 w-12 rounded-full p-1 transition ${
                    shippingAvailable ? "bg-green-600" : "bg-gray-300"
                  }`}
                >
                  <span
                    className={`block h-5 w-5 rounded-full bg-white shadow-sm transition-transform ${
                      shippingAvailable ? "-translate-x-5" : "translate-x-0"
                    }`}
                  />
                </button>
              </div>

              <div className="flex items-center justify-between rounded-xl border border-gray-200 bg-gray-50 p-4">
                <div>
                  <p className="text-sm font-medium text-gray-700">
                    ارسال سریع
                  </p>

                  <p className="mt-1 text-xs text-gray-500">
                    این محصول دارای ارسال سریع است
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => setShippingFast((value) => !value)}
                  className={`relative h-7 w-12 rounded-full p-1 transition ${
                    shippingFast ? "bg-green-600" : "bg-gray-300"
                  }`}
                >
                  <span
                    className={`block h-5 w-5 rounded-full bg-white shadow-sm transition-transform ${
                      shippingFast ? "-translate-x-5" : "translate-x-0"
                    }`}
                  />
                </button>
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">
                  توضیحات ارسال
                </label>

                <textarea
                  value={shippingDescription}
                  onChange={(event) =>
                    setShippingDescription(event.target.value)
                  }
                  placeholder="توضیحات مربوط به ارسال"
                  rows={3}
                  className="w-full resize-none rounded-xl border border-blue-200 bg-gray-50 px-4 py-3.5 text-sm outline-none transition hover:border-blue-300 hover:bg-white focus:border-blue-600 focus:bg-white focus:ring-2 focus:ring-blue-100"
                />
              </div>
            </div>
          </section>

          <section>
            <h2 className="mb-5 border-b border-gray-200 pb-3 text-lg font-bold text-gray-800">
              وضعیت محصول
            </h2>

            <div className="space-y-4">
              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">
                  وضعیت
                </label>

                <select
                  value={status}
                  onChange={(event) => setStatus(event.target.value)}
                  className="w-full rounded-xl border border-blue-200 bg-gray-50 px-4 py-3.5 text-sm outline-none transition hover:border-blue-300 hover:bg-white focus:border-blue-600 focus:bg-white focus:ring-2 focus:ring-blue-100"
                >
                  <option value="active">فعال</option>
                  <option value="inactive">غیرفعال</option>
                </select>
              </div>

              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <div className="flex items-center justify-between rounded-xl border border-gray-200 bg-gray-50 p-4">
                  <div>
                    <p className="text-sm font-medium text-gray-700">
                      پیشنهاد ویژه
                    </p>

                    <p className="mt-1 text-xs text-gray-500">
                      محصول به عنوان پیشنهاد ویژه نمایش داده شود
                    </p>
                  </div>

                  <button
                    type="button"
                    onClick={() => setIsPromotion((value) => !value)}
                    className={`relative h-7 w-12 rounded-full p-1 transition ${
                      isPromotion ? "bg-green-600" : "bg-gray-300"
                    }`}
                  >
                    <span
                      className={`block h-5 w-5 rounded-full bg-white shadow-sm transition-transform ${
                        isPromotion ? "-translate-x-5" : "translate-x-0"
                      }`}
                    />
                  </button>
                </div>

                <div className="flex items-center justify-between rounded-xl border border-gray-200 bg-gray-50 p-4">
                  <div>
                    <p className="text-sm font-medium text-gray-700">
                      شگفت‌انگیز
                    </p>

                    <p className="mt-1 text-xs text-gray-500">
                      محصول در بخش شگفت‌انگیزها نمایش داده شود
                    </p>
                  </div>

                  <button
                    type="button"
                    onClick={() => setIsAmazing((value) => !value)}
                    className={`relative h-7 w-12 rounded-full p-1 transition ${
                      isAmazing ? "bg-green-600" : "bg-gray-300"
                    }`}
                  >
                    <span
                      className={`block h-5 w-5 rounded-full bg-white shadow-sm transition-transform ${
                        isAmazing ? "-translate-x-5" : "translate-x-0"
                      }`}
                    />
                  </button>
                </div>
              </div>
            </div>
          </section>

          <section>
            <h2 className="mb-5 border-b border-gray-200 pb-3 text-lg font-bold text-gray-800">
              امتیاز محصول
            </h2>

            <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">
                  امتیاز
                </label>

                <input
                  type="number"
                  min="0"
                  max="5"
                  step="0.1"
                  value={rating}
                  onChange={(event) => setRating(event.target.value)}
                  className="w-full rounded-xl border border-blue-200 bg-gray-50 px-4 py-3.5 text-sm outline-none transition focus:border-blue-600 focus:ring-2 focus:ring-blue-100"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">
                  تعداد امتیازها
                </label>

                <input
                  type="number"
                  min="0"
                  value={ratingCount}
                  onChange={(event) => setRatingCount(event.target.value)}
                  className="w-full rounded-xl border border-blue-200 bg-gray-50 px-4 py-3.5 text-sm outline-none transition focus:border-blue-600 focus:ring-2 focus:ring-blue-100"
                />
              </div>
            </div>
          </section>

          <div className="flex flex-col gap-3 border-t border-gray-200 pt-6 sm:flex-row sm:justify-end">
            <button
              type="button"
              onClick={() => navigate("/dashboard/products")}
              className="flex-1 rounded-lg bg-blue-600 px-4 py-3 text-sm font-medium text-white hover:bg-blue-700"
            >
              انصراف
            </button>

            <button
              type="submit"
              disabled={
                loading ||
                !title.trim() ||
                !brand.trim() ||
                !category.trim() ||
                !image.trim() ||
                !price.trim() ||
                !stock.trim() ||
                !seller.trim() ||
                !url.trim()
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
                "ایجاد محصول"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProductForm;
