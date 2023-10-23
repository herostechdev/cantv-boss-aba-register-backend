import { CustomBadRequestException } from 'src/system/infrastructure/exceptions/custom-exceptions/custom-bad-request-exception';

export class IsReservedLoginInternalErrorException extends CustomBadRequestException {
  constructor() {
    super({
      code: '',
      guid: '655b8a4f-55f5-4be6-8474-bbbeaddc5a96',
      objectOrError:
        'Ha ocurrido un error al ejecutar el SP CreateAndProvisionClient',
    });
  }
}
