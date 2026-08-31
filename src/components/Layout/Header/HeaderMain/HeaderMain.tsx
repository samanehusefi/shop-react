import Logo from "./Logo/Logo";
import Search from "./Search/Search";
import Login from "./Login/Login";
import Cart from "./Cart/Cart";

const HeaderMain = () => {
  return (
    <div className="header-main w-full">
      <div className="flex w-full items-center gap-4 px-4" dir="rtl">
        <div className="shrink-0">
          <Logo />
        </div>
        <div className="flex-1">
          <Search />
        </div>
        <div className="shrink-0">
          <Login />
        </div>
        <div className="shrink-0">
          <Cart />
        </div>
      </div>
    </div>
  );
};

export default HeaderMain;
