import { CustomBadRequestException } from 'src/system/infrastructure/exceptions/custom-exceptions/custom-bad-request-exception';

export class ISGActionAllowedThereIsNoDataException extends CustomBadRequestException {
  constructor() {
    super({
      code: '',
      guid: 'f811bf1b-959b-4d1c-81ea-fcfa6edb4694',
      objectOrError: 'Sin datos en la consulta. Transacción no exitosa',
    });
  }
}
