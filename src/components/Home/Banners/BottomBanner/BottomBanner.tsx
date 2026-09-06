import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import type { AppDispatch, RootState } from "../../../../Redux/store";
import { getBannersAction } from "../../../../Redux/Home/Banner/action";

const BottomBanner = () => {
  const dispatch = useDispatch<AppDispatch>();

  const banners = useSelector((state: RootState) => state.banner.banners);

  useEffect(() => {
    dispatch(getBannersAction());
  }, [dispatch]);

  const bottomBanners = banners.filter(
    (banner) => banner.position === "bottom-banner",
  );

  return (
    <section className="mb-8 w-full">
      <div className="mx-auto w-full max-w-[1440px] px-4">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          {bottomBanners.map((banner) => (
            <a
              key={banner.id}
              href={banner.url}
              className="block h-[180px] overflow-hidden rounded-2xl md:h-[240px]"
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

export default BottomBanner;
