export interface IMegaMenuItem {
  title: string;
  url: string;
}

export interface IMegaMenuSection {
  title: string;
  items: IMegaMenuItem[];
}

export interface IMegaMenuColumn {
  type: "grouped" | "simple";
  title: string;
  sections?: IMegaMenuSection[];
  items?: IMegaMenuItem[];
}

export interface IMegaMenu {
  id: string;
  title: string;
  icon: string;
  topLink: {
    title: string;
    url: string;
  };
  columns: IMegaMenuColumn[];
}
