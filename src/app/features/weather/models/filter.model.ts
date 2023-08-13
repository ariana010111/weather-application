export interface FilterModel {
  search: Search;
}
export interface Search {
  property?: string;
  term?: string;
  doSearch?: boolean;
}
