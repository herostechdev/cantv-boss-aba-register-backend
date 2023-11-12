import { CustomBadRequestException } from 'src/system/infrastructure/exceptions/custom-exceptions/custom-bad-request-exception';
import { toIException } from 'src/system/infrastructure/exceptions/custom-exceptions/exception.interface';

export class IsIpAllowedException extends CustomBadRequestException {
  constructor(innerException?: any) {
    super({
      code: '',
      guid: 'a4abcfef-3400-4976-baa9-e8392359b7f9',
      objectOrError: 'Error al ejecutar el SP GetlfRemoteInstallerIP',
      innerException: toIException(innerException),
    });
  }
}
