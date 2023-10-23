import { CustomBadRequestException } from 'src/system/infrastructure/exceptions/custom-exceptions/custom-bad-request-exception';

export class ABARegisterOccupiedPortException extends CustomBadRequestException {
  constructor() {
    super({
      code: '',
      guid: 'aed28165-b9b3-4988-90d7-961e8447525d',
      objectOrError: 'Puerto Ocupado',
    });
  }
}
