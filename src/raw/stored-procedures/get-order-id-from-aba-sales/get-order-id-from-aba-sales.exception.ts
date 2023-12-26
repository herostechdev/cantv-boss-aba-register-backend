import { CustomBadRequestException } from 'src/system/infrastructure/exceptions/custom-exceptions/custom-bad-request-exception';
import { toIException } from 'src/system/infrastructure/exceptions/custom-exceptions/exception.interface';

export class GetOrderIdFromABASalesException extends CustomBadRequestException {
  constructor(innerException?: any) {
    super({
      code: '',
      guid: 'fa9a1ddf-fc90-45cc-a89d-f99cdf99a79e',
      objectOrError: 'Error al ejecutar el SP GetlfRemoteInstallerIP',
      innerException: toIException(innerException),
    });
  }
}
