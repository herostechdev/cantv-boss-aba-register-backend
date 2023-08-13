import { BadRequestException } from '@nestjs/common';

export class InFilterInvalidValuesException extends BadRequestException {
  constructor() {
    super('The in filter values are invalid');
  }
}
