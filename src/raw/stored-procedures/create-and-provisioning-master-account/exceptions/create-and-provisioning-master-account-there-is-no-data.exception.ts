import { CustomBadRequestException } from 'src/system/infrastructure/exceptions/custom-exceptions/custom-bad-request-exception';

export class CreateAndProvisioningMasterAccountThereIsNoDataException extends CustomBadRequestException {
  constructor() {
    super({
      code: '',
      guid: '5121ab8c-991b-42aa-9f69-cdc4415c190f',
      objectOrError: 'Error No Hay Datos',
    });
  }
}
