import { BadRequestException } from '@nestjs/common';

export class LikeFilterInvalidValueException extends BadRequestException {
  constructor() {
    super('The like filter value is invalid');
  }
}
