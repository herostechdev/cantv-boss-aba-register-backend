import { CustomBadRequestException } from 'src/system/infrastructure/exceptions/custom-exceptions/custom-bad-request-exception';

export class GetStateFromSerialException extends CustomBadRequestException {
  constructor() {
    super({
      code: '',
      guid: 'a9e28584-d4fc-42c7-a033-652cba327f9e',
      objectOrError: 'Error al ejecutar el SP GetStateFromSerial',
    });
  }
}
