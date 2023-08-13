import { CustomBadRequestException } from './custom-exceptions/custom-bad-request-exception';
import { IException } from './custom-exceptions/exception.interface';

export class InputIsNotDefinedException extends CustomBadRequestException {
  constructor(innerException?: IException) {
    super({
      descriptionOrOptions: 'The input data is not defined',
      innerException: innerException,
    });
  }
}
