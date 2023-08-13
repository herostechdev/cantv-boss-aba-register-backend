export interface IFilterCondition {
  field: string;
  operator: string;
  rawValue: string;
  value: string | string[];
  predicateLayout: string;
}
