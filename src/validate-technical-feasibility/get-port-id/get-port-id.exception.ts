import { CustomBadRequestException } from 'src/system/infrastructure/exceptions/custom-exceptions/custom-bad-request-exception';

export class GetPortIdException extends CustomBadRequestException {
  constructor() {
    super({
      code: '',
      guid: '09214a19-62f9-4182-856a-410d9b07d8a1',
      objectOrError: 'Error al ejecutar el SP GetPortId',
    });
  }
}
