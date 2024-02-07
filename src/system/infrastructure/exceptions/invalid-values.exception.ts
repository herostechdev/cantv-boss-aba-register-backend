import { CustomBadRequestException } from './custom-exceptions/custom-bad-request-exception';
import { IException } from './custom-exceptions/exception.interface';
import { InfrastructureConstants } from '../infrastructure.constants';

export class InvalidValuesException extends CustomBadRequestException {
  constructor(innerException?: IException) {
    super({
      command: InfrastructureConstants.UNKNOWN,
      descriptionOrOptions: 'The input contains invalid values',
      innerException: innerException,
    });
  }
}
