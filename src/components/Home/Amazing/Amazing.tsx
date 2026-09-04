import { useEffect, useRef, useState } from "react";

import { useDispatch, useSelector } from "react-redux";

import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";

import type { AppDispatch, RootState } from "../../../Redux/store";

import { getAmazing } from "../../../Redux/Home/Amazing/action";

const Amazing = () => {
  const dispatch = useDispatch<AppDispatch>();

  const amazing = useSelector((state: RootState) => state.amazing.amazing);

  const sliderRef = useRef<HTMLDivElement>(null);

  const [timeLeft, setTimeLeft] = useState(0);

  const [showLeftButton, setShowLeftButton] = useState(true);

  const [showRightButton, setShowRightButton] = useState(false);

  useEffect(() => {
    dispatch(getAmazing());
  }, [dispatch]);

  useEffect(() => {
    if (!amazing.length) return;

    setTimeLeft(amazing[0].timer);
  }, [amazing]);

  useEffect(() => {
    if (timeLeft <= 0) return;

    const interval = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          return 0;
        }

        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [timeLeft]);

  const hours = Math.floor(timeLeft / 3600);

  const minutes = Math.floor((timeLeft % 3600) / 60);

  const seconds = timeLeft % 60;

  const handleLeftButton = () => {
    const slider = sliderRef.current;

    if (!slider) return;

    slider.scrollBy({
      left: -700,
      behavior: "smooth",
    });

    setShowLeftButton(true);
    setShowRightButton(true);
  };

  const handleRightButton = () => {
    const slider = sliderRef.current;

    if (!slider) return;

    slider.scrollBy({
      left: 700,
      behavior: "smooth",
    });

    setShowLeftButton(true);
    setShowRightButton(true);
  };

  return (
    <section className="mx-auto w-full max-w-[1400px] px-0 py-2 sm:px-4 sm:py-4">
      <div className="overflow-hidden bg-[#ef394e] sm:rounded-[20px] sm:p-2 md:p-3">
        <div className="flex flex-col md:flex-row">
          <div className="flex w-full items-center justify-between px-3 py-2 text-white md:hidden">
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-0.5" dir="rtl">
                <div className="flex items-center gap-1 text-base font-black">
                  <span>شگفت‌انگیز</span>
                  <span className="text-xl">%</span>
                </div>
                <div className="flex h-6 min-w-6 items-center justify-center rounded bg-white px-1 text-[11px] font-bold text-gray-800">
                  {String(seconds).padStart(2, "0")}
                </div>

                <span className="text-xs font-bold">:</span>

                <div className="flex h-6 min-w-6 items-center justify-center rounded bg-white px-1 text-[11px] font-bold text-gray-800">
                  {String(minutes).padStart(2, "0")}
                </div>

                <span className="text-xs font-bold">:</span>

                <div className="flex h-6 min-w-6 items-center justify-center rounded bg-white px-1 text-[11px] font-bold text-gray-800">
                  {String(hours).padStart(2, "0")}
                </div>
              </div>
            </div>
            <button
              type="button"
              className="flex items-center gap-1 text-[11px] font-bold"
            >
              همه
              <IoIosArrowBack className="text-sm" />
            </button>
          </div>

          <div className="hidden w-[125px] min-w-[125px] flex-col items-center justify-center px-1 text-white sm:w-[155px] sm:min-w-[155px] md:flex md:w-[190px] md:min-w-[190px]">
            <div className="text-[58px] font-black leading-none sm:text-[70px]">
              %
            </div>

            <div className="mt-1 text-sm font-bold sm:text-base md:text-lg">
              شگفت‌انگیز
            </div>

            <div className="mt-4 flex items-center gap-1" dir="ltr">
              <div className="flex h-7 min-w-7 items-center justify-center rounded bg-white px-1 text-sm font-bold text-gray-800 sm:h-8 sm:min-w-8 sm:text-base">
                {String(seconds).padStart(2, "0")}
              </div>

              <span className="font-bold">:</span>

              <div className="flex h-7 min-w-7 items-center justify-center rounded bg-white px-1 text-sm font-bold text-gray-800 sm:h-8 sm:min-w-8 sm:text-base">
                {String(minutes).padStart(2, "0")}
              </div>

              <span className="font-bold">:</span>

              <div className="flex h-7 min-w-7 items-center justify-center rounded bg-white px-1 text-sm font-bold text-gray-800 sm:h-8 sm:min-w-8 sm:text-base">
                {String(hours).padStart(2, "0")}
              </div>
            </div>

            <button
              type="button"
              className="mt-4 flex items-center gap-1 rounded-lg bg-white px-3 py-2 text-[10px] font-bold text-gray-700 sm:px-4 sm:text-xs"
            >
              مشاهده همه
              <IoIosArrowBack />
            </button>
          </div>

          <div className="relative min-w-0 flex-1 bg-[#ef394e] px-0 pb-1 pt-1">
            {showLeftButton && (
              <button
                type="button"
                onClick={handleLeftButton}
                className="absolute left-1 top-1/2 z-20 hidden h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-white text-gray-600 shadow-md transition hover:bg-gray-100 sm:h-10 sm:w-10 md:flex"
              >
                <IoIosArrowBack className="text-xl" />
              </button>
            )}

            {showRightButton && (
              <button
                type="button"
                onClick={handleRightButton}
                className="absolute right-1 top-1/2 z-20 hidden h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-white text-gray-600 shadow-md transition hover:bg-gray-100 sm:h-10 sm:w-10 md:flex"
              >
                <IoIosArrowForward className="text-xl" />
              </button>
            )}

            <div
              ref={sliderRef}
              className="flex gap-1 overflow-x-auto bg-[#ef394e] 
              [scrollbar-width:none] [&::-webkit-scrollbar]:hidden
              my-0.5 mr-2 md:my-0 md:mr-0
              "
              dir="rtl"
            >
              {amazing.map((item) => (
                <a
                  key={item.id}
                  href={item.url}
                  className="w-1/3 min-w-1/3 bg-white p-2 first:rounded-r-2xl last:rounded-l-2xl sm:w-[120px] sm:min-w-[120px] sm:p-3 md:w-[130px] md:min-w-[130px] lg:w-[170px] lg:min-w-[170px]"
                >
                  <div className="mb-2 aspect-square overflow-hidden sm:mb-3">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="h-full w-full object-contain"
                    />
                  </div>

                  <h3 className="line-clamp-2 min-h-[38px] text-[10px] leading-5 text-gray-700 sm:min-h-[44px] sm:text-xs sm:leading-6">
                    {item.title}
                  </h3>

                  <div className="mt-1 flex items-center justify-between gap-1 sm:mt-3">
                    <span className="rounded-full bg-[#ef394e] px-1.5 py-0.5 text-[8px] font-bold text-white sm:px-2 sm:text-[10px]">
                      {item.price.discount}٪
                    </span>

                    <span className="truncate text-[8px] text-gray-400 line-through sm:text-[10px]">
                      {item.price.original.toLocaleString()}
                    </span>
                  </div>

                  <div className="mt-1 flex items-center justify-end gap-1 text-left text-[10px] font-bold text-gray-800 sm:mt-2 sm:text-sm">
                    <span>{item.price.selling.toLocaleString()}</span>

                    <span className="text-[8px] font-normal sm:text-[9px]">
                      تومان
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

export default Amazing;
