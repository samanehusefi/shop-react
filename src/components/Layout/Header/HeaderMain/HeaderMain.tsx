import Logo from "./Logo/Logo";
import Search from "./Search/Search";
import Login from "./Login/Login";
import Cart from "./Cart/Cart";
import { PiBellSimpleBold } from "react-icons/pi";

const HeaderMain = () => {
  return (
    <div className="header-main w-full">
      <div className="w-full px-3 py-3 md:px-4 md:py-4" dir="rtl">
        <div className="flex w-full items-center gap-3 md:gap-4">
          <div className="shrink-0">
            <Logo />
          </div>

          <div className="hidden flex-1 md:block">
            <Search />
          </div>

          <div className="mr-auto flex shrink-0 items-center gap-1 md:mr-0 md:gap-3">
            <button
              type="button"
              className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-lg text-gray-700 transition hover:bg-gray-100"
            >
              <PiBellSimpleBold size={23} />
            </button>

            <div className="shrink-0">
              <Login />
            </div>

            <div className="border-r border-gray-200 pr-2 md:mr-2 md:pr-4">
              <Cart />
            </div>
          </div>
        </div>

        <div className="mt-3 w-full md:hidden">
          <Search />
        </div>
      </div>
    </div>
  );
};

export default HeaderMain;
