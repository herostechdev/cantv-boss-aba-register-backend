import { CustomBadRequestException } from './custom-exceptions/custom-bad-request-exception';
import { IException } from './custom-exceptions/exception.interface';
import { InfrastructureConstants } from '../infrastructure.constants';

export class InputIsNotDefinedException extends CustomBadRequestException {
  constructor(innerException?: IException) {
    super({
      command: InfrastructureConstants.UNKNOWN,
      descriptionOrOptions: 'The input data is not defined',
      innerException: innerException,
    });
  }
}
