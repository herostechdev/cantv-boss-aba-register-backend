import { CustomBadRequestException } from 'src/system/infrastructure/exceptions/custom-exceptions/custom-bad-request-exception';

export class ObtainingInstanceFromAttributeListException extends CustomBadRequestException {
  constructor() {
    super({
      code: '',
      guid: 'e7449ed4-91bf-4b5d-b00b-408028683233',
      objectOrError:
        'Error obteniendo instancia a partir de Lista de Atributos',
    });
  }
}
