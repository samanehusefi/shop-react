import { useEffect, useState } from "react";

import { useDispatch, useSelector } from "react-redux";

import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";

import type { AppDispatch, RootState } from "../../../Redux/store";

import { getCategoriesAction } from "../../../Redux/Home/Categories/action";

const Categories = () => {
  const dispatch = useDispatch<AppDispatch>();

  const { categories, loading, error } = useSelector(
    (state: RootState) => state.categories,
  );

  const [currentPage, setCurrentPage] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(18);

  useEffect(() => {
    dispatch(getCategoriesAction());
  }, [dispatch]);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) {
        setItemsPerPage(6);
      } else if (window.innerWidth < 768) {
        setItemsPerPage(8);
      } else if (window.innerWidth < 1024) {
        setItemsPerPage(12);
      } else {
        setItemsPerPage(16);
      }
    };

    handleResize();

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    setCurrentPage(0);
  }, [itemsPerPage]);

  if (loading) {
    return (
      <section className="w-full py-6" dir="rtl">
        <p className="text-center text-sm text-gray-500">
          <span className="loading loading-spinner loading-sm"></span>
        </p>
      </section>
    );
  }

  if (error) {
    return (
      <section className="w-full py-6" dir="rtl">
        <p className="text-center text-sm text-red-500">{error}</p>
      </section>
    );
  }

  const activeCategories = categories.filter(
    (category) => category.isActive && category.showHomepage,
  );

  const totalPages = Math.ceil(activeCategories.length / itemsPerPage);

  const handleNext = () => {
    if (currentPage < totalPages - 1) {
      setCurrentPage((prev) => prev + 1);
    }
  };

  const handlePrevious = () => {
    if (currentPage > 0) {
      setCurrentPage((prev) => prev - 1);
    }
  };

  return (
    <section className="mx-auto w-full max-w-[1440px] px-4 py-6" dir="rtl">
      <div className="w-full">
        <div className="mb-8 flex items-center justify-between">
          <h2 className="text-xl font-bold text-gray-900">دسته‌بندی‌ها</h2>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handleNext}
              disabled={currentPage >= totalPages - 1}
              className="flex h-9 w-9 items-center justify-center rounded-full border border-gray-200 bg-white text-gray-700 transition hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-40"
              aria-label="بعدی"
            >
              <IoIosArrowForward size={20} />
            </button>

            <button
              type="button"
              onClick={handlePrevious}
              disabled={currentPage === 0}
              className="flex h-9 w-9 items-center justify-center rounded-full border border-gray-200 bg-white text-gray-700 transition hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-40"
              aria-label="قبلی"
            >
              <IoIosArrowBack size={20} />
            </button>
          </div>
        </div>

        <div className="relative w-full overflow-hidden">
          <div
            className="flex transition-transform duration-500 ease-in-out"
            style={{
              transform: `translateX(${currentPage * 100}%)`,
            }}
          >
            {Array.from({ length: totalPages }).map((_, pageIndex) => {
              const startIndex = pageIndex * itemsPerPage;

              const pageCategories = activeCategories.slice(
                startIndex,
                startIndex + itemsPerPage,
              );

              return (
                <div key={pageIndex} className="w-full shrink-0">
                  <div
                    className="
                      grid
                      grid-flow-col
                      grid-rows-2
                      grid-cols-3
                      gap-x-4
                      gap-y-8
                      sm:grid-cols-4
                      sm:gap-x-6
                      md:grid-cols-6
                      md:gap-x-8
                      lg:grid-cols-8
                    "
                  >
                    {pageCategories.map((category) => (
                      <a
                        key={category.id}
                        href={category.url}
                        className="flex min-w-0 flex-col items-center gap-3"
                      >
                        <div
                          className="
                            h-[80px]
                            w-[80px]
                            overflow-hidden
                            rounded-full
                            border
                            border-gray-100
                            bg-gray-50
                            sm:h-[90px]
                            sm:w-[90px]
                            md:h-[100px]
                            md:w-[100px]
                            lg:h-[110px]
                            lg:w-[110px]
                          "
                        >
                          <img
                            src={category.image}
                            alt={category.title}
                            title={category.title}
                            className="h-full w-full object-cover"
                            loading="lazy"
                          />
                        </div>

                        <span className="line-clamp-2 text-center text-xs leading-5 text-gray-800 sm:text-sm">
                          {category.title}
                        </span>
                      </a>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Categories;
