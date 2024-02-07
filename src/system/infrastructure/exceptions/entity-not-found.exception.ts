import { CustomBadRequestException } from './custom-exceptions/custom-bad-request-exception';
import { IException } from './custom-exceptions/exception.interface';
import { InfrastructureConstants } from '../infrastructure.constants';

export class EntityNotFoundException extends CustomBadRequestException {
  constructor(entity: string, innerException?: IException) {
    super({
      command: InfrastructureConstants.UNKNOWN,
      descriptionOrOptions: `The entity ${entity} was not found`,
      innerException: innerException,
    });
  }
}
