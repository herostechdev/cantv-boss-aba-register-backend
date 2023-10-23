import { CustomBadRequestException } from 'src/system/infrastructure/exceptions/custom-exceptions/custom-bad-request-exception';

export class CancelABAInstallationInternalErrorException extends CustomBadRequestException {
  constructor() {
    super({
      code: '',
      guid: '8eeb931b-7549-4e38-b4a1-ce42b996d902',
      objectOrError:
        'Ha ocurrido un error al ejecutar el SP CancelABAInstallation',
    });
  }
}
