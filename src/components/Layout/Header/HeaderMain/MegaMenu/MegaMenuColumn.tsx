import type { IMegaMenuColumn } from "../../../../../Types/Header/IMegaMenu";

import MegaMenuItem from "./MegaMenuItem";

interface MegaMenuColumnProps {
  column: IMegaMenuColumn;
}

const MegaMenuColumn = ({ column }: MegaMenuColumnProps) => {
  return (
    <div className="min-w-0">
      <h3
        className="
          mb-4
          flex
          items-center
          gap-2
          text-sm
          font-bold
          text-gray-900
        "
      >
        <span className="h-4 w-0.5 rounded-full bg-red-500" />

        {column.title}
      </h3>

      {column.type === "simple" && column.items && (
        <ul className="space-y-1">
          {column.items.map((item) => (
            <MegaMenuItem key={item.url} item={item} />
          ))}
        </ul>
      )}

      {column.type === "grouped" && column.sections && (
        <div className="space-y-5">
          {column.sections.map((section) => (
            <div key={section.title}>
              <h4
                className="
                  mb-2
                  text-xs
                  font-semibold
                  text-gray-700
                "
              >
                {section.title}
              </h4>

              <ul className="space-y-1">
                {section.items.map((item) => (
                  <MegaMenuItem key={item.url} item={item} />
                ))}
              </ul>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MegaMenuColumn;
