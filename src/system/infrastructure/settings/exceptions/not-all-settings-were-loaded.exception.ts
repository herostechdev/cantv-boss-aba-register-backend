import { CustomBadRequestException } from 'src/system/infrastructure/exceptions/custom-exceptions/custom-bad-request-exception';
import { IException } from 'src/system/infrastructure/exceptions/custom-exceptions/exception.interface';

export class NotAllSettingsWereLoadedException extends CustomBadRequestException {
  constructor(ids: string[], innerException?: IException) {
    super({
      descriptionOrOptions: `Not all settings were loaded. [ ${ids} ]`,
      innerException: innerException,
    });
  }
}
