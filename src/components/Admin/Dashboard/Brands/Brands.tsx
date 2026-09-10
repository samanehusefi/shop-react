import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { FaChevronLeft, FaChevronRight, FaEdit, FaTrash } from "react-icons/fa";

import type { AppDispatch, RootState } from "../../../../Redux/store";
import { getBrands } from "../../../../Redux/Home/Brands/action";
import type { IBrand } from "../../../../Types/Home/IBrand";
import { deleteBrand, updateBrand } from "../../../../Api/Admin/brandsApi";

const Brands = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const [currentPage, setCurrentPage] = useState(1);

  const itemsPerPage = 10;

  const brandsState = useSelector((state: RootState) => state.brands);

  const brands = Array.isArray(brandsState?.brands) ? brandsState.brands : [];

  const loading = brandsState?.loading ?? false;
  const error = brandsState?.error ?? null;

  useEffect(() => {
    dispatch(getBrands());
  }, [dispatch]);

  useEffect(() => {
    const totalPages = Math.ceil(brands.length / itemsPerPage);

    if (totalPages > 0 && currentPage > totalPages) {
      setCurrentPage(totalPages);
    }

    if (totalPages === 0 && currentPage !== 1) {
      setCurrentPage(1);
    }
  }, [brands.length, currentPage]);

  const handleAdd = () => {
    navigate("/dashboard/brands/create");
  };

  const handleEdit = (brand: IBrand) => {
    navigate(`/dashboard/brands/edit/${brand.id}`);
  };

  const handleToggleActive = async (brand: IBrand) => {
    try {
      await updateBrand(brand.id, {
        visibility: !brand.visibility,
      });

      dispatch(getBrands());
    } catch (error) {
      console.error(error);
      alert("تغییر وضعیت برند انجام نشد");
    }
  };

  const handleDelete = async (id: IBrand["id"]) => {
    const confirmed = window.confirm("آیا از حذف این برند مطمئن هستید؟");

    if (!confirmed) {
      return;
    }

    try {
      await deleteBrand(id);

      if (
        currentPage > 1 &&
        brands.length - 1 <= (currentPage - 1) * itemsPerPage
      ) {
        setCurrentPage((page) => page - 1);
      }

      dispatch(getBrands());
    } catch (error) {
      console.error(error);
      alert("حذف برند انجام نشد");
    }
  };

  const totalPages = Math.ceil(brands.length / itemsPerPage);

  const startIndex = (currentPage - 1) * itemsPerPage;

  const currentBrands = brands.slice(startIndex, startIndex + itemsPerPage);

  return (
    <div className="w-full min-w-0">
      <div className="mb-5 flex flex-col gap-4 sm:mb-6 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className=" text-sm md:text-xl font-bold text-red-900 sm:text-2xl">
            مدیریت برندها
          </h1>

          <p className="mt-2 text-xs text-gray-500 sm:text-sm">
            مدیریت برندهای فروشگاه
          </p>
        </div>

        <button
          type="button"
          onClick={handleAdd}
          className="flex w-full cursor-pointer items-center justify-center gap-2 rounded-lg bg-green-700 px-5 py-3 text-sm font-medium text-white transition hover:bg-green-800 sm:w-auto"
        >
          افزودن برند
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

        {!loading && !error && (
          <>
            <div className="hidden overflow-x-auto md:block">
              <table className="w-full min-w-[900px] text-right">
                <thead className="border-b border-gray-200 bg-gray-50">
                  <tr>
                    <th className="px-6 py-4">شناسه</th>
                    <th className="px-6 py-4">تصویر</th>
                    <th className="px-6 py-4">کد برند</th>
                    <th className="px-6 py-4">عنوان برند</th>
                    <th className="px-6 py-4">وضعیت</th>
                    <th className="px-6 py-4">عملیات</th>
                  </tr>
                </thead>

                <tbody>
                  {currentBrands.map((brand) => (
                    <tr
                      key={brand.id}
                      className="border-b border-gray-100 last:border-0"
                    >
                      <td className="px-6 py-4 font-medium text-gray-700">
                        {brand.id}
                      </td>

                      <td className="px-6 py-4">
                        <div className="flex h-12 w-12 items-center justify-center rounded-lg border border-gray-100 bg-gray-50">
                          <img
                            src={brand.src}
                            alt={brand.title_fa}
                            className="h-10 w-10 object-contain"
                          />
                        </div>
                      </td>

                      <td className="px-6 py-4">
                        <span className="font-medium text-gray-600">
                          {brand.code}
                        </span>
                      </td>

                      <td className="max-w-xs px-6 py-4">
                        <span className="block truncate font-medium text-gray-700">
                          {brand.title_fa}
                        </span>
                      </td>

                      <td className="px-6 py-4">
                        <button
                          type="button"
                          onClick={() => handleToggleActive(brand)}
                          className={`relative h-6 w-11 cursor-pointer rounded-full transition-colors ${
                            brand.visibility ? "bg-green-600" : "bg-gray-300"
                          }`}
                          aria-label={
                            brand.visibility ? "غیرفعال کردن" : "فعال کردن"
                          }
                        >
                          <span
                            className={`absolute top-1 h-4 w-4 rounded-full bg-white transition-transform ${
                              brand.visibility ? "right-1" : "right-6"
                            }`}
                          />
                        </button>
                      </td>

                      <td className="px-6 py-4">
                        <div className="flex gap-2">
                          <button
                            type="button"
                            onClick={() => handleEdit(brand)}
                            className="flex cursor-pointer items-center justify-center gap-2 rounded-lg bg-yellow-500 px-3 py-2.5 text-xs font-medium text-red-900 transition hover:bg-yellow-600 sm:text-sm"
                          >
                            <FaEdit />
                            ویرایش
                          </button>

                          <button
                            type="button"
                            onClick={() => handleDelete(brand.id)}
                            className="flex cursor-pointer items-center justify-center gap-2 rounded-lg bg-rose-600 px-3 py-2.5 text-xs font-medium text-white transition hover:bg-rose-700 sm:text-sm"
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
              {currentBrands.map((brand) => (
                <div key={brand.id} className="p-4">
                  <div className="flex items-start gap-3">
                    <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-lg border border-gray-100 bg-gray-50">
                      <img
                        src={brand.src}
                        alt={brand.title_fa}
                        className="h-12 w-12 object-contain"
                      />
                    </div>

                    <div className="min-w-0 flex-1">
                      <div className="mb-1 text-xs text-gray-400">
                        شناسه: {brand.id}
                      </div>

                      <h3 className="truncate text-sm font-semibold text-gray-800">
                        {brand.title_fa}
                      </h3>

                      <p className="mt-1 text-xs text-gray-500">
                        کد: {brand.code}
                      </p>
                    </div>

                    <button
                      type="button"
                      onClick={() => handleToggleActive(brand)}
                      className={`relative h-6 w-11 shrink-0 cursor-pointer rounded-full transition-colors ${
                        brand.visibility ? "bg-green-600" : "bg-gray-300"
                      }`}
                      aria-label={
                        brand.visibility ? "غیرفعال کردن" : "فعال کردن"
                      }
                    >
                      <span
                        className={`absolute top-1 h-4 w-4 rounded-full bg-white transition-transform ${
                          brand.visibility ? "right-1" : "right-6"
                        }`}
                      />
                    </button>
                  </div>

                  <div className="mt-4 grid grid-cols-2 gap-2">
                    <button
                      type="button"
                      onClick={() => handleEdit(brand)}
                      className="flex cursor-pointer items-center justify-center gap-2 rounded-lg
                       bg-yellow-500 px-3 py-2.5 text-xs font-medium text-red-900 transition hover:bg-yellow-600 sm:text-sm"
                    >
                      <FaEdit />
                      ویرایش
                    </button>

                    <button
                      type="button"
                      onClick={() => handleDelete(brand.id)}
                      className="flex cursor-pointer items-center justify-center gap-2 rounded-lg bg-rose-600 px-3 py-2.5 text-xs font-medium text-white transition hover:bg-rose-700 sm:text-sm"
                    >
                      <FaTrash />
                      حذف
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {currentBrands.length === 0 && (
              <div className="p-10 text-center text-sm text-gray-500">
                هیچ برندی ثبت نشده است.
              </div>
            )}

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
                    className="flex h-9 w-9 cursor-pointer items-center justify-center rounded-lg border border-gray-300 text-sm text-gray-700 transition hover:border-blue-600 hover:bg-blue-50 disabled:cursor-not-allowed disabled:opacity-40"
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
                          : "border border-gray-300 text-gray-700 hover:bg-blue-50"
                      }`}
                    >
                      {page}
                    </button>
                  ))}

                  <button
                    type="button"
                    disabled={currentPage === totalPages}
                    onClick={() => setCurrentPage((page) => page + 1)}
                    className="flex h-9 w-9 cursor-pointer items-center justify-center rounded-lg border border-gray-300 text-sm text-gray-700 transition hover:border-blue-600 hover:bg-blue-50 disabled:cursor-not-allowed disabled:opacity-40"
                    title="صفحه بعد"
                  >
                    <FaChevronLeft />
                  </button>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default Brands;
