import { useSelector } from "react-redux";

import type { RootState } from "../../../Redux/store";

interface FooterDownloadProps {
  onOpen: () => void;
}

const FooterDownload = ({ onOpen }: FooterDownloadProps) => {
  const applications = useSelector(
    (state: RootState) => state.footer.applications,
  );

  const sortedApplications = [...applications].sort(
    (a, b) => Number(a.priority) - Number(b.priority),
  );

  return (
    <div className="footer-app-download">
      <div className="footer-app-r-text">
        <div className="footer-app-r-img">
          <img   loading="lazy"
            src={`${import.meta.env.BASE_URL}assets/application/footerlogo2.webp`}
            alt="دیجی‌کالا"
          />
        </div>

        <div className="footer-app-r-text">
          <p>دانلود اپلیکیشن دیجی‌کالا</p>
        </div>
      </div>

      <div className="footer-app-l-link">
        <div className="footer-app-l-link-primary">
          {sortedApplications.map((application) => (
            <a
              key={application.id}
              href={application.url}
              target="_blank"
              rel="noreferrer"
            >
              <img   loading="lazy"
                src={`${import.meta.env.BASE_URL}${application.src}`}
                alt={application.alt}
                title={application.title}
              />
            </a>
          ))}
        </div>

        <button type="button" className="footer-link-more" onClick={onOpen}>
          <img   loading="lazy"
            src={`${import.meta.env.BASE_URL}assets/application/More.svg`}
            alt="بیشتر"
          />
        </button>
      </div>
    </div>
  );
};

export default FooterDownload;
