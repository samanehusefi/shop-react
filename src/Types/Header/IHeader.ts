export interface IHeaderData {
  id: number;
  company: ICompanyData;
  seo?: ISeoData;
}

export interface ICompanyData {
  name: string;
  tagline?: string | null;
  logo: IImageData;
}
export interface IImageData {
  desktopSrc: string;
  mobileSrc: string;
  alt: string;
  title: string;
}
export interface ISeoData {
  description: string;
  keywords: string[];
  title: string;
}
