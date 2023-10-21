import { CustomBadRequestException } from 'src/system/infrastructure/exceptions/custom-exceptions/custom-bad-request-exception';

export class CheckIpThePortIsOccupiedByAnotherContractException extends CustomBadRequestException {
  constructor() {
    super({
      code: '',
      guid: '6bb581b2-dbc2-43dc-9a97-4095e0220db0',
      objectOrError: 'Ha ocurrido un error al ejecutar el SP CheckIp',
    });
  }
}
