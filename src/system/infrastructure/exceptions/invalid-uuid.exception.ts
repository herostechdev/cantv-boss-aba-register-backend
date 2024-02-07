import { CustomBadRequestException } from './custom-exceptions/custom-bad-request-exception';
import { IException } from './custom-exceptions/exception.interface';
import { InfrastructureConstants } from '../infrastructure.constants';

export class InvalidUUIDException extends CustomBadRequestException {
  constructor(uuid: string, innerException?: IException) {
    super({
      command: InfrastructureConstants.UNKNOWN,
      descriptionOrOptions: `The UUID ${uuid} is invalid`,
      innerException: innerException,
    });
  }
}
