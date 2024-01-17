import { CustomBadRequestException } from 'src/system/infrastructure/exceptions/custom-exceptions/custom-bad-request-exception';

export class GetDataFromRequestsException extends CustomBadRequestException {
  constructor() {
    super({
      code: '',
      guid: 'f11f88fa-310e-4f7e-a3ec-ae3622ad4fc3',
      objectOrError: 'Error al ejecutar el SP GetDataFromRequests',
    });
  }
}
