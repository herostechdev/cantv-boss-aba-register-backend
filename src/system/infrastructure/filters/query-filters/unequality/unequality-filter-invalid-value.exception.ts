import { BadRequestException } from '@nestjs/common';

export class UnequalityFilterInvalidValueException extends BadRequestException {
  constructor() {
    super('The unequality filter value is invalid');
  }
}
