export class CollectionParams {
  page = 1;
  limit?: number;
  order?: string[];
  search: Search = {};
  logic?: LogicSearch;
}

export class Search {
  [key: string]: SearchField
}

export class SearchField {
  type?: 'CONTAINS' | 'STARTS' | 'ENDS';
  value?: string;
}

export enum LogicSearch {
  AND = 'and',
  OR = 'or',
}
