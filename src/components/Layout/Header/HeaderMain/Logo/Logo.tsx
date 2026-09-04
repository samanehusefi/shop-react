import { useSelector } from "react-redux";
import type { RootState } from "../../../../../Redux/store";

const Logo = () => {
  const logo = useSelector((state: RootState) => state.header.data?.company.logo);
  console.log("HEADER DATA:", logo);
  if (!logo) {
    return null;
  }
  const logoSrc = `${import.meta.env.BASE_URL}${logo.desktopSrc.replace(
    /^\/+/,
    "",
  )}`;
  return (
    <a
      href="/"
      title={logo.title}
      className="hidden md:flex items-center shrink-0"
    >
      <img
        src={logoSrc}
        alt={logo.alt}
        className="h-7 w-auto object-contain md:h-8"
      />
    </a>
  );
};

export default Logo;
