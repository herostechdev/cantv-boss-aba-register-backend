import { CustomBadRequestException } from 'src/system/infrastructure/exceptions/custom-exceptions/custom-bad-request-exception';
import { IException } from 'src/system/infrastructure/exceptions/custom-exceptions/exception.interface';
import { InfrastructureConstants } from '../../infrastructure.constants';

export class NotAllSettingsWereLoadedException extends CustomBadRequestException {
  constructor(ids: string[], innerException?: IException) {
    super({
      command: InfrastructureConstants.SETTINGS,
      descriptionOrOptions: `Not all settings were loaded. [ ${ids} ]`,
      innerException: innerException,
    });
  }
}
