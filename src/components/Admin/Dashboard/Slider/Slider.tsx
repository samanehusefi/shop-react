import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FaEdit, FaTrash } from "react-icons/fa";

import type { AppDispatch, RootState } from "../../../../Redux/store";
import { getSlider } from "../../../../Redux/Home/Slider/action";
import { deleteSlider } from "../../../../Api/Admin/sliderApi";
import type { ISlider } from "../../../../Types/Home/ISlider";

import SliderModal from "./SliderModal";

const Slider = () => {
  console.log("SLIDER PAGE RENDER");
  const dispatch = useDispatch<AppDispatch>();

  const { slider, loading, error } = useSelector(
    (state: RootState) => state.slider,
  );

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedSlider, setSelectedSlider] = useState<ISlider | null>(null);

  useEffect(() => {
    dispatch(getSlider());
  }, [dispatch]);

  const handleAdd = () => {
    setSelectedSlider(null);
    setIsModalOpen(true);
  };

  const handleEdit = (item: ISlider) => {
    setSelectedSlider(item);
    setIsModalOpen(true);
  };

  const handleDelete = async (id: ISlider["id"]) => {
    const confirmed = window.confirm("آیا از حذف این اسلایدر مطمئن هستید؟");

    if (!confirmed) {
      return;
    }

    try {
      await deleteSlider(id);
      dispatch(getSlider());
    } catch (error) {
      console.error(error);
      alert("حذف اسلایدر انجام نشد");
    }
  };

  const handleModalSuccess = () => {
    dispatch(getSlider());
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setSelectedSlider(null);
  };

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-red-900">اسلایدرها</h1>

          <p className="mt-2 text-sm text-gray-500">
            مدیریت اسلایدرهای فروشگاه
          </p>
        </div>

        <button
          type="button"
          onClick={handleAdd}
          className="rounded-lg bg-green-700 px-5 py-3 text-sm font-medium text-white transition hover:bg-green-800"
        >
          افزودن اسلایدر
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

        {!loading && !error && slider.length > 0 && (
          <div className="overflow-x-auto">
            <table className="w-full min-w-[1000px] text-right">
              <thead className="border-b border-gray-200 bg-gray-50">
                <tr>
                  <th className="px-6 py-4">ID</th>
                  <th className="px-6 py-4">تصویر دسکتاپ</th>
                  <th className="px-6 py-4">تصویر موبایل</th>
                  <th className="px-6 py-4">عنوان</th>
                  <th className="px-6 py-4">لینک</th>
                  <th className="px-6 py-4">عملیات</th>
                </tr>
              </thead>

              <tbody>
                {slider.map((item: ISlider) => (
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
                        className="!h-12 !w-20 rounded-lg object-cover"
                      />
                    </td>

                    <td className="px-6 py-4">
                      <img
                        src={item.imageMobileSrc}
                        alt={item.title}
                        className="!h-12 !w-12 rounded-lg object-cover"
                      />
                    </td>

                    <td className="px-6 py-4 font-medium text-gray-700">
                      {item.title}
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
                          className="flex items-center gap-2 rounded-lg bg-yellow-500 px-3 py-2 text-sm text-red-900 transition hover:bg-yellow-600"
                        >
                          <FaEdit />
                          ویرایش
                        </button>

                        <button
                          type="button"
                          onClick={() => handleDelete(item.id)}
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

        {!loading && !error && slider.length === 0 && (
          <div className="p-8 text-center text-gray-500">
            اسلایدری وجود ندارد
          </div>
        )}
      </div>

      <SliderModal
        isOpen={isModalOpen}
        onClose={handleModalClose}
        onSuccess={handleModalSuccess}
        slider={selectedSlider}
      />
    </div>
  );
};

export default Slider;
