import { CustomBadRequestException } from 'src/system/infrastructure/exceptions/custom-exceptions/custom-bad-request-exception';

export class GetDataFromRequestsThereIsNoDataException extends CustomBadRequestException {
  constructor() {
    super({
      code: '',
      guid: 'de53b5df-cfb3-40f0-b6f4-57068da1be88',
      objectOrError: 'No existen datos del abonado',
    });
  }
}
