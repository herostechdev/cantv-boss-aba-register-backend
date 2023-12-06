export class ArrayHelper {
  static isArrayWithItems(array: any): boolean {
    return Array.isArray(array) && array.length > 0;
  }

  static getValue<T>(values: T[], index: number): T {
    if (
      ArrayHelper.isArrayWithItems(values) &&
      index >= 0 &&
      values.length > index
    ) {
      return values[index];
    }
    return null;
  }

  static intersect<T>(left: T[], right: T[]): T[] {
    return left.filter((val1) => {
      return right.find((val2) => val1 === val2);
    });
  }

  static difference<T>(left: T[], right: T[]): T[] {
    return left.filter((x) => !right.includes(x));
  }

  static symetricalDifference<T>(left: T[], right: T[]): T[] {
    return left
      .filter((x) => !right.includes(x))
      .concat(right.filter((x) => !left.includes(x)));
  }

  static union<T>(left: T[], right: T[]): T[] {
    return [...left, ...right];
  }
}
