import { useSelector } from "react-redux";

import type { RootState } from "../../../Redux/store";

const FooterBrands = () => {
  const brands = useSelector((state: RootState) => state.footer.brands);

  const sortedBrands = [...brands].sort(
    (a, b) => Number(a.priority) - Number(b.priority),
  );

  return (
    <div className="footer-brands-box">
      <div className="footer-brands-container">
        {sortedBrands.map((brand) => (
          <a
            key={brand.id}
            className="footer-brands-img"
            target="_blank"
            rel="noreferrer"
            href={brand.url}
          >
            <img   loading="lazy"
              src={`${import.meta.env.BASE_URL}${brand.src}`}
              alt={brand.alt}
              title={brand.title}
            />
          </a>
        ))}
      </div>
    </div>
  );
};

export default FooterBrands;
