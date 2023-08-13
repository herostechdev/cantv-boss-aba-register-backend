import { BadRequestException } from '@nestjs/common';

export class EqualityFilterInvalidValueException extends BadRequestException {
  constructor() {
    super('The equality filter value is invalid');
  }
}
