import { useState } from "react";
import { useSelector } from "react-redux";

import type { RootState } from "../../../Redux/store";

const FooterLinks = () => {
  const { linkgroups, links, social, mobileBrands } = useSelector(
    (state: RootState) => state.footer,
  );

  const [email, setEmail] = useState("");

  const sortedGroups = [...linkgroups].sort(
    (a, b) => Number(a.priority) - Number(b.priority),
  );

  const sortedLinks = [...links].sort(
    (a, b) => Number(a.priority ?? 0) - Number(b.priority ?? 0),
  );

  const sortedSocial = [...social].sort(
    (a, b) => Number(a.priority) - Number(b.priority),
  );

  const sortedBrands = [...mobileBrands].sort(
    (a, b) => Number(a.priority) - Number(b.priority),
  );

  const handleEmailSubmit = () => {
    const emailRegex =
      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

    const value = email.trim();

    if (!emailRegex.test(value)) {
      alert("ایمیل وارد شده معتبر نیست!");
      return;
    }

    const storedEmails: string[] = JSON.parse(
      localStorage.getItem("emails") || "[]",
    );

    if (storedEmails.includes(value)) {
      alert("این ایمیل قبلاً ثبت شده است!");
      return;
    }

    storedEmails.push(value);
    localStorage.setItem("emails", JSON.stringify(storedEmails));

    alert("ایمیل شما با موفقیت ثبت شد!");
    setEmail("");
  };

  return (
    <div className="footer-Quick-Link">
      {sortedGroups.map((group) => {
        const groupLinks = sortedLinks.filter(
          (link) => link.LinkGroupId === group.id,
        );

        return (
          <div key={group.id} className="footer-Quick-Link-text md:my-5">
            <details className="footer-Quick-details group lg:hidden">
              <summary className="footer-Quick-summery">
                <h3 className="footer-Quick-Link-heading">{group.title}</h3>

                <img
                  className="footer-Queick-svg"
                  src={`${import.meta.env.BASE_URL}assets/icon/chevron.svg`}
                  alt="chevron"
                />
              </summary>

              <div className="footer-Queick-Link-Box">
                {groupLinks.map((link) => (
                  <a key={link.id} href={link.url}>
                    {link.title}
                  </a>
                ))}
              </div>
            </details>

            <div className="footer-Quick-Link-Deskctop hidden lg:block">
              <h3 className="footer-Quick-Link-heading">{group.title}</h3>

              {groupLinks.map((link) => (
                <a key={link.id} href={link.url}>
                  {link.title}
                </a>
              ))}
            </div>
          </div>
        );
      })}

      <div className="footer-Quick-Link-text">
        <details className="footer-Quick-details group">
          <summary className="footer-Quick-summery">
            <h3 className="footer-Quick-Link-heading">شرکای تجاری</h3>

            <img
              className="footer-Queick-svg"
              src={`${import.meta.env.BASE_URL}assets/icon/chevron-down.svg`}
              alt="chevron"
            />
          </summary>

          <div className="footer-brands-box-mobile">
            <div className="footer-brands-container">
              {sortedBrands.map((brand) => (
                <a
                  key={brand.id}
                  className="footer-brands-img-mobile"
                  target="_blank"
                  rel="noreferrer"
                  href={brand.url}
                >
                  <img
                    src={`${import.meta.env.BASE_URL}${brand.src}`}
                    alt={brand.alt}
                    title={brand.title}
                  />
                </a>
              ))}
            </div>
          </div>
        </details>

        <div className="hidden lg:block">
          <h3 className="footer-Quick-Link-heading">همراه ما باشید!</h3>

          <div className="footer-social-media">
            {sortedSocial.map((item) => (
              <div key={item.id} className="footer-social-img">
                <a
                  className="block"
                  href={item.url}
                  target="_blank"
                  rel="noreferrer"
                >
                  <img
                    src={`${import.meta.env.BASE_URL}${item.src}`}
                    alt={item.alt}
                    title={item.title}
                  />
                </a>
              </div>
            ))}
          </div>

          <h3 className="footer-Quick-Link-heading !text-base lg:text-lg">
            با ثبت ایمیل، از جدیدترین تخفیف‌ها باخبر شوید
          </h3>

          <div className="footer-register-email">
            <input
              type="email"
              placeholder="ایمیل شما"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
            />

            <button
              type="button"
              disabled={!email.trim()}
              onClick={handleEmailSubmit}
              className={`!cursor-pointer ${
                email.trim() ? "!bg-green-600" : "!bg-gray-300"
              }`}
            >
              ثبت
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FooterLinks;
