import { useSelector } from "react-redux";
import { FaChevronUp } from "react-icons/fa";

import type { RootState } from "../../../Redux/store";

const TopSection = () => {
  const logo = useSelector((state: RootState) => state.footer.logo);

  return (
    <div className="footer_first_section my-5">
      <div className="footer_logo">
        {logo?.desktopSrc ? (
          <img
            className="footer_logo"
            src={`${import.meta.env.BASE_URL}${logo.desktopSrc}`}
            alt={logo.alt}
            title={logo.title}
          />
        ) : (
          <span className="text-red-500">Logo not found</span>
        )}
      </div>
      <div className="flex justify-center">
        <div className="backtoUp">
          <button
            type="button"
            onClick={() =>
              window.scrollTo({
                top: 0,
                behavior: "smooth",
              })
            }
            className="flex items-center justify-center relative grow text-gray-500"
          >
            <span className="hidden lg:block text-neutral-400 ml-2 text-sm">
              بازگشت به بالا
            </span>
            <span className="block lg:hidden text-neutral-700 ml-2 text-xs">
              رفتن به بالا
            </span>
            <FaChevronUp />
          </button>
        </div>
      </div>
    </div>
  );
};

export default TopSection;
