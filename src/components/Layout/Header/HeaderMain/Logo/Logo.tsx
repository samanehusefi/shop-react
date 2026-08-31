import { useSelector } from "react-redux";

const Logo = () => {
  debugger;
  const logo = useSelector((state: any) => state.header.data?.company.logo);
  if (!logo) {
    return null;
  }
  return (
    <a
      href="/"
      title={logo.title}
      className="hidden md:flex items-center shrink-0"
    >
      <img
        src={logo.desktopSrc}
        alt={logo.alt}
        className="h-7 w-auto object-contain md:h-8"
      />
    </a>
  );
};

export default Logo;
