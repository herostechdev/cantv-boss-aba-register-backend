import { BadRequestException } from '@nestjs/common';

export class FieldBooleanInvalidException extends BadRequestException {
  constructor(field: string, value: any) {
    super(
      `The field: ${field} with the value: ${value} is invalid. A boolean is expected.`,
    );
  }
}
