export class ValidationHelper {
  static isDefined(value: any): boolean {
    return value !== undefined && value !== null;
  }

  static isArrayWithItems(array: any): boolean {
    return Array.isArray(array) && array.length > 0;
  }
}
