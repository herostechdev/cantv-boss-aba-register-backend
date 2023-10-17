import { CustomBadRequestException } from 'src/system/infrastructure/exceptions/custom-exceptions/custom-bad-request-exception';

export class GetPortIdFromIpExecutionException extends CustomBadRequestException {
  constructor() {
    super({
      code: '',
      guid: '8b2634a3-2cbe-44ef-9797-f05a5ca0c3e8',
      objectOrError:
        'Ha ocurrido un error al ejecutare el Stored Procedure GetPortidFromIp',
    });
  }
}
