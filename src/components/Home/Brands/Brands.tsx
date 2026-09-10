import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { GiStarFormation } from "react-icons/gi";

import type { AppDispatch, RootState } from "../../../Redux/store";
import { getBrands } from "../../../Redux/Home/Brands/action";

const Brands = () => {
  const dispatch = useDispatch<AppDispatch>();
  const sliderRef = useRef<HTMLDivElement>(null);

  const brands = useSelector((state: RootState) => state.brands.brands);

  const [canNext, setCanNext] = useState(true);
  const [canPrev, setCanPrev] = useState(false);

  useEffect(() => {
    dispatch(getBrands());
  }, [dispatch]);

  const visibleBrands = brands.filter((brand) => brand.visibility);

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
  }, [visibleBrands.length]);

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

  if (!visibleBrands.length) {
    return null;
  }

  return (
    <section
      className="mx-auto w-full max-w-[1440px] px-0 py-4 sm:px-4 sm:py-6"
      dir="rtl"
    >
      <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white">
        <div className="flex items-center justify-between px-5 py-5 sm:px-6">
          <div className="flex items-center gap-2">
            <GiStarFormation
              size={24}
              strokeWidth={1.7}
              className="text-gray-700"
            />

            <h2 className="text-lg font-bold text-gray-800">
              محبوب‌ترین برندها
            </h2>
          </div>

          <div className="flex items-center gap-2" dir="ltr">
            <button
              type="button"
              onClick={handlePrev}
              disabled={!canPrev}
              className="flex h-8 w-8 items-center justify-center rounded-full border border-gray-300 bg-white text-gray-600 transition hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-30"
              aria-label="برندهای قبلی"
            >
              <FaChevronLeft size={11} />
            </button>

            <button
              type="button"
              onClick={handleNext}
              disabled={!canNext}
              className="flex h-8 w-8 items-center justify-center rounded-full border border-gray-300 bg-white text-gray-600 transition hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-30"
              aria-label="برندهای بعدی"
            >
              <FaChevronRight size={11} />
            </button>
          </div>
        </div>

        <div className="px-4 pb-5">
          <div
            ref={sliderRef}
            onScroll={updateButtons}
            className="overflow-x-auto scroll-smooth [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          >
            <div className="flex gap-2 sm:gap-3">
              {visibleBrands.map((brand) => (
                <a
                  key={brand.id}
                  href={brand.url}
                  target="_blank"
                  rel="noreferrer"
                  className="flex h-[116px] w-[84px] min-w-[84px] shrink-0 flex-col overflow-hidden rounded-lg border
                   border-gray-200 bg-white transition hover:shadow-sm sm:h-[125px] sm:w-[92px] sm:min-w-[92px]"
                >
                  <div className="flex h-[86px] w-full items-center justify-center p-2 sm:h-[94px]">
                    <img
                      src={brand.src}
                      alt={brand.title_fa}
                      title={brand.title_fa}
                      loading="lazy"
                      className="max-h-[68px] max-w-[72px] object-contain sm:max-h-[76px] sm:max-w-[80px]"
                    />
                  </div>

                  <div className="flex h-[30px] items-center justify-center border-t border-gray-100 bg-gray-50 px-1">
                    <span className="w-full truncate text-center text-[11px] leading-4 text-gray-700 sm:text-[12px]">
                      {brand.title_fa}
                    </span>
                  </div>
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Brands;
