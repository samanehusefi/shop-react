import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { setSearchText } from "../../../../../Redux/Header/Search/action";
import { getShopData } from "../../../../../Api/api";

import type { ISearchResult } from "../../../../../Types/Header/ISearchResult";

import { FiSearch } from "react-icons/fi";

const Search = () => {
  const dispatch = useDispatch();

  const searchText = useSelector(
    (state: { search: { text: string } }) => state.search.text,
  );

  const [results, setResults] = useState<ISearchResult[]>([]);
  const [isOpen, setIsOpen] = useState(false);

  const searchRef = useRef<HTMLDivElement>(null);

  // Search
  useEffect(() => {
    if (searchText.trim().length < 2) {
      setResults([]);
      return;
    }

    const search = async () => {
      try {
        const data = await getShopData();

        const searchValue = searchText.trim().toLowerCase();

        // Products
        const incredibleResults: ISearchResult[] = data.incredible
          .filter((item: any) => item.title.toLowerCase().includes(searchValue))
          .map((item: any) => ({
            title: item.title,
            type: "product",
          }));

        // Categories
        const groupingResults: ISearchResult[] = data.grouping
          .filter((item: any) => item.title.toLowerCase().includes(searchValue))
          .map((item: any) => ({
            title: item.title,
            type: "category",
          }));

        // Brands
        const brandResults: ISearchResult[] = data.brands
          .filter((item: any) => item.title.toLowerCase().includes(searchValue))
          .map((item: any) => ({
            title: item.title,
            type: "brand",
          }));

        setResults([...groupingResults, ...brandResults, ...incredibleResults]);
      } catch (error) {
        console.error("Search error:", error);
        setResults([]);
      }
    };

    search();
  }, [searchText]);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        searchRef.current &&
        !searchRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;

    dispatch(setSearchText(value));

    if (value.trim().length >= 2) {
      setIsOpen(true);
    } else {
      setIsOpen(false);
    }
  };

  // Clear Search
  const handleClear = () => {
    dispatch(setSearchText(""));
    setResults([]);
    setIsOpen(false);
  };

  const categories = results
    .filter((result) => result.type === "category")
    .slice(0, 3);

  const brands = results
    .filter((result) => result.type === "brand")
    .slice(0, 3);

  const products = results
    .filter((result) => result.type === "product")
    .slice(0, 5);

  const showDropdown = isOpen && searchText.trim().length >= 2;

  return (
    <div
      ref={searchRef}
      className="
        relative
        w-full
        flex-1
        md:max-w-xl
        lg:max-w-2xl
      "
    >
      {/* Search Box */}

      <div
        className="
          flex
          h-10
          w-full
          items-center
          gap-2
          rounded-full
          bg-gray-100
          px-3

          sm:h-11
          sm:gap-3
          sm:px-4

          md:h-12
        "
        dir="rtl"
      >
        {/* Search Icon */}

        <FiSearch className="shrink-0 text-gray-500" size={19} />

        <input
          type="text"
          value={searchText}
          onChange={handleChange}
          onFocus={() => {
            if (searchText.trim().length >= 2) {
              setIsOpen(true);
            }
          }}
          placeholder="جستجو"
          className="
            min-w-0
            flex-1
            bg-transparent
            text-xs
            text-gray-700
            outline-none
            placeholder:text-gray-400

            sm:text-sm
          "
        />

        {/* Clear Button */}

        {searchText && (
          <button
            type="button"
            onClick={handleClear}
            className="
              flex
              h-6
              w-6
              shrink-0
              cursor-pointer
              items-center
              justify-center
              rounded-full
              text-base
              leading-none
              text-gray-400
              transition
              hover:bg-gray-200
              hover:text-gray-700

              sm:h-7
              sm:w-7
            "
            aria-label="پاک کردن جستجو"
          >
            ×
          </button>
        )}
      </div>

      {/* Dropdown */}

      {showDropdown && (
        <div
          dir="rtl"
          className="
            absolute
            top-[46px]
            right-0
            left-0
            z-50
            overflow-hidden
            rounded-xl
            border
            border-gray-200
            bg-white
            shadow-lg

            sm:top-[50px]

            md:top-[54px]
          "
        >
          {results.length > 0 ? (
            <div className="max-h-[60vh] overflow-y-auto py-1 sm:py-2">
              {/* Categories */}

              {categories.length > 0 && (
                <div>
                  <div
                    className="
                      px-3
                      py-2
                      text-[11px]
                      font-bold
                      text-gray-500

                      sm:px-4
                      sm:text-xs
                    "
                  >
                    <span className="border-b-2 border-b-amber-800 text-red-700">
                      دسته‌بندی‌ها
                    </span>
                  </div>

                  {categories.map((result, index) => (
                    <div
                      key={`category-${index}`}
                      className="
                        cursor-pointer
                        px-3
                        py-2.5
                        text-xs
                        text-gray-700
                        transition
                        hover:bg-gray-50

                        sm:px-4
                        sm:py-3
                        sm:text-sm
                      "
                    >
                      {result.title}
                    </div>
                  ))}
                </div>
              )}

              {/* Brands */}

              {brands.length > 0 && (
                <div className="border-t border-gray-100">
                  <div
                    className="
                      px-3
                      py-2
                      text-[11px]
                      font-bold
                      text-gray-500

                      sm:px-4
                      sm:text-xs
                    "
                  >
                    <span className="border-b-2 border-b-amber-800 text-red-700">
                      برندها
                    </span>
                  </div>

                  {brands.map((result, index) => (
                    <div
                      key={`brand-${index}`}
                      className="
                        cursor-pointer
                        px-3
                        py-2.5
                        text-xs
                        text-gray-700
                        transition
                        hover:bg-gray-50

                        sm:px-4
                        sm:py-3
                        sm:text-sm
                      "
                    >
                      {result.title}
                    </div>
                  ))}
                </div>
              )}

              {/* Products */}

              {products.length > 0 && (
                <div className="border-t border-gray-100">
                  <div
                    className="
                      px-3
                      py-2
                      text-[11px]
                      font-bold
                      text-gray-500

                      sm:px-4
                      sm:text-xs
                    "
                  >
                    <span className="border-b-2 border-b-amber-800 text-red-700">
                      محصولات
                    </span>
                  </div>

                  {products.map((result, index) => (
                    <div
                      key={`product-${index}`}
                      className="
                        cursor-pointer
                        truncate
                        px-3
                        py-2.5
                        text-xs
                        text-gray-700
                        transition
                        hover:bg-gray-50

                        sm:px-4
                        sm:py-3
                        sm:text-sm
                      "
                    >
                      {result.title}
                    </div>
                  ))}
                </div>
              )}
            </div>
          ) : (
            /* Not Found */

            <div
              className="
                flex
                min-h-[260px]
                flex-col
                items-center
                justify-center
                gap-2
                p-4
                text-center

                sm:min-h-[300px]
                sm:p-6
              "
            >
              <img
                src="/assets/icon/SearchNotFound.svg"
                className="
                  h-40
                  w-40
                  opacity-70

                  sm:h-52
                  sm:w-52

                  md:h-60
                  md:w-60
                "
                alt="نتیجه‌ای یافت نشد"
              />

              <p
                className="
                  text-xs
                  font-bold
                  text-red-500

                  sm:text-sm
                "
              >
                نتیجه‌ای یافت نشد
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Search;
