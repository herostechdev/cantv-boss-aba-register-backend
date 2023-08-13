export class NumericHelper {
  static getNumericCode(length: number): number {
    const min = Math.pow(10, length);
    const max = Math.pow(10, length + 1) - 1;
    return Math.floor(Math.random() * (max - min + 1) + min);
  }
}
