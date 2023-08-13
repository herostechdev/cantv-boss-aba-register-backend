import { CustomBadRequestException } from 'src/system/infrastructure/exceptions/custom-exceptions/custom-bad-request-exception';
import { IException } from 'src/system/infrastructure/exceptions/custom-exceptions/exception.interface';

export class SettingInputIdsAreNotDefinedException extends CustomBadRequestException {
  constructor(innerException?: IException) {
    super({
      descriptionOrOptions: 'The setting input Ids are not defined',
      innerException: innerException,
    });
  }
}
