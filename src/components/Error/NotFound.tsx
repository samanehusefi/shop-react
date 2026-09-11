import { Link } from "react-router-dom";
import { FaArrowRight, FaHome, FaSearch } from "react-icons/fa";

const NotFound = () => {
  return (
    <main
      dir="rtl"
      className="flex min-h-screen w-full items-center justify-center bg-[#f7f7f7] px-5"
    >
      <div className="w-full max-w-lg text-center">
        <div className="relative mx-auto flex h-40 w-40 items-center justify-center">
          <div className="absolute inset-0 rounded-full bg-red-100" />

          <div className="relative flex h-32 w-32 items-center justify-center rounded-full bg-white shadow-lg">
            <span className="text-5xl font-black tracking-tight text-red-600">
              404
            </span>
          </div>
        </div>

        <h1 className="mt-8 text-2xl font-black text-gray-900 sm:text-3xl">
          صفحه موردنظر پیدا نشد
        </h1>

        <p className="mx-auto mt-4 max-w-md text-sm leading-7 text-gray-500 sm:text-base">
          صفحه‌ای که به دنبال آن هستید وجود ندارد، حذف شده یا آدرس آن اشتباه
          وارد شده است.
        </p>

        <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Link
            to="/"
            className="flex w-full items-center justify-center gap-2 rounded-xl bg-red-600 px-6 py-3 text-sm font-bold text-white transition hover:bg-red-700 sm:w-auto"
          >
            <FaHome />
            بازگشت به صفحه اصلی
          </Link>

          <button
            type="button"
            onClick={() => window.history.back()}
            className="flex w-full items-center justify-center gap-2 rounded-xl border border-gray-200 bg-white px-6 py-3 text-sm font-bold text-gray-700 transition hover:bg-gray-50 sm:w-auto"
          >
            <FaArrowRight />
            صفحه قبل
          </button>
        </div>

        <div className="mt-10 flex items-center justify-center gap-2 text-xs text-gray-400">
          <FaSearch />
          <span>ممکن است آدرس صفحه تغییر کرده باشد</span>
        </div>
      </div>
    </main>
  );
};

export default NotFound;
