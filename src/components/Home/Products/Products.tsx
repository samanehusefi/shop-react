import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { Link } from "react-router-dom";

import type { AppDispatch, RootState } from "../../../Redux/store";
import { getProducts } from "../../../Redux/Home/Products/action";

const Products = () => {
  const dispatch = useDispatch<AppDispatch>();
  const sliderRef = useRef<HTMLDivElement>(null);

  const products = useSelector((state: RootState) => state.products.products);

  const activeProducts = products.filter(
    (product) => product.status === "active",
  );

  const [canNext, setCanNext] = useState(true);
  const [canPrev, setCanPrev] = useState(false);

  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);

  const updateButtons = () => {
    const slider = sliderRef.current;

    if (!slider) return;

    const maxScroll = slider.scrollWidth - slider.clientWidth;

    setCanPrev(Math.abs(slider.scrollLeft) > 1);
    setCanNext(Math.abs(slider.scrollLeft) < maxScroll - 1);
  };

  useEffect(() => {
    updateButtons();

    const slider = sliderRef.current;

    if (!slider) return;

    const resizeObserver = new ResizeObserver(() => {
      updateButtons();
    });

    resizeObserver.observe(slider);

    return () => {
      resizeObserver.disconnect();
    };
  }, [activeProducts.length]);

  const handleNext = () => {
    const slider = sliderRef.current;

    if (!slider) return;

    slider.scrollBy({
      left: -slider.clientWidth,
      behavior: "smooth",
    });
  };

  const handlePrev = () => {
    const slider = sliderRef.current;

    if (!slider) return;

    slider.scrollBy({
      left: slider.clientWidth,
      behavior: "smooth",
    });
  };

  if (!activeProducts.length) {
    return null;
  }

  return (
    <section
      className="mx-auto w-full max-w-[1440px] px-2 py-3 sm:px-4 sm:py-5"
      dir="rtl"
    >
      <div className="overflow-hidden rounded-xl border border-gray-200 bg-white sm:rounded-2xl">
        <div className="flex items-center justify-between gap-3 px-3 py-4 sm:px-5 sm:py-5 md:px-6">
          <div className="min-w-0">
            <h2 className="truncate text-base font-bold text-gray-800 sm:text-lg">
              گوشی موبایل
            </h2>

            <p className="mt-1 text-xs text-gray-500 sm:text-sm">
              بر اساس سلیقه شما
            </p>
          </div>

          <div
            className="flex shrink-0 items-center gap-1.5 sm:gap-2"
            dir="ltr"
          >
            <button
              type="button"
              onClick={handlePrev}
              disabled={!canPrev}
              className="flex h-7 w-7 items-center justify-center rounded-full border border-gray-300 bg-white text-gray-600 transition hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-30 sm:h-8 sm:w-8"
              aria-label="محصولات قبلی"
            >
              <FaChevronLeft size={10} />
            </button>

            <button
              type="button"
              onClick={handleNext}
              disabled={!canNext}
              className="flex h-7 w-7 items-center justify-center rounded-full border border-gray-300 bg-white text-gray-600 transition hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-30 sm:h-8 sm:w-8"
              aria-label="محصولات بعدی"
            >
              <FaChevronRight size={10} />
            </button>
          </div>
        </div>

        <div className="px-2 pb-4 sm:px-4 sm:pb-5">
          <div
            ref={sliderRef}
            onScroll={updateButtons}
            className="overflow-x-auto scroll-smooth [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          >
            <div className="flex gap-2.5 sm:gap-3">
              {activeProducts.map((product) => {
                const hasDiscount =
                  product.discount > 0 && product.old_price > product.price;

                const slug = product.english_title
                  .trim()
                  .toLowerCase()
                  .replace(/\s+/g, "-")
                  .replace(/[^a-z0-9-]/g, "")
                  .replace(/-+/g, "-");

                return (
                  <Link
                    key={product.id}
                    to={`/product/d/${product.id}/${slug}`}
                    className="group flex h-[310px] w-[155px] min-w-[155px] shrink-0 flex-col overflow-hidden rounded-lg border border-gray-200 bg-white transition hover:shadow-sm sm:h-[330px] sm:w-[180px] sm:min-w-[180px] md:h-[340px] md:w-[205px] md:min-w-[205px]"
                  >
                    <div className="relative flex h-[155px] w-full items-center justify-center p-2.5 sm:h-[180px] sm:p-3 md:h-[205px]">
                      <img
                        src={product.image}
                        alt={product.title}
                        title={product.title}
                        loading="lazy"
                        className="h-full w-full object-contain transition duration-300 group-hover:scale-105"
                      />

                      {hasDiscount && (
                        <span className="absolute bottom-2 left-2 rounded-full bg-red-600 px-1.5 py-0.5 text-[10px] font-bold text-white sm:px-2 sm:py-1 sm:text-xs">
                          {product.discount}٪
                        </span>
                      )}
                    </div>

                    <div className="flex flex-1 flex-col border-t border-gray-100 bg-gray-50 px-2 py-2.5 sm:px-3 sm:py-3">
                      <h3 className="line-clamp-2 min-h-[42px] text-xs leading-5 text-gray-700 sm:min-h-[48px] sm:text-sm sm:leading-6">
                        {product.title}
                      </h3>

                      <div className="mt-auto">
                        {hasDiscount && (
                          <div className="mb-1 flex justify-end">
                            <span className="text-[10px] text-gray-400 line-through sm:text-xs">
                              {product.old_price.toLocaleString("fa-IR")}
                            </span>

                            <span className="text-[9px] text-gray-500 sm:text-[10px]">
                              تومان
                            </span>
                          </div>
                        )}

                        <div className="flex items-center justify-end gap-1">
                          <span className="text-sm font-bold text-gray-900 sm:text-base md:text-lg">
                            {product.price.toLocaleString("fa-IR")}
                          </span>

                          <span className="text-[9px] text-gray-500 sm:text-[10px]">
                            تومان
                          </span>
                        </div>
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Products;
