import { useSelector } from "react-redux";

import type { RootState } from "../../../Redux/store";

interface FooterContatProps {
  onOpen: () => void;
}

const FooterContat = ({ onOpen }: FooterContatProps) => {
  const { contact } = useSelector((state: RootState) => state.footer);

  if (!contact) {
    return null;
  }

  const phoneGroups = [...contact.phoneTypes].sort(
    (a, b) => Number(a.priority) - Number(b.priority),
  );

  const supportPhones = [...contact.supportPhones].sort(
    (a, b) => Number(a.priority) - Number(b.priority),
  );

  const renderPhoneType = (group: (typeof phoneGroups)[number]) => {
    const groupPhones = supportPhones.filter(
      (phone) => phone.typeId === group.id,
    );

    if (!groupPhones.length) {
      return null;
    }

    const firstPhone = groupPhones[0]?.value ?? "";
    const secondPhone = groupPhones[1]?.value ?? "";

    return (
      <div key={group.id} className="flex items-center">
        <p className="shrink-0">
          {group.value} <span dir="ltr">{firstPhone}</span>
        </p>

        <div className="hidden px-5 text-neutral-400 md:block">|</div>

        <span dir="ltr" className="w-[140px]">
          {secondPhone}
        </span>

        <div className="hidden px-5 text-neutral-400 md:block">|</div>
      </div>
    );
  };

  return (
    <div className="footer-contact">
      <div className="hidden lg:flex">
        {phoneGroups.map((group) => renderPhoneType(group))}

        <p className="mt-1 w-full md:mt-0">{contact.description}</p>
      </div>

      <div className="footer-contact-Quick block lg:hidden">
        <div className="footer-Quick-contact">
          <div className="footer-Quick-contact-img">
            <img src="/assets/icon/support.svg" alt="پشتیبانی" />
          </div>

          <div className="mr-2 flex flex-col">
            <span className="block font-bold">تماس با پشتیبانی</span>

            <span className="text-sm font-normal text-neutral-400">
              ۷ روز هفته، ۲۴ ساعت
            </span>
          </div>
        </div>

        <div className="footer-call">
          {supportPhones[0] && (
            <a href={`tel:${supportPhones[0].value.replace(/\s/g, "")}`}>
              تماس
            </a>
          )}
        </div>
      </div>

      <div className="footer-contact-Quick block lg:hidden">
        <div className="footer-Quick-app">
          <div className="footer-Quick-app-img">
            <img src="/assets/logo/Logo.png" alt="دیجی‌کالا" />
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

export default FooterContat;
