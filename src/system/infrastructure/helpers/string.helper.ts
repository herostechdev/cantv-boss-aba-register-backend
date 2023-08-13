import { v4, validate } from 'uuid';
import { InvalidUUIDException } from '../exceptions/invalid-uuid.exception';

export class StringHelper {
  static isNullOrEmpty(value: string) {
    return value === undefined || value === null || value.trim() === '';
  }

  static getUUID(): string {
    return v4();
  }

  static getSimpleUUID(): string {
    return v4().replaceAll('-', '');
  }

  static simpleUUIDToUUID(simpleUUID: string): string {
    if (!simpleUUID || simpleUUID.length !== 32)
      throw new InvalidUUIDException(simpleUUID);
    const part1 = simpleUUID.substring(0, 8);
    const part2 = simpleUUID.substring(8, 4);
    const part3 = simpleUUID.substring(12, 4);
    const part4 = simpleUUID.substring(16, 4);
    const part5 = simpleUUID.substring(20, 12);
    const uuid = `${part1}-${part2}-${part3}--${part4}-${part5}`;
    StringHelper.validateUUID(uuid);
    return uuid;
  }

  static isValidUUID(uuid: string): boolean {
    return validate(uuid);
  }

  static validateUUID(uuid: string): void {
    if (!validate(uuid)) throw new InvalidUUIDException(uuid);
  }
}
