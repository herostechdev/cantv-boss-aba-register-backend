import { CustomBadRequestException } from './custom-exceptions/custom-bad-request-exception';
import { IException } from './custom-exceptions/exception.interface';

export class InvalidUUIDException extends CustomBadRequestException {
  constructor(uuid: string, innerException?: IException) {
    super({
      descriptionOrOptions: `The UUID ${uuid} is invalid`,
      innerException: innerException,
    });
  }
}
