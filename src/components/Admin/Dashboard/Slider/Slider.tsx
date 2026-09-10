import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  FaChevronLeft,
  FaChevronRight,
  FaEdit,
  FaPlus,
  FaTrash,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";

import type { AppDispatch, RootState } from "../../../../Redux/store";
import { getSlider } from "../../../../Redux/Home/Slider/action";
import { deleteSlider } from "../../../../Api/Admin/sliderApi";
import type { ISlider } from "../../../../Types/Home/ISlider";

const Slider = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const { slider, loading, error } = useSelector(
    (state: RootState) => state.slider,
  );

  const [currentPage, setCurrentPage] = useState(1);

  const itemsPerPage = 10;

  const totalPages = Math.ceil(slider.length / itemsPerPage);

  const startIndex = (currentPage - 1) * itemsPerPage;

  const currentSlider = slider.slice(startIndex, startIndex + itemsPerPage);

  useEffect(() => {
    dispatch(getSlider());
  }, [dispatch]);

  useEffect(() => {
    if (totalPages > 0 && currentPage > totalPages) {
      setCurrentPage(totalPages);
    }

    if (totalPages === 0 && currentPage !== 1) {
      setCurrentPage(1);
    }
  }, [currentPage, totalPages]);

  const handleAdd = () => {
    navigate("/dashboard/slider/create");
  };

  const handleEdit = (item: ISlider) => {
    navigate(`/dashboard/slider/edit/${item.id}`);
  };

  const handleDelete = async (id: ISlider["id"]) => {
    const confirmed = window.confirm("آیا از حذف این اسلایدر مطمئن هستید؟");

    if (!confirmed) {
      return;
    }

    try {
      await deleteSlider(id);

      if (
        currentPage > 1 &&
        slider.length - 1 <= (currentPage - 1) * itemsPerPage
      ) {
        setCurrentPage((page) => page - 1);
      }

      dispatch(getSlider());
    } catch (error) {
      console.error(error);
      alert("حذف اسلایدر انجام نشد");
    }
  };

  return (
    <div className="w-full min-w-0">
      <div className="mb-5 flex flex-col gap-4 sm:mb-6 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-xl font-bold text-red-900 sm:text-2xl">
            اسلایدرها
          </h1>

          <p className="mt-2 text-xs text-gray-500 sm:text-sm">
            مدیریت اسلایدرهای فروشگاه
          </p>
        </div>

        <button
          type="button"
          onClick={handleAdd}
          className="flex w-full cursor-pointer items-center justify-center gap-2 rounded-lg bg-green-700 px-5 py-3 text-sm font-medium text-white transition hover:bg-green-800 sm:w-auto"
        >
          <FaPlus />
          افزودن اسلایدر
        </button>
      </div>

      <div className="overflow-hidden rounded-xl bg-white shadow-sm">
        {loading && (
          <div className="p-6 text-center text-sm text-gray-500">
            <span className="loading loading-spinner loading-sm"></span>
          </div>
        )}

        {error && (
          <div className="p-6 text-center text-sm text-red-500">
            خطا در دریافت اطلاعات
          </div>
        )}

        {!loading && !error && slider.length > 0 && (
          <>
            <div className="hidden overflow-x-auto md:block">
              <table className="w-full min-w-[1000px] text-right">
                <thead className="border-b border-gray-200 bg-gray-50">
                  <tr>
                    <th className="px-6 py-4">شناسه</th>
                    <th className="px-6 py-4">تصویر دسکتاپ</th>
                    <th className="px-6 py-4">تصویر موبایل</th>
                    <th className="px-6 py-4">عنوان</th>
                    <th className="px-6 py-4">لینک</th>
                    <th className="px-6 py-4">عملیات</th>
                  </tr>
                </thead>

                <tbody>
                  {currentSlider.map((item: ISlider) => (
                    <tr
                      key={item.id}
                      className="border-b border-gray-100 last:border-0"
                    >
                      <td className="px-6 py-4 font-medium text-gray-700">
                        {item.id}
                      </td>

                      <td className="px-6 py-4">
                        <img
                          src={item.imageSrc}
                          alt={item.title}
                          className="h-12 w-20 rounded-lg object-cover"
                        />
                      </td>

                      <td className="px-6 py-4">
                        <img
                          src={item.imageMobileSrc}
                          alt={item.title}
                          className="h-12 w-12 rounded-lg object-cover"
                        />
                      </td>

                      <td className="max-w-xs px-6 py-4">
                        <span className="block truncate font-medium text-gray-700">
                          {item.title}
                        </span>
                      </td>

                      <td className="max-w-xs px-6 py-4">
                        <a
                          href={item.link}
                          target="_blank"
                          rel="noreferrer"
                          className="block truncate text-sm text-blue-600 hover:text-blue-800"
                        >
                          {item.link}
                        </a>
                      </td>

                      <td className="px-6 py-4">
                        <div className="flex gap-2">
                          <button
                            type="button"
                            onClick={() => handleEdit(item)}
                            className="flex cursor-pointer items-center gap-2 rounded-lg bg-yellow-500 px-3 py-2 text-sm text-red-900 transition hover:bg-yellow-600"
                          >
                            <FaEdit />
                            ویرایش
                          </button>

                          <button
                            type="button"
                            onClick={() => handleDelete(item.id)}
                            className="flex cursor-pointer items-center gap-2 rounded-lg bg-rose-600 px-3 py-2 text-sm text-white transition hover:bg-rose-700"
                          >
                            <FaTrash />
                            حذف
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="divide-y divide-gray-100 md:hidden">
              {currentSlider.map((item: ISlider) => (
                <div key={item.id} className="p-4">
                  <div className="flex items-start gap-3">
                    <div className="flex h-16 w-20 shrink-0 items-center justify-center overflow-hidden rounded-lg border border-gray-100 bg-gray-50">
                      <img
                        src={item.imageSrc}
                        alt={item.title}
                        className="h-full w-full object-cover"
                      />
                    </div>

                    <div className="min-w-0 flex-1">
                      <div className="mb-1 text-xs text-gray-400">
                        ID: {item.id}
                      </div>

                      <h3 className="text-sm font-semibold text-gray-800">
                        {item.title}
                      </h3>
                    </div>
                  </div>

                  <div className="mt-4">
                    <div className="mb-3">
                      <span className="mb-2 block text-xs text-gray-400">
                        تصویر موبایل
                      </span>

                      <div className="flex h-20 w-20 items-center justify-center overflow-hidden rounded-lg border border-gray-100 bg-gray-50">
                        <img
                          src={item.imageMobileSrc}
                          alt={item.title}
                          className="h-full w-full object-cover"
                        />
                      </div>
                    </div>

                    <div>
                      <span className="mb-1 block text-xs text-gray-400">
                        لینک
                      </span>

                      <a
                        href={item.link}
                        target="_blank"
                        rel="noreferrer"
                        className="block truncate text-sm text-blue-600 hover:text-blue-800"
                      >
                        {item.link || "-"}
                      </a>
                    </div>
                  </div>

                  <div className="mt-4 grid grid-cols-2 gap-2">
                    <button
                      type="button"
                      onClick={() => handleEdit(item)}
                      className="flex cursor-pointer items-center justify-center gap-2 rounded-lg bg-yellow-500 px-3 py-2.5 text-xs font-medium text-red-900 transition hover:bg-yellow-600 sm:text-sm"
                    >
                      <FaEdit />
                      ویرایش
                    </button>

                    <button
                      type="button"
                      onClick={() => handleDelete(item.id)}
                      className="flex cursor-pointer items-center justify-center gap-2 rounded-lg bg-rose-600 px-3 py-2.5 text-xs font-medium text-white transition hover:bg-rose-700 sm:text-sm"
                    >
                      <FaTrash />
                      حذف
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {totalPages > 0 && (
              <div className="flex flex-col gap-3 border-t border-gray-200 px-4 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-6">
                <span className="text-center text-xs text-gray-500 sm:text-right sm:text-sm">
                  صفحه {currentPage} از {totalPages}
                </span>

                <div className="flex items-center justify-center gap-1.5 sm:gap-2">
                  <button
                    type="button"
                    disabled={currentPage === 1}
                    onClick={() => setCurrentPage((page) => page - 1)}
                    className="flex h-9 w-9 cursor-pointer items-center justify-center rounded-lg border border-gray-300 text-sm text-gray-700 transition hover:border-green-600 hover:bg-green-50 disabled:cursor-not-allowed disabled:opacity-40"
                    title="صفحه قبل"
                  >
                    <FaChevronRight />
                  </button>

                  {Array.from(
                    { length: totalPages },
                    (_, index) => index + 1,
                  ).map((page) => (
                    <button
                      key={page}
                      type="button"
                      onClick={() => setCurrentPage(page)}
                      className={`h-9 min-w-9 cursor-pointer rounded-lg px-2.5 text-xs transition sm:px-3 sm:text-sm ${
                        currentPage === page
                          ? "bg-green-600 text-white"
                          : "border border-gray-300 text-gray-700 hover:bg-green-50"
                      }`}
                    >
                      {page}
                    </button>
                  ))}

                  <button
                    type="button"
                    disabled={currentPage === totalPages}
                    onClick={() => setCurrentPage((page) => page + 1)}
                    className="flex h-9 w-9 cursor-pointer items-center justify-center rounded-lg border border-gray-300 text-sm text-gray-700 transition hover:border-green-600 hover:bg-green-50 disabled:cursor-not-allowed disabled:opacity-40"
                    title="صفحه بعد"
                  >
                    <FaChevronLeft />
                  </button>
                </div>
              </div>
            )}
          </>
        )}

        {!loading && !error && slider.length === 0 && (
          <div className="p-8 text-center text-sm text-gray-500">
            اسلایدری وجود ندارد
          </div>
        )}
      </div>
    </div>
  );
};

export default Slider;
