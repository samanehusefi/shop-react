export interface IBanner {
  id: number;
  title: string;
  url: string;
  image: string;
  position: "hero" | "top-banner" | "middle-banner" | "bottom-banner";
}
