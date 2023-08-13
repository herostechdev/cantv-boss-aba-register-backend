import { BadRequestException } from '@nestjs/common';

export class BetweenFilterInvalidValuesException extends BadRequestException {
  constructor() {
    super('The between filter values are invalid');
  }
}
