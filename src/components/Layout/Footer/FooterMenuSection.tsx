interface FooterMenuSectionProps {
  onOpen: () => void;
}

const FooterMenuSection = ({ onOpen }: FooterMenuSectionProps) => {
  return (
    <div className="fixed bottom-16 left-0 right-0 z-[9] border-t border-gray-200 bg-white lg:hidden">
      <div className="footer-contact-Quick block px-5 py-3">
        <div className="footer-Quick-app">
          <div className="footer-Quick-app-img">
            <img   loading="lazy"
              src={`${import.meta.env.BASE_URL}assets/logo/Logo.png`}
              alt="دیجی‌کالا"
            />
          </div>

          <div className="mr-2 flex flex-col">
            <span className="block font-bold">اپلیکیشن دیجی‌کالا</span>

            <span className="text-sm font-normal text-neutral-400">
              تجربه خرید بهتر
            </span>
          </div>
        </div>

        <div className="footer-call">
          <button type="button" onClick={onOpen}>
            دانلود
          </button>
        </div>
      </div>
    </div>
  );
};

export default FooterMenuSection;
