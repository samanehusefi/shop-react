import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FaEdit, FaTrash } from "react-icons/fa";

import type { AppDispatch, RootState } from "../../../../Redux/store";
import { getBanners } from "../../../../Redux/Home/Banner/action";
import { deleteBanner } from "../../../../Api/Admin/bannerApi";
import type { IBanner } from "../../../../Types/Home/IBanner";

import BannerModal from "./BannerModal";

const Banners = () => {
  const dispatch = useDispatch<AppDispatch>();

  const { banners, loading, error } = useSelector(
    (state: RootState) => state.banner,
  );

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedBanner, setSelectedBanner] = useState<IBanner | null>(null);

  useEffect(() => {
    dispatch(getBanners());
  }, [dispatch]);

  const handleAdd = () => {
    setSelectedBanner(null);
    setIsModalOpen(true);
  };

  const handleEdit = (banner: IBanner) => {
    setSelectedBanner(banner);
    setIsModalOpen(true);
  };

  const handleDelete = async (id: IBanner["id"]) => {
    const confirmed = window.confirm("آیا از حذف این بنر مطمئن هستید؟");

    if (!confirmed) {
      return;
    }

    try {
      await deleteBanner(id);
      dispatch(getBanners());
    } catch (error) {
      console.error(error);
      alert("حذف بنر انجام نشد");
    }
  };

  const handleModalSuccess = () => {
    dispatch(getBanners());
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setSelectedBanner(null);
  };

  const getPositionTitle = (position: IBanner["position"]) => {
    const positions: Record<IBanner["position"], string> = {
      hero: "بعد از شگفت انگیزها",
      "top-banner": "بعد از  دسته بندی ها",
      "middle-banner": "بعد از  محصولات",
      "bottom-banner": "بعد از  برند",
    };

    return positions[position];
  };

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-red-900">بنرها</h1>

          <p className="mt-2 text-sm text-gray-500">مدیریت بنرهای فروشگاه</p>
        </div>

        <button
          type="button"
          onClick={handleAdd}
          className="rounded-lg bg-green-700 px-5 py-3 text-sm font-medium text-white transition hover:bg-green-800"
        >
          افزودن بنر
        </button>
      </div>

      <div className="overflow-hidden rounded-xl bg-white shadow-sm">
        {loading && (
          <div className="p-6 text-center text-gray-500">
            در حال دریافت اطلاعات...
          </div>
        )}

        {error && (
          <div className="p-6 text-center text-red-500">
            خطا در دریافت اطلاعات
          </div>
        )}

        {!loading && !error && banners.length > 0 && (
          <div className="overflow-x-auto">
            <table className="w-full min-w-[1100px] text-right">
              <thead className="border-b border-gray-200 bg-gray-50">
                <tr>
                  <th className="px-6 py-4">ID</th>
                  <th className="px-6 py-4">تصویر</th>
                  <th className="px-6 py-4">عنوان</th>
                  <th className="px-6 py-4">موقعیت</th>
                  <th className="px-6 py-4">لینک</th>
                  <th className="px-6 py-4">عملیات</th>
                </tr>
              </thead>

              <tbody>
                {banners.map((banner: IBanner) => (
                  <tr
                    key={banner.id}
                    className="border-b border-gray-100 last:border-0"
                  >
                    <td className="px-6 py-4 font-medium text-gray-700">
                      {banner.id}
                    </td>

                    <td className="px-6 py-4">
                      <img
                        src={banner.image}
                        alt={banner.title}
                        className="!h-14 !w-24 rounded-lg object-cover"
                      />
                    </td>

                    <td className="px-6 py-4 font-medium text-gray-700">
                      {banner.title}
                    </td>

                    <td className="px-6 py-4">
                      <span className="rounded-lg bg-gray-100 px-3 py-2 text-sm text-gray-700">
                        {getPositionTitle(banner.position)}
                      </span>
                    </td>

                    <td className="max-w-xs px-6 py-4">
                      <a
                        href={banner.url}
                        target="_blank"
                        rel="noreferrer"
                        className="block truncate text-sm text-blue-600 hover:text-blue-800"
                      >
                        {banner.url}
                      </a>
                    </td>

                    <td className="px-6 py-4">
                      <div className="flex gap-2">
                        <button
                          type="button"
                          onClick={() => handleEdit(banner)}
                          className="flex items-center gap-2 rounded-lg bg-yellow-500 px-3 py-2 text-sm text-red-900 transition hover:bg-yellow-600"
                        >
                          <FaEdit />
                          ویرایش
                        </button>

                        <button
                          type="button"
                          onClick={() => handleDelete(banner.id)}
                          className="flex items-center gap-2 rounded-lg bg-rose-600 px-3 py-2 text-sm text-white transition hover:bg-rose-700"
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
        )}

        {!loading && !error && banners.length === 0 && (
          <div className="p-8 text-center text-gray-500">بنری وجود ندارد</div>
        )}
      </div>

      <BannerModal
        isOpen={isModalOpen}
        onClose={handleModalClose}
        onSuccess={handleModalSuccess}
        banner={selectedBanner}
      />
    </div>
  );
};

export default Banners;
