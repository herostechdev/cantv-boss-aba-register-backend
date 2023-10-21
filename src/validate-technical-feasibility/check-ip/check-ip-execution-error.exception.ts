import { CustomBadRequestException } from 'src/system/infrastructure/exceptions/custom-exceptions/custom-bad-request-exception';

export class CheckIpExecutionErrorException extends CustomBadRequestException {
  constructor() {
    super({
      code: '',
      guid: '7159e673-b6fe-4f67-b436-e3794dc790e7',
      objectOrError: 'Ha ocurrido un error al ejecutar el SP CheckIp',
    });
  }
}
