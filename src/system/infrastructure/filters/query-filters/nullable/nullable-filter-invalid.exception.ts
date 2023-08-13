import { BadRequestException } from '@nestjs/common';

export class NullableFilterInvalidException extends BadRequestException {
  constructor() {
    super('The nullable filter value is invalid');
  }
}
