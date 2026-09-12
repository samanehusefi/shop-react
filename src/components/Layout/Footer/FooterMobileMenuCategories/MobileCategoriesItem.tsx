import { LuChevronLeft } from "react-icons/lu";

import type { IMegaMenuItem } from "../../../../Types/Header/IMegaMenu";

interface MobileCategoriesItemProps {
  item: IMegaMenuItem;
}

const MobileCategoriesItem = ({ item }: MobileCategoriesItemProps) => {
  return (
    <li>
      <a
        href={item.url}
        className="flex items-center justify-between gap-2 border-b border-gray-100 py-6 text-xs leading-5 text-gray-500 transition-colors hover:text-red-500"
      >
        <span className="min-w-0 flex-1">{item.title}</span>

        <LuChevronLeft size={14} className="shrink-0 text-gray-300" />
      </a>
    </li>
  );
};

export default MobileCategoriesItem;
