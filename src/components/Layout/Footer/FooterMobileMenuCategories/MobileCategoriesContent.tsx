import type { IMegaMenu } from "../../../../Types/Header/IMegaMenu";

import MobileCategoriesColumn from "./MobileCategoriesColumn";

interface MobileCategoriesContentProps {
  activeMenu?: IMegaMenu;
}

const MobileCategoriesContent = ({
  activeMenu,
}: MobileCategoriesContentProps) => {
  if (!activeMenu) {
    return (
      <main className="min-w-0 flex-1 bg-white px-4 py-5">
        <div className="text-center text-sm text-gray-400">
          در حال بارگذاری...
        </div>
      </main>
    );
  }

  return (
    <main className="min-w-0 flex-1 overflow-y-auto bg-white px-4 py-5">
      <a
        href={activeMenu.topLink.url}
        className="mb-5 block text-sm font-medium text-[#0d4485]"
      >
        {activeMenu.topLink.title}
      </a>

      <div className="space-y-3">
        {activeMenu.columns.map((column, index) => (
          <MobileCategoriesColumn
            key={`${column.title}-${index}`}
            column={column}
          />
        ))}
      </div>
    </main>
  );
};

export default MobileCategoriesContent;
