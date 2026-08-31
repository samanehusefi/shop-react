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
    <div ref={searchRef} className="relative flex-1 max-w-2xl">
      {/* Search Box */}

      <div
        className="
    flex
    items-center
    bg-gray-100
    rounded-full
    px-4
    h-12
    gap-3
  "
        dir="rtl"
      >
        {/* Search Icon */}
        <FiSearch className="text-gray-500 shrink-0" size={21} />

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
      flex-1
      bg-transparent
      outline-none
      text-sm
      text-gray-700
      placeholder:text-gray-400
    "
        />

        {/* Clear Button */}
        {searchText && (
          <button
            type="button"
            onClick={handleClear}
            className="
        flex
        items-center
        justify-center
        w-7
        h-7
        rounded-full
        text-gray-400
        hover:text-gray-700
        hover:bg-gray-200
        transition
        cursor-pointer
        shrink-0
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
            top-[52px]
            right-0
            left-0
            z-50
            bg-white
            rounded-xl
            border
            border-gray-200
            shadow-lg
            overflow-hidden
          "
        >
          {results.length > 0 ? (
            <div className="max-h-[420px] overflow-y-auto py-2">
              {/* Categories */}

              {categories.length > 0 && (
                <div>
                  <div
                    className="
                      px-4
                      py-2
                      text-xs
                      font-bold
                      text-gray-500
                    "
                  >
                    <span className=" border-b-amber-800 border-b-2 text-red-700">
                      دسته‌بندی‌ها
                    </span>
                  </div>

                  {categories.map((result, index) => (
                    <div
                      key={`category-${index}`}
                      className="
                          px-4
                          py-3
                          text-sm
                          text-gray-700
                          cursor-pointer
                          hover:bg-gray-50
                          transition
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
                      px-4
                      py-2
                      text-xs
                      font-bold
                      text-gray-500
                    "
                  >
                    <span className=" border-b-amber-800 border-b-2 text-red-700">
                      برندها
                    </span>
                  </div>

                  {brands.map((result, index) => (
                    <div
                      key={`brand-${index}`}
                      className="
                          px-4
                          py-3
                          text-sm
                          text-gray-700
                          cursor-pointer
                          hover:bg-gray-50
                          transition
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
                      px-4
                      py-2
                      text-xs
                      font-bold
                      text-gray-500
                      "
                  >
                    <span className=" border-b-amber-800 border-b-2 text-red-700">
                      محصولات
                    </span>
                  </div>

                  {products.map((result, index) => (
                    <div
                      key={`product-${index}`}
                      className="
                          px-4
                          py-3
                          text-sm
                          text-gray-700
                          cursor-pointer
                          hover:bg-gray-50
                          transition
                          truncate
                        "
                    >
                      {result.title}
                    </div>
                  ))}
                </div>
              )}
            </div>
          ) : (
            <div className="p-6 flex flex-col items-center justify-center text-center gap-2 md:p-0">
              <img
                src="/assets/icon/SearchNotFound.svg"
                className="w-60 h-60 opacity-70 md:p-0 md:mt-[-10%]"
                alt="not found"
              />

              <p className="text-md text-red-500 absolute top-[300px] md:top-[110px] font-bold">
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
