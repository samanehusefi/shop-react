import { useSelector } from "react-redux";

import type { RootState } from "../../../Redux/store";

interface AppDownloadSheetProps {
  isOpen: boolean;
  onClose: () => void;
}

const AppDownloadSheet = ({ isOpen, onClose }: AppDownloadSheetProps) => {
  const applicationsMobile = useSelector(
    (state: RootState) => state.footer.applicationsMobile,
  );

  const sortedApplicationsMobile = [...applicationsMobile].sort(
    (a, b) => Number(a.priority) - Number(b.priority),
  );

  return (
    <>
      <div
        className={`fixed inset-0 z-[9998] bg-black/50 transition-opacity duration-300 lg:hidden ${
          isOpen
            ? "pointer-events-auto opacity-100"
            : "pointer-events-none opacity-0"
        }`}
        onClick={onClose}
      />

      <div
        className={`fixed bottom-16 left-0 right-0 z-[9999] rounded-t-2xl bg-white p-4 transition-transform duration-300 lg:hidden ${
          isOpen ? "translate-y-0" : "translate-y-full"
        }`}
      >
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold">دانلود اپلیکیشن دیجی‌کالا</h2>

          <button type="button" onClick={onClose}>
            <img
              className="h-8 w-8"
              src={`${import.meta.env.BASE_URL}assets/icon/close.svg`}
              alt="بستن"
            />
          </button>
        </div>

        <div className="my-4 border-b border-gray-300" />

        <div className="px-5 py-4">
          <div className="grid grid-cols-2 gap-3">
            {sortedApplicationsMobile.map((application) => (
              <a
                key={application.id}
                href={application.url}
                target="_blank"
                rel="noreferrer"
                className="block"
              >
                <img
                  className="w-full"
                  src={`${import.meta.env.BASE_URL}${application.src}`}
                  alt={application.alt}
                  title={application.title}
                />
              </a>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default AppDownloadSheet;
