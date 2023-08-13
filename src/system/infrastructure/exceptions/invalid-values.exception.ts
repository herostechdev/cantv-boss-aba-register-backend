import { CustomBadRequestException } from './custom-exceptions/custom-bad-request-exception';
import { IException } from './custom-exceptions/exception.interface';

export class InvalidValuesException extends CustomBadRequestException {
  constructor(innerException?: IException) {
    super({
      descriptionOrOptions: 'The input contains invalid values',
      innerException: innerException,
    });
  }
}
