import { Link } from "react-router-dom";
import { FaHome, FaRedo } from "react-icons/fa";

const ServerError = () => {
  const handleReload = () => {
    window.location.reload();
  };

  return (
    <main
      className="flex min-h-[calc(100vh-250px)] items-center justify-center bg-[#f7f7f7] px-4 py-10"
      dir="rtl"
    >
      <div className="w-full max-w-md rounded-3xl border border-gray-200 bg-white px-5 py-10 text-center shadow-sm sm:px-8">
        <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-full bg-orange-50">
          <span className="text-4xl font-black text-orange-500">500</span>
        </div>

        <h1 className="mt-7 text-xl font-bold text-gray-900 sm:text-2xl">
          مشکلی پیش آمده است
        </h1>

        <p className="mx-auto mt-3 max-w-sm text-sm leading-6 text-gray-500">
          متأسفانه در پردازش درخواست شما مشکلی رخ داده است. لطفاً دوباره تلاش
          کنید.
        </p>

        <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:justify-center">
          <button
            type="button"
            onClick={handleReload}
            className="flex items-center justify-center gap-2 rounded-xl bg-red-600 px-5 py-3 text-sm font-bold text-white transition hover:bg-red-700"
          >
            <FaRedo />
            تلاش مجدد
          </button>

          <Link
            to="/"
            className="flex items-center justify-center gap-2 rounded-xl border border-gray-200 bg-white px-5 py-3 text-sm font-bold text-gray-700 transition hover:bg-gray-50"
          >
            <FaHome />
            صفحه اصلی
          </Link>
        </div>
      </div>
    </main>
  );
};

export default ServerError;
