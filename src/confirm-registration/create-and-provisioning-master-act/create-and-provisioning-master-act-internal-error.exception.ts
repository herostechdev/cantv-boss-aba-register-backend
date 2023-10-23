import { CustomBadRequestException } from 'src/system/infrastructure/exceptions/custom-exceptions/custom-bad-request-exception';

export class CreateAndProvisioningMasterActInternalErrorException extends CustomBadRequestException {
  constructor() {
    super({
      code: '',
      guid: '9dc3cefb-fcf8-4241-b800-f677d25dbdcc',
      objectOrError:
        'Ha ocurrido un error al ejecutar el SP CreateAndProvisionMasterAct',
    });
  }
}
