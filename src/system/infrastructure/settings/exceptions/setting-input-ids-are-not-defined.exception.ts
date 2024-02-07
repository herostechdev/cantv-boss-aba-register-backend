import { CustomBadRequestException } from 'src/system/infrastructure/exceptions/custom-exceptions/custom-bad-request-exception';
import { IException } from 'src/system/infrastructure/exceptions/custom-exceptions/exception.interface';
import { InfrastructureConstants } from '../../infrastructure.constants';

export class SettingInputIdsAreNotDefinedException extends CustomBadRequestException {
  constructor(innerException?: IException) {
    super({
      command: InfrastructureConstants.SETTINGS,
      descriptionOrOptions: 'The setting input Ids are not defined',
      innerException: innerException,
    });
  }
}
