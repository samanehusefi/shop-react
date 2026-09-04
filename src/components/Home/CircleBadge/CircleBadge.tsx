import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { IoClose } from "react-icons/io5";
import { HiOutlineDotsHorizontal } from "react-icons/hi";

import type { AppDispatch, RootState } from "../../../Redux/store";
import { getCircleBadge } from "../../../Redux/Home/CircleBadge/action";
import "./CircleBadge.css";

const CircleBadge = () => {
  const dispatch = useDispatch<AppDispatch>();

  const [isModalOpen, setIsModalOpen] = useState(false);

  const circleBadge = useSelector(
    (state: RootState) => state.circleBadge.circleBadge,
  );

  useEffect(() => {
    dispatch(getCircleBadge());
  }, [dispatch]);

  const visibleItems = circleBadge.slice(0, 9);

  return (
    <>
      <section className="mx-auto w-full max-w-350 px-4 py-6">
        <div className="rounded-2xl bg-white md:px-4 py-5 ">
          <div className="flex w-full gap-4 overflow-x-auto px-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden md:justify-between md:gap-4">
            {visibleItems.map((item) => (
              <a
                key={item.id}
                href={item.url}
                target="_blank"
                rel="noreferrer"
                className="flex w-[calc((100vw-6.5rem)/5.5)] min-w-[calc((100vw-6.5rem)/5.5)] shrink-0 flex-col items-center text-center sm:w-[70px] sm:min-w-[70px]"
              >
                <div className="mb-2 h-13 w-13 overflow-hidden rounded-full">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="h-full w-full object-cover"
                  />
                </div>

                <span className="line-clamp-2 text-[11px] leading-4 text-gray-700">
                  {item.title}
                </span>
              </a>
            ))}

            {circleBadge.length > 9 && (
              <button
                type="button"
                onClick={() => setIsModalOpen(true)}
                className="flex w-17.5 shrink-0 flex-col items-center text-center"
              >
                <div className="mb-2 flex h-13 w-13 items-center justify-center rounded-full border border-gray-300 bg-gray-50">
                  <HiOutlineDotsHorizontal className="text-xl text-gray-500" />
                </div>

                <span className="text-[11px] leading-4 text-gray-700">
                  بیشتر
                </span>
              </button>
            )}
          </div>
        </div>
      </section>

      {isModalOpen && (
        <div
          className="fixed inset-0 z-50 bg-black/50"
          onClick={() => setIsModalOpen(false)}
        >
          <div
            className="
          absolute inset-0
  w-full overflow-y-auto
  bg-white p-5
  animate-[slideUp_1.2s_ease-in-out]

  md:inset-auto
  md:left-1/2
  md:top-1/2
  md:max-h-[85vh]
  md:w-[90%]
  md:max-w-4xl
  md:-translate-x-1/2
  md:-translate-y-1/2
  md:rounded-2xl
  md:p-6
  md:animate-none
      "
            onClick={(event) => event.stopPropagation()}
          >
            <div className="mx-auto mb-5 h-1 w-10 rounded-full bg-gray-300 md:hidden" />

            <button
              type="button"
              onClick={() => setIsModalOpen(false)}
              className="
          absolute left-4 top-4
          flex h-9 w-9 items-center justify-center
          rounded-full bg-gray-100 text-gray-600
          hover:bg-gray-200
        "
            >
              <IoClose className="text-xl" />
            </button>

            <h2 className="mb-8 text-center text-lg font-bold text-gray-800">
              همه خدمات
            </h2>

            <div className="grid grid-cols-3 gap-6 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6">
              {circleBadge.map((item) => (
                <a
                  key={item.id}
                  href={item.url}
                  target="_blank"
                  rel="noreferrer"
                  className="flex flex-col items-center text-center"
                >
                  <div className="mb-2 h-[52px] w-[52px] overflow-hidden rounded-full">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="h-full w-full object-cover"
                    />
                  </div>

                  <span className="line-clamp-2 text-xs leading-5 text-gray-700">
                    {item.title}
                  </span>
                </a>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default CircleBadge;
