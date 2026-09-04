import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../../../Redux/store";
import { getSlider } from "../../../Redux/Home/Slider/action";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "./Slider.css";

import { FaChevronRight, FaChevronLeft } from "react-icons/fa";

const Slider = () => {
  const dispatch = useDispatch<AppDispatch>();

  const slider = useSelector(
    (state: RootState) => state.slider.slider
  );

  useEffect(() => {
    dispatch(getSlider());
  }, [dispatch]);

  return (
    <div className="slider-container relative w-full">
      <Swiper
        modules={[Autoplay, Pagination, Navigation]}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        navigation={{
          nextEl: ".slider-next",
          prevEl: ".slider-prev",
        }}
        loop
        className="slider-swiper"
      >
        {slider.map((item) => (
          <SwiperSlide key={item.id}>
            <a href={item.link} className="block h-full">
              <img
                src={item.imageSrc}
                alt={item.title}
                className="h-full w-full object-cover"
              />
            </a>
          </SwiperSlide>
        ))}
      </Swiper>

      <div className="slider-navigation absolute right-6 bottom-6 z-10 flex items-center gap-2">
        <button
          type="button"
          className="slider-next flex h-10 w-10 items-center justify-center rounded-full bg-white shadow-md transition hover:bg-gray-100"
          aria-label="اسلاید بعدی"
        >
          <FaChevronRight className="text-sm text-gray-700" />
        </button>

        <button
          type="button"
          className="slider-prev flex h-10 w-10 items-center justify-center rounded-full bg-white shadow-md transition hover:bg-gray-100"
          aria-label="اسلاید قبلی"
        >
          <FaChevronLeft className="text-sm text-gray-700" />
        </button>
      </div>
    </div>
  );
};

export default Slider;