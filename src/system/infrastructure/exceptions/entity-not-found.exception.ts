import { CustomBadRequestException } from './custom-exceptions/custom-bad-request-exception';
import { IException } from './custom-exceptions/exception.interface';

export class EntityNotFoundException extends CustomBadRequestException {
  constructor(entity: string, innerException?: IException) {
    super({
      descriptionOrOptions: `The entity ${entity} was not found`,
      innerException: innerException,
    });
  }
}
