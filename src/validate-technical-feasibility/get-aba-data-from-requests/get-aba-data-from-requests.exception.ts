import { CustomBadRequestException } from 'src/system/infrastructure/exceptions/custom-exceptions/custom-bad-request-exception';

export class GetABADataFromRequestsException extends CustomBadRequestException {
  constructor() {
    super({
      code: '',
      guid: '541a8aa4-ffd2-45b7-8fd4-eb43b7a693f3',
      objectOrError: 'Error al obtener los datos de ABA',
    });
  }
}
