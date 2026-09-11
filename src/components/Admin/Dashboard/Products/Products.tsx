import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaChevronLeft, FaChevronRight, FaEdit, FaTrash } from "react-icons/fa";

import type { IProduct } from "../../../../Types/Home/IProduct";
import {
  deleteProduct,
  getAdminProducts,
  updateProduct,
} from "../../../../Api/Admin/productsApi";

const Products = () => {
  const navigate = useNavigate();

  const [products, setProducts] = useState<IProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [actionLoading, setActionLoading] = useState<number | null>(null);

  const itemsPerPage = 10;

  const fetchProducts = async () => {
    try {
      setLoading(true);
      setError("");

      const data = await getAdminProducts();
      const sortedProducts = [...data].sort((a, b) => b.id - a.id);

      setProducts(sortedProducts);
    } catch (error) {
      console.error("خطا در دریافت محصولات:", error);

      setError(
        error instanceof Error ? error.message : "دریافت محصولات انجام نشد",
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  useEffect(() => {
    const totalPages = Math.ceil(products.length / itemsPerPage);

    if (totalPages > 0 && currentPage > totalPages) {
      setCurrentPage(totalPages);
    }

    if (totalPages === 0 && currentPage !== 1) {
      setCurrentPage(1);
    }
  }, [products.length, currentPage]);

  const handleAdd = () => {
    navigate("/dashboard/products/create");
  };

  const handleEdit = (product: IProduct) => {
    navigate(`/dashboard/products/edit/${product.id}`);
  };

  const handleToggleStatus = async (product: IProduct) => {
    setActionLoading(product.id);

    try {
      const newStatus = product.status === "active" ? "inactive" : "active";

      const updatedProduct = await updateProduct(product.id, {
        status: newStatus,
      });

      setProducts((prev) =>
        prev.map((item) => (item.id === product.id ? updatedProduct : item)),
      );
    } catch (error) {
      console.error("خطا در تغییر وضعیت محصول:", error);

      alert(
        error instanceof Error ? error.message : "تغییر وضعیت محصول انجام نشد",
      );
    } finally {
      setActionLoading(null);
    }
  };

  const handleDelete = async (id: IProduct["id"]) => {
    const confirmed = window.confirm("آیا از حذف این محصول مطمئن هستید؟");

    if (!confirmed) {
      return;
    }

    setActionLoading(id);

    try {
      await deleteProduct(id);

      setProducts((prev) => prev.filter((product) => product.id !== id));

      const remainingProducts = products.length - 1;
      const totalPages = Math.ceil(remainingProducts / itemsPerPage);

      if (totalPages === 0) {
        setCurrentPage(1);
      } else if (currentPage > totalPages) {
        setCurrentPage(totalPages);
      }
    } catch (error) {
      console.error("خطا در حذف محصول:", error);

      alert(error instanceof Error ? error.message : "حذف محصول انجام نشد");
    } finally {
      setActionLoading(null);
    }
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("fa-IR").format(price);
  };

  const getStockStatus = (stock: number) => {
    if (stock <= 0) {
      return {
        text: "ناموجود",
        className: "bg-red-100 text-red-700",
      };
    }

    if (stock <= 5) {
      return {
        text: `فقط ${stock} عدد`,
        className: "bg-yellow-100 text-yellow-700",
      };
    }

    return {
      text: `${stock} عدد`,
      className: "bg-green-100 text-green-700",
    };
  };

  const totalPages = Math.ceil(products.length / itemsPerPage);

  const startIndex = (currentPage - 1) * itemsPerPage;

  const currentProducts = products.slice(startIndex, startIndex + itemsPerPage);

  return (
    <div className="w-full min-w-0">
      <div className="mb-5 flex flex-col gap-4 sm:mb-6 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-xl font-bold text-red-900 sm:text-2xl">
            محصولات
          </h1>

          <p className="mt-2 text-xs text-gray-500 sm:text-sm">
            مدیریت محصولات فروشگاه
          </p>
        </div>

        <button
          type="button"
          onClick={handleAdd}
          className="flex w-full cursor-pointer items-center justify-center gap-2 rounded-lg bg-green-700 px-5 py-3 text-sm font-medium text-white transition hover:bg-green-800 sm:w-auto"
        >
          افزودن محصول
        </button>
      </div>

      <div className="overflow-hidden rounded-xl bg-white shadow-sm">
        {loading && (
          <div className="flex min-h-60 items-center justify-center p-6">
            <span className="loading loading-spinner loading-md text-blue-600"></span>
          </div>
        )}

        {!loading && error && (
          <div className="flex min-h-60 flex-col items-center justify-center gap-3 p-6 text-center">
            <p className="text-sm font-medium text-red-600">
              دریافت محصولات انجام نشد
            </p>

            <p className="text-xs text-gray-500">{error}</p>

            <button
              type="button"
              onClick={fetchProducts}
              className="rounded-lg bg-blue-600 px-4 py-2 text-sm text-white transition hover:bg-blue-700"
            >
              تلاش مجدد
            </button>
          </div>
        )}

        {!loading && !error && products.length === 0 && (
          <div className="flex min-h-60 items-center justify-center p-6 text-sm text-gray-500">
            محصولی برای نمایش وجود ندارد
          </div>
        )}

        {!loading && !error && products.length > 0 && (
          <>
            <div className="hidden overflow-x-auto md:block">
              <table className="w-full min-w-[1200px] text-right">
                <thead className="border-b border-gray-200 bg-gray-50">
                  <tr>
                    <th className="px-5 py-4">شناسه</th>
                    <th className="px-5 py-4">محصول</th>
                    <th className="px-5 py-4">برند</th>
                    <th className="px-5 py-4">قیمت</th>
                    <th className="px-5 py-4">موجودی</th>
                    <th className="px-5 py-4">وضعیت</th>
                    <th className="px-5 py-4">عملیات</th>
                  </tr>
                </thead>

                <tbody>
                  {currentProducts.map((product) => {
                    const stockStatus = getStockStatus(product.stock);

                    return (
                      <tr
                        key={product.id}
                        className="border-b border-gray-100 last:border-0"
                      >
                        <td className="px-5 py-4 font-medium text-gray-700">
                          {product.id}
                        </td>

                        <td className="max-w-sm px-5 py-4">
                          <div className="flex items-center gap-3">
                            <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-lg border border-gray-100 bg-gray-50">
                              <img
                                src={product.image}
                                alt={product.title}
                                className="h-12 w-12 object-contain"
                              />
                            </div>

                            <div className="min-w-0">
                              <span className="block truncate text-sm font-medium text-gray-800">
                                {product.title}
                              </span>

                              {product.english_title && (
                                <span className="mt-1 block truncate text-xs text-gray-400">
                                  {product.english_title}
                                </span>
                              )}
                            </div>
                          </div>
                        </td>

                        <td className="px-5 py-4 text-sm text-gray-600">
                          {product.brand || "-"}
                        </td>

                        <td className="px-5 py-4">
                          <div className="flex flex-col">
                            <span className="text-sm font-semibold text-gray-800">
                              {formatPrice(product.price)}
                            </span>

                            <span className="text-xs text-gray-400">تومان</span>

                            {product.old_price > product.price && (
                              <span className="mt-1 text-xs text-gray-400 line-through">
                                {formatPrice(product.old_price)}
                              </span>
                            )}
                          </div>
                        </td>

                        <td className="px-5 py-4">
                          <span
                            className={`inline-flex rounded-full px-2.5 py-1 text-xs font-medium ${stockStatus.className}`}
                          >
                            {stockStatus.text}
                          </span>
                        </td>

                        <td className="px-5 py-4">
                          <button
                            type="button"
                            disabled={actionLoading === product.id}
                            onClick={() => handleToggleStatus(product)}
                            className={`relative h-6 w-11 cursor-pointer rounded-full transition-colors ${
                              product.status === "active"
                                ? "bg-green-600"
                                : "bg-gray-300"
                            } ${
                              actionLoading === product.id
                                ? "cursor-not-allowed opacity-50"
                                : ""
                            }`}
                            aria-label={
                              product.status === "active"
                                ? "غیرفعال کردن"
                                : "فعال کردن"
                            }
                          >
                            {actionLoading === product.id ? (
                              <span className="absolute inset-0 flex items-center justify-center">
                                <span className="loading loading-spinner loading-xs"></span>
                              </span>
                            ) : (
                              <span
                                className={`absolute top-1 h-4 w-4 rounded-full bg-white transition-transform ${
                                  product.status === "active"
                                    ? "right-1"
                                    : "right-6"
                                }`}
                              />
                            )}
                          </button>
                        </td>

                        <td className="px-5 py-4">
                          <div className="flex gap-2">
                            <button
                              type="button"
                              onClick={() => handleEdit(product)}
                              className="flex cursor-pointer items-center gap-1.5 rounded-lg bg-yellow-500 px-3 py-2 text-sm text-red-900 transition hover:bg-yellow-600"
                            >
                              <FaEdit />
                              ویرایش
                            </button>

                            <button
                              type="button"
                              disabled={actionLoading === product.id}
                              onClick={() => handleDelete(product.id)}
                              className="flex cursor-pointer items-center gap-1.5 rounded-lg bg-rose-600 px-3 py-2 text-sm text-white transition hover:bg-rose-700 disabled:cursor-not-allowed disabled:opacity-50"
                            >
                              {actionLoading === product.id ? (
                                <span className="loading loading-spinner loading-xs"></span>
                              ) : (
                                <FaTrash />
                              )}
                              حذف
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            <div className="divide-y divide-gray-100 md:hidden">
              {currentProducts.map((product) => {
                const stockStatus = getStockStatus(product.stock);

                return (
                  <div key={product.id} className="p-4">
                    <div className="flex items-start gap-3">
                      <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-lg border border-gray-100 bg-gray-50">
                        <img
                          src={product.image}
                          alt={product.title}
                          className="h-12 w-12 object-contain"
                        />
                      </div>

                      <div className="min-w-0 flex-1">
                        <div className="mb-1 text-xs text-gray-400">
                          شناسه: {product.id}
                        </div>

                        <h3 className="line-clamp-2 text-sm font-semibold text-gray-800">
                          {product.title}
                        </h3>

                        <div className="mt-2 text-xs text-gray-500">
                          برند: {product.brand || "-"}
                        </div>
                      </div>

                      <button
                        type="button"
                        disabled={actionLoading === product.id}
                        onClick={() => handleToggleStatus(product)}
                        className={`relative h-6 w-11 shrink-0 cursor-pointer rounded-full transition-colors ${
                          product.status === "active"
                            ? "bg-green-600"
                            : "bg-gray-300"
                        }`}
                      >
                        {actionLoading === product.id ? (
                          <span className="absolute inset-0 flex items-center justify-center">
                            <span className="loading loading-spinner loading-xs"></span>
                          </span>
                        ) : (
                          <span
                            className={`absolute top-1 h-4 w-4 rounded-full bg-white transition-transform ${
                              product.status === "active"
                                ? "right-1"
                                : "right-6"
                            }`}
                          />
                        )}
                      </button>
                    </div>

                    <div className="mt-4 grid grid-cols-2 gap-2">
                      <div className="rounded-lg bg-gray-50 p-3">
                        <div className="text-xs text-gray-400">قیمت</div>

                        <div className="mt-1 text-sm font-semibold text-gray-800">
                          {formatPrice(product.price)}
                        </div>

                        <div className="text-[10px] text-gray-400">تومان</div>
                      </div>

                      <div className="rounded-lg bg-gray-50 p-3">
                        <div className="text-xs text-gray-400">موجودی</div>

                        <div className="mt-1">
                          <span
                            className={`inline-flex rounded-full px-2 py-1 text-xs font-medium ${stockStatus.className}`}
                          >
                            {stockStatus.text}
                          </span>
                        </div>
                      </div>
                    </div>

                    {product.discount > 0 && (
                      <div className="mt-3 rounded-lg bg-red-50 px-3 py-2 text-xs text-red-600">
                        تخفیف {product.discount}٪
                      </div>
                    )}

                    <div className="mt-4 grid grid-cols-2 gap-2">
                      <button
                        type="button"
                        onClick={() => handleEdit(product)}
                        className="flex cursor-pointer items-center justify-center gap-2 rounded-lg bg-yellow-500 px-3 py-2.5 text-xs font-medium text-red-900 transition hover:bg-yellow-600 sm:text-sm"
                      >
                        <FaEdit />
                        ویرایش
                      </button>

                      <button
                        type="button"
                        disabled={actionLoading === product.id}
                        onClick={() => handleDelete(product.id)}
                        className="flex cursor-pointer items-center justify-center gap-2 rounded-lg bg-rose-600 px-3 py-2.5 text-xs font-medium text-white transition hover:bg-rose-700 disabled:cursor-not-allowed disabled:opacity-50 sm:text-sm"
                      >
                        {actionLoading === product.id ? (
                          <span className="loading loading-spinner loading-xs"></span>
                        ) : (
                          <FaTrash />
                        )}
                        حذف
                      </button>
                    </div>
                  </div>
                );
              })}
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
                    className="flex h-9 w-9 cursor-pointer items-center justify-center rounded-lg border border-gray-300 text-sm text-gray-700 transition hover:border-blue-600 hover:bg-blue-50 disabled:cursor-not-allowed disabled:opacity-40"
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
      </div>
    </div>
  );
};

export default Products;
