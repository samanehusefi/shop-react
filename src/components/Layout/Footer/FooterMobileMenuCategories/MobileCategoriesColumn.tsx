import { useState } from "react";
import { LuChevronDown } from "react-icons/lu";

import type { IMegaMenuColumn } from "../../../../Types/Header/IMegaMenu";

import MobileCategoriesItem from "./MobileCategoriesItem";

interface MobileCategoriesColumnProps {
  column: IMegaMenuColumn;
}

const MobileCategoriesColumn = ({ column }: MobileCategoriesColumnProps) => {
  const [openSection, setOpenSection] = useState<string | null>(null);

  if (column.type === "simple" && column.items) {
    return (
      <div className="overflow-hidden rounded-lg  bg-white">
        <div className="divide-y divide-gray-100">
          {column.items.map((item) => (
            <MobileCategoriesItem key={item.url} item={item} />
          ))}
        </div>
      </div>
    );
  }

  if (column.type === "grouped" && column.sections) {
    return (
      <div className="space-y-2">
        {column.sections.map((section) => {
          const isOpen = openSection === section.title;

          return (
            <div
              key={section.title}
              className="overflow-hidden  border-b border-gray-200 bg-white"
            >
              <button
                type="button"
                onClick={() => setOpenSection(isOpen ? null : section.title)}
                className="flex w-full items-center justify-between gap-2 px-3 py-4 text-right"
              >
                <span className="flex min-w-0 items-center gap-2">
                  {/* <span className="h-4 w-0.5 shrink-0 rounded-full bg-red-500" /> */}

                  <span className="truncate text-sm  text-gray-900">
                    {section.title}
                  </span>
                </span>

                <LuChevronDown
                  size={18}
                  className={`shrink-0 text-gray-500 transition-transform duration-200 ${
                    isOpen ? "rotate-180" : ""
                  }`}
                />
              </button>

              {isOpen && (
                <div className="border-t border-gray-100 px-3">
                  <ul className="divide-y divide-gray-100">
                    {section.items.map((item) => (
                      <MobileCategoriesItem key={item.url} item={item} />
                    ))}
                  </ul>
                </div>
              )}
            </div>
          );
        })}
      </div>
    );
  }

  return null;
};

export default MobileCategoriesColumn;
