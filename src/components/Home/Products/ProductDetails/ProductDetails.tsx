import { useEffect, useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  FaChevronLeft,
  FaChevronRight,
  FaCheck,
  FaShoppingCart,
  FaShieldAlt,
  FaStar,
  FaStore,
  FaTruck,
  FaBoxOpen,
  FaHeart,
  FaShareAlt,
} from "react-icons/fa";

import type { AppDispatch, RootState } from "../../../../Redux/store";
import { getProducts } from "../../../../Redux/Home/Products/action";

const ProductDetailsSkeleton = () => {
  return (
    <main
      className="min-h-screen bg-[#f7f7f7] px-3 py-4 sm:px-5 lg:px-8"
      dir="rtl"
    >
      <div className="mx-auto max-w-[1440px]">
        <div className="mb-4 h-5 w-64 animate-pulse rounded bg-gray-200" />

        <div className="grid gap-4 lg:grid-cols-[1fr_1.1fr]">
          <div className="rounded-2xl bg-white p-4">
            <div className="flex min-h-[380px] animate-pulse items-center justify-center rounded-xl bg-gray-100 sm:min-h-[500px]">
              <div className="h-64 w-64 rounded-xl bg-gray-200" />
            </div>

            <div className="mt-4 flex gap-2">
              {[1, 2, 3].map((item) => (
                <div
                  key={item}
                  className="h-16 w-16 animate-pulse rounded-lg bg-gray-200"
                />
              ))}
            </div>
          </div>

          <div className="space-y-4 rounded-2xl bg-white p-5 sm:p-7">
            <div className="h-5 w-24 animate-pulse rounded bg-gray-200" />
            <div className="h-8 w-4/5 animate-pulse rounded bg-gray-200" />
            <div className="h-5 w-2/3 animate-pulse rounded bg-gray-200" />
            <div className="h-20 w-full animate-pulse rounded bg-gray-100" />

            <div className="grid gap-3 sm:grid-cols-2">
              {[1, 2, 3, 4].map((item) => (
                <div
                  key={item}
                  className="h-14 animate-pulse rounded-xl bg-gray-100"
                />
              ))}
            </div>

            <div className="h-40 animate-pulse rounded-2xl bg-gray-100" />
          </div>
        </div>
      </div>
    </main>
  );
};

const ProductDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch<AppDispatch>();

  const products = useSelector((state: RootState) => state.products.products);

  const loading = useSelector((state: RootState) => state.products.loading);

  const error = useSelector((state: RootState) => state.products.error);

  const [selectedImage, setSelectedImage] = useState(0);
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "instant",
    });

    if (!products.length) {
      dispatch(getProducts());
    }
  }, [dispatch, products.length]);

  const product = useMemo(
    () => products.find((item) => String(item.id) === String(id)),
    [products, id],
  );

  useEffect(() => {
    setSelectedImage(0);
  }, [id]);

  useEffect(() => {
    if (!product) return;

    const favorites = JSON.parse(
      localStorage.getItem("favoriteProducts") || "[]",
    ) as number[];

    setIsFavorite(favorites.includes(product.id));
  }, [product]);

  if (loading || !products.length) {
    return <ProductDetailsSkeleton />;
  }

  if (error) {
    return (
      <main
        className="flex min-h-[500px] items-center justify-center bg-[#f7f7f7] px-4"
        dir="rtl"
      >
        <div className="w-full max-w-md rounded-2xl bg-white p-8 text-center shadow-sm">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-red-50">
            <FaBoxOpen className="text-2xl text-red-500" />
          </div>

          <h1 className="mt-5 text-lg font-bold text-gray-800">
            دریافت اطلاعات محصول با خطا مواجه شد
          </h1>

          <p className="mt-2 text-sm text-gray-500">لطفاً دوباره تلاش کنید.</p>

          <button
            type="button"
            onClick={() => dispatch(getProducts())}
            className="mt-6 rounded-xl bg-red-600 px-7 py-3 text-sm font-bold text-white transition hover:bg-red-700"
          >
            تلاش مجدد
          </button>
        </div>
      </main>
    );
  }

  if (!product) {
    return (
      <main
        className="flex min-h-[500px] flex-col items-center justify-center bg-[#f7f7f7] px-4 text-center"
        dir="rtl"
      >
        <div className="flex h-20 w-20 items-center justify-center rounded-full bg-white shadow-sm">
          <FaShoppingCart className="text-3xl text-gray-300" />
        </div>

        <h1 className="mt-5 text-xl font-bold text-gray-800">محصول پیدا نشد</h1>

        <p className="mt-2 text-sm text-gray-500">
          محصول موردنظر وجود ندارد یا حذف شده است.
        </p>

        <Link
          to="/"
          className="mt-6 rounded-xl bg-red-600 px-7 py-3 text-sm font-bold text-white transition hover:bg-red-700"
        >
          بازگشت به صفحه اصلی
        </Link>
      </main>
    );
  }

  const productImages = product.image ? [product.image] : [];

  const hasDiscount =
    Number(product.discount) > 0 &&
    Number(product.old_price) > Number(product.price);

  const formattedPrice = Number(product.price).toLocaleString("fa-IR");

  const formattedOldPrice = Number(product.old_price).toLocaleString("fa-IR");

  const discount = Number(product.discount) || 0;

  const stockAvailable = Number(product.stock) > 0;

  const rating = Number(product.rating) || 0;

  const ratingCount = Number(product.rating_count) || 0;

  const statusText =
    product.status === "active"
      ? "موجود"
      : product.status === "inactive"
        ? "ناموجود"
        : product.status || "موجود";

  const handlePrevImage = () => {
    if (productImages.length <= 1) return;

    setSelectedImage((prev) =>
      prev === 0 ? productImages.length - 1 : prev - 1,
    );
  };

  const handleNextImage = () => {
    if (productImages.length <= 1) return;

    setSelectedImage((prev) =>
      prev === productImages.length - 1 ? 0 : prev + 1,
    );
  };

  const handleFavorite = () => {
    const favorites = JSON.parse(
      localStorage.getItem("favoriteProducts") || "[]",
    ) as number[];

    if (favorites.includes(product.id)) {
      const updatedFavorites = favorites.filter((item) => item !== product.id);

      localStorage.setItem(
        "favoriteProducts",
        JSON.stringify(updatedFavorites),
      );

      setIsFavorite(false);
    } else {
      const updatedFavorites = [...favorites, product.id];

      localStorage.setItem(
        "favoriteProducts",
        JSON.stringify(updatedFavorites),
      );

      setIsFavorite(true);
    }
  };

  return (
    <main
      className="min-h-screen bg-[#f7f7f7] px-2 py-3 sm:px-4 sm:py-5 lg:px-6 lg:py-6"
      dir="rtl"
    >
      <div className="mx-auto w-full max-w-[1440px]">
        <nav className="mb-4 flex items-center gap-2 overflow-hidden whitespace-nowrap text-xs text-gray-500 sm:text-sm">
          <Link to="/" className="shrink-0 transition hover:text-red-600">
            خانه
          </Link>

          <FaChevronLeft className="shrink-0 text-[9px] text-gray-400" />

          <Link
            to={`/category/${encodeURIComponent(product.category)}`}
            className="shrink-0 transition hover:text-red-600"
          >
            {product.category}
          </Link>

          <FaChevronLeft className="shrink-0 text-[9px] text-gray-400" />

          <span className="truncate text-gray-400">{product.title}</span>
        </nav>

        <section className="grid gap-4 lg:grid-cols-[1fr_1.15fr]">
          <div className="overflow-hidden rounded-2xl bg-white p-3 sm:p-5">
            <div className="relative flex min-h-[320px] items-center justify-center rounded-xl bg-white sm:min-h-[450px] lg:min-h-[520px]">
              <div className="absolute right-2 top-2 z-10 flex flex-col gap-2 sm:right-4 sm:top-4">
                <button
                  type="button"
                  onClick={handleFavorite}
                  className={`flex h-10 w-10 items-center justify-center rounded-full border bg-white shadow-sm transition ${
                    isFavorite
                      ? "border-red-100 text-red-600"
                      : "border-gray-100 text-gray-500 hover:text-red-600"
                  }`}
                  aria-label={
                    isFavorite ? "حذف از علاقه‌مندی" : "افزودن به علاقه‌مندی"
                  }
                  title={
                    isFavorite ? "حذف از علاقه‌مندی" : "افزودن به علاقه‌مندی"
                  }
                >
                  <FaHeart
                    className={`transition ${
                      isFavorite ? "scale-110 fill-current" : ""
                    }`}
                  />
                </button>

                <button
                  type="button"
                  onClick={async () => {
                    try {
                      if (navigator.share) {
                        await navigator.share({
                          title: product.title,
                          text: product.title,
                          url: window.location.href,
                        });
                      } else {
                        await navigator.clipboard.writeText(
                          window.location.href,
                        );
                        alert("لینک محصول کپی شد");
                      }
                    } catch (error) {
                      if ((error as Error).name !== "AbortError") {
                        console.error("خطا در اشتراک‌گذاری:", error);
                      }
                    }
                  }}
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-gray-100 bg-white text-gray-500 shadow-sm transition hover:text-red-600"
                  aria-label="اشتراک گذاری"
                  title="اشتراک گذاری"
                >
                  <FaShareAlt />
                </button>
              </div>

              {product.is_amazing && (
                <span className="absolute left-3 top-3 z-10 rounded-md bg-red-600 px-2.5 py-1 text-xs font-bold text-white sm:left-4 sm:top-4">
                  شگفت‌انگیز
                </span>
              )}

              {product.is_promotion && (
                <span className="absolute left-3 top-11 z-10 rounded-md bg-orange-500 px-2.5 py-1 text-xs font-bold text-white sm:left-4 sm:top-12">
                  پیشنهاد ویژه
                </span>
              )}

              {productImages.length > 1 && (
                <>
                  <button
                    type="button"
                    onClick={handlePrevImage}
                    className="absolute right-2 top-1/2 z-10 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-white text-gray-600 shadow-md transition hover:text-red-600 sm:right-4"
                    aria-label="تصویر قبلی"
                  >
                    <FaChevronRight />
                  </button>

                  <button
                    type="button"
                    onClick={handleNextImage}
                    className="absolute left-2 top-1/2 z-10 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-white text-gray-600 shadow-md transition hover:text-red-600 sm:left-4"
                    aria-label="تصویر بعدی"
                  >
                    <FaChevronLeft />
                  </button>
                </>
              )}

              {productImages.length > 0 ? (
                <img
                  src={productImages[selectedImage]}
                  alt={product.title}
                  className="max-h-[430px] max-w-full object-contain p-8 sm:p-10"
                />
              ) : (
                <div className="flex flex-col items-center justify-center text-gray-300">
                  <FaBoxOpen className="text-5xl" />
                  <span className="mt-3 text-sm">تصویر محصول موجود نیست</span>
                </div>
              )}
            </div>

            {productImages.length > 0 && (
              <div className="mt-4 flex justify-center gap-2 overflow-x-auto pb-1">
                {productImages.map((image, index) => (
                  <button
                    key={`${image}-${index}`}
                    type="button"
                    onClick={() => setSelectedImage(index)}
                    className={`h-16 w-16 shrink-0 overflow-hidden rounded-lg bg-white p-1 transition ${
                      selectedImage === index
                        ? "border-2 border-red-600"
                        : "border border-gray-200"
                    }`}
                  >
                    <img
                      src={image}
                      alt={`${product.title} ${index + 1}`}
                      className="h-full w-full object-contain"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          <div className="rounded-2xl bg-white p-4 sm:p-6 lg:p-7">
            <div className="border-b border-gray-100 pb-5">
              <div className="flex items-center justify-between gap-3">
                <span className="text-sm font-bold text-blue-600">
                  {product.brand}
                </span>

                {stockAvailable ? (
                  <span className="flex items-center gap-1.5 text-xs font-medium text-emerald-600">
                    <FaCheck />
                    موجود
                  </span>
                ) : (
                  <span className="text-xs font-medium text-red-500">
                    ناموجود
                  </span>
                )}
              </div>

              <h1 className="mt-3 text-lg font-bold leading-8 text-gray-900 sm:text-xl lg:text-2xl">
                {product.title}
              </h1>

              {product.english_title && (
                <p className="mt-2 text-xs leading-6 text-gray-400 sm:text-sm">
                  {product.english_title}
                </p>
              )}

              <div className="mt-4 flex flex-wrap items-center gap-4">
                <div className="flex items-center gap-1">
                  <FaStar className="text-sm text-yellow-400" />
                  <span className="text-sm font-bold text-gray-700">
                    {rating.toLocaleString("fa-IR")}
                  </span>
                </div>

                <span className="text-xs text-gray-400">
                  {ratingCount.toLocaleString("fa-IR")} امتیاز
                </span>

                <span className="text-xs text-gray-400">
                  دسته‌بندی: {product.category}
                </span>
              </div>
            </div>

            <div className="grid gap-3 border-b border-gray-100 py-5 sm:grid-cols-2">
              <div className="rounded-xl bg-gray-50 p-3">
                <span className="block text-xs text-gray-400">برند</span>
                <strong className="mt-1 block text-sm text-gray-700">
                  {product.brand || "نامشخص"}
                </strong>
              </div>

              <div className="rounded-xl bg-gray-50 p-3">
                <span className="block text-xs text-gray-400">گارانتی</span>
                <strong className="mt-1 block text-sm text-gray-700">
                  {product.warranty || "ندارد"}
                </strong>
              </div>

              <div className="rounded-xl bg-gray-50 p-3">
                <span className="block text-xs text-gray-400">وضعیت</span>
                <strong className="mt-1 block text-sm text-gray-700">
                  {statusText}
                </strong>
              </div>

              <div className="rounded-xl bg-gray-50 p-3">
                <span className="block text-xs text-gray-400">فروشنده</span>
                <strong className="mt-1 block text-sm text-gray-700">
                  {product.seller || "فروشنده نامشخص"}
                </strong>
              </div>
            </div>

            {product.color && (
              <div className="border-b border-gray-100 py-5">
                <div className="mb-3 flex items-center gap-2">
                  <span className="text-sm font-bold text-gray-800">رنگ:</span>

                  <span className="text-sm text-gray-600">
                    {product.color.title}
                  </span>
                </div>

                {product.color.hex && (
                  <div className="flex items-center gap-2">
                    <span
                      className="h-7 w-7 rounded-full border-2 border-white shadow ring-1 ring-gray-200"
                      style={{
                        backgroundColor: product.color.hex,
                      }}
                    />
                    <span className="text-xs text-gray-400">
                      {product.color.hex}
                    </span>
                  </div>
                )}
              </div>
            )}

            <div className="mt-5 rounded-2xl bg-[#fafafa] p-4 sm:p-5">
              <div className="mb-4 flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-red-500 shadow-sm">
                  <FaStore />
                </div>

                <div>
                  <p className="text-xs text-gray-400">فروشنده</p>

                  <p className="mt-1 text-sm font-bold text-gray-800">
                    {product.seller || "فروشنده رسمی"}
                  </p>
                </div>
              </div>

              <div className="grid gap-3 sm:grid-cols-2">
                <div className="flex items-center gap-2 text-xs text-gray-600">
                  <FaShieldAlt className="text-green-500" />
                  <span>{product.warranty || "ضمانت اصالت کالا"}</span>
                </div>

                <div className="flex items-center gap-2 text-xs text-gray-600">
                  <FaTruck className="text-blue-500" />
                  <span>{product.shipping?.description || "ارسال سریع"}</span>
                </div>

                <div className="flex items-center gap-2 text-xs text-gray-600">
                  <FaCheck className="text-green-500" />
                  <span>
                    {stockAvailable
                      ? `${product.stock.toLocaleString("fa-IR")} عدد موجود`
                      : "ناموجود"}
                  </span>
                </div>

                {product.shipping?.fast && (
                  <div className="flex items-center gap-2 text-xs font-medium text-blue-600">
                    <FaTruck />
                    ارسال سریع
                  </div>
                )}
              </div>
            </div>

            <div className="mt-5 rounded-2xl border border-gray-100 bg-white p-4 sm:p-5">
              {hasDiscount && (
                <div className="mb-3 flex items-center justify-between">
                  <span className="rounded-md bg-red-50 px-2 py-1 text-xs font-bold text-red-600">
                    {discount.toLocaleString("fa-IR")}٪ تخفیف
                  </span>

                  <span className="text-sm text-gray-400 line-through">
                    {formattedOldPrice} تومان
                  </span>
                </div>
              )}

              <div className="flex items-end justify-between gap-4">
                <div>
                  <span className="block text-xs text-gray-400">قیمت</span>

                  <div className="mt-1 flex items-end gap-1">
                    <strong className="text-2xl font-extrabold text-gray-900 sm:text-3xl">
                      {formattedPrice}
                    </strong>

                    <span className="pb-1 text-xs text-gray-500">تومان</span>
                  </div>
                </div>

                {!stockAvailable && (
                  <span className="text-sm font-bold text-red-500">
                    فعلاً موجود نیست
                  </span>
                )}
              </div>

              <button
                type="button"
                disabled={!stockAvailable}
                className="mt-5 flex w-full items-center justify-center gap-2 rounded-xl bg-red-600 px-5 py-3.5 text-sm font-bold text-white transition hover:bg-red-700 disabled:cursor-not-allowed disabled:bg-gray-300"
              >
                <FaShoppingCart />
                افزودن به سبد خرید
              </button>
            </div>
          </div>
        </section>

        <section className="mt-4 rounded-2xl bg-white p-4 sm:p-6">
          <h2 className="border-b border-gray-100 pb-4 text-base font-bold text-gray-900 sm:text-lg">
            درباره محصول
          </h2>

          <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <div className="flex items-center gap-3 rounded-xl bg-gray-50 p-4">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-white text-blue-600 shadow-sm">
                <FaShieldAlt />
              </div>

              <div>
                <span className="block text-xs text-gray-400">گارانتی</span>

                <strong className="mt-1 block text-sm text-gray-700">
                  {product.warranty || "بدون گارانتی"}
                </strong>
              </div>
            </div>

            <div className="flex items-center gap-3 rounded-xl bg-gray-50 p-4">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-white text-blue-600 shadow-sm">
                <FaTruck />
              </div>

              <div>
                <span className="block text-xs text-gray-400">ارسال</span>

                <strong className="mt-1 block text-sm text-gray-700">
                  {product.shipping?.description || "ارسال معمولی"}
                </strong>
              </div>
            </div>

            <div className="flex items-center gap-3 rounded-xl bg-gray-50 p-4">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-white text-green-600 shadow-sm">
                <FaCheck />
              </div>

              <div>
                <span className="block text-xs text-gray-400">
                  وضعیت موجودی
                </span>

                <strong className="mt-1 block text-sm text-gray-700">
                  {stockAvailable
                    ? `${product.stock.toLocaleString("fa-IR")} عدد`
                    : "ناموجود"}
                </strong>
              </div>
            </div>

            <div className="flex items-center gap-3 rounded-xl bg-gray-50 p-4">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-white text-yellow-500 shadow-sm">
                <FaStar />
              </div>

              <div>
                <span className="block text-xs text-gray-400">
                  امتیاز کاربران
                </span>

                <strong className="mt-1 block text-sm text-gray-700">
                  {rating.toLocaleString("fa-IR")} از ۵
                </strong>
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
};

export default ProductDetails;
