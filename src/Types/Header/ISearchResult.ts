export interface ISearchResult {
  title: string;
  type: SearchResultType;
}
export type SearchResultType = "product" | "category" | "brand" | "option";
