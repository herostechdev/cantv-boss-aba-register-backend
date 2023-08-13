import { CustomBadRequestException } from './custom-exceptions/custom-bad-request-exception';
import { IException } from './custom-exceptions/exception.interface';

export class EntityDuplicatedException extends CustomBadRequestException {
  constructor(entity: string, innerException?: IException) {
    super({
      descriptionOrOptions: `The entity ${entity} is duplicated`,
      innerException: innerException,
    });
  }
}
