import { CustomBadRequestException } from './custom-exceptions/custom-bad-request-exception';
import { IException } from './custom-exceptions/exception.interface';
import { InfrastructureConstants } from '../infrastructure.constants';

export class EntityDuplicatedException extends CustomBadRequestException {
  constructor(entity: string, innerException?: IException) {
    super({
      command: InfrastructureConstants.UNKNOWN,
      descriptionOrOptions: `The entity ${entity} is duplicated`,
      innerException: innerException,
    });
  }
}
