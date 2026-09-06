import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import type { AppDispatch, RootState } from "../../../../Redux/store";
import { getBannersAction } from "../../../../Redux/Home/Banner/action";

const HeroBanner = () => {
  const dispatch = useDispatch<AppDispatch>();

  const banners = useSelector((state: RootState) => state.banner.banners);

  useEffect(() => {
    dispatch(getBannersAction());
  }, [dispatch]);

  const heroBanners = banners.filter((banner) => banner.position === "hero");

  return (
    <section className="mb-8 w-full">
      <div className="mx-auto w-full max-w-[1440px] px-4">
        <div className="grid grid-cols-2 gap-3 md:grid-cols-4 md:gap-4">
          {heroBanners.map((banner) => (
            <a
              key={banner.id}
              href={banner.url}
              className="block h-[160px] overflow-hidden rounded-2xl md:h-[240px]"
            >
              <img
                src={banner.image}
                alt={banner.title}
                className="h-full w-full object-cover"
              />
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HeroBanner;
