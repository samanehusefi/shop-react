export interface IFooterLogo {
  desktopSrc: string;
  alt: string;
  title: string;
}

export interface IFooterApplication {
  id: number;
  title: string;
  url: string;
  src: string;
  alt: string;
  priority: number | string;
}

export interface IFooterBrand {
  id: number;
  title: string;
  alt: string;
  src: string;
  url: string;
  priority: number;
}

export interface IFooterCertificate {
  id: number;
  title: string;
  image: string;
  url: string;
}

export interface IFooterLinkGroup {
  id: number;
  title: string;
  priority: number;
}

export interface IFooterLink {
  id: number;
  title: string;
  url: string;
  priority?: number;
  LinkGroupId: number;
}

export interface IFooterSocial {
  id: number;
  title: string;
  src: string;
  url: string;
  alt: string;
  priority: number;
}

export interface IFooterSupport {
  id: number;
  url: string;
  src: string;
  alt: string;
  text: string;
  priority: number | string;
}

export interface IFooterSmsNumber {
  type: string;
  value: string;
  priority: number;
}

export interface IFooterPhoneType {
  id: number;
  value: string;
  priority: number;
}

export interface IFooterSupportPhone {
  id: number;
  typeId: number;
  value: string;
  priority: number;
}

export interface IFooterAddress {
  type: string;
  value: string;
  priority: number;
}

export interface IFooterContact {
  id: number;
  title: string;
  priority: number;
  description: string;
  smsInfo: {
    numbers: IFooterSmsNumber[];
    warning: string;
    reportEmail: string;
    note: string;
  };
  phoneTypes: IFooterPhoneType[];
  supportPhones: IFooterSupportPhone[];
  addresses: IFooterAddress[];
  content: string;
}

export interface IFooterAbout {
  id: number;
  title: string;
  content: string;
}

export interface FooterState {
  logo: IFooterLogo | null;
  applications: IFooterApplication[];
  applicationsMobile: IFooterApplication[];
  brands: IFooterBrand[];
  mobileBrands: IFooterBrand[];
  certificates: IFooterCertificate[];
  linkgroups: IFooterLinkGroup[];
  links: IFooterLink[];
  social: IFooterSocial[];
  supports: IFooterSupport[];
  about: IFooterAbout | null;
  contact: IFooterContact | null;
  loading: boolean;
  error: string | null;
}
