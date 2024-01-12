import { CustomBadRequestException } from 'src/system/infrastructure/exceptions/custom-exceptions/custom-bad-request-exception';

export class DeleteOrderExecutionErrorException extends CustomBadRequestException {
  constructor() {
    super({
      code: '',
      guid: '08c62b8a-caa0-4b9d-8c92-8dd0c2baca09',
      objectOrError: 'Ha ocurrido un error al ejecutar el SP DeleteOrder',
    });
  }
}
