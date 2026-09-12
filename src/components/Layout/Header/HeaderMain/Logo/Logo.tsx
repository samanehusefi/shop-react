import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

import type { RootState } from "../../../../../Redux/store";

const Logo = () => {
  const logo = useSelector(
    (state: RootState) => state.header.data?.company.logo,
  );

  if (!logo) {
    return null;
  }

  const logoSrc = `${import.meta.env.BASE_URL}${logo.desktopSrc.replace(
    /^\/+/,
    "",
  )}`;

  return (
    <Link to="/" title={logo.title} className="md:flex items-center shrink-0">
      <img
        loading="lazy"
        src={logoSrc}
        alt={logo.alt}
        className="h-5 w-auto object-contain md:h-8"
      />
    </Link>
  );
};

export default Logo;
