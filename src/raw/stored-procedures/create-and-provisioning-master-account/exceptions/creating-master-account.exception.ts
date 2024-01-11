import { CustomBadRequestException } from 'src/system/infrastructure/exceptions/custom-exceptions/custom-bad-request-exception';

export class CreatingMasterAccountException extends CustomBadRequestException {
  constructor() {
    super({
      code: '',
      guid: 'b743b092-7ef0-4234-9844-c0edd9b65c93',
      objectOrError: 'Error Creando Cuenta Maestra',
    });
  }
}
