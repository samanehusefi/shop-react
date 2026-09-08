import { useState } from "react";
import { useSelector } from "react-redux";
import { FaChevronLeft } from "react-icons/fa";

import type { RootState } from "../../../Redux/store";

const FooterAbout = () => {
  const [isExpanded, setIsExpanded] = useState(false);

  const { about, certificates } = useSelector(
    (state: RootState) => state.footer,
  );

  if (!about) {
    return null;
  }

  return (
    <div className="footer-about-digikala mt-3">
      <div className="grow">
        <div
          className={`footer-aboutUs seo ${
            isExpanded
              ? "!h-auto before:hidden"
              : "!h-24 lg:!h-32 overflow-hidden"
          }`}
        >
          <h1>{about.title}</h1>

          <div dangerouslySetInnerHTML={{ __html: about.content }} />
        </div>

        <button
          type="button"
          onClick={() => setIsExpanded((prev) => !prev)}
          className="footer-show-more"
        >
          <span>{isExpanded ? "بستن" : "مشاهده بیشتر"}</span>

          <div
            className={`footer-show-more-icon transition-transform duration-300 ${
              isExpanded ? "-rotate-90" : "rotate-0"
            }`}
          >
            <FaChevronLeft className="mr-1 mt-1 text-sm text-[#1672dd]" />
          </div>
        </button>
      </div>

      <div className="footer-namad">
        {certificates.map((certificate) => (
          <a
            key={certificate.id}
            href={certificate.url}
            target="_blank"
            rel="noreferrer"
          >
            <img   loading="lazy"
              className="inline-block w-full"
              src={`${import.meta.env.BASE_URL}${certificate.image}`}
              width="75"
              height="75"
              alt={certificate.title || "certificate"}
            />
          </a>
        ))}
      </div>
    </div>
  );
};

export default FooterAbout;
