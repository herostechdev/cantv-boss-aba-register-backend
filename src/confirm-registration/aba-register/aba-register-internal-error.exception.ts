import { CustomBadRequestException } from 'src/system/infrastructure/exceptions/custom-exceptions/custom-bad-request-exception';

export class ABARegisterInternalErrorException extends CustomBadRequestException {
  constructor() {
    super({
      code: '',
      guid: 'b790f1c3-b4a9-4ce1-a6e8-1861646a9c6f',
      objectOrError: 'Ha ocurrido un error al ejecutar el SP AbaRegister',
    });
  }
}
