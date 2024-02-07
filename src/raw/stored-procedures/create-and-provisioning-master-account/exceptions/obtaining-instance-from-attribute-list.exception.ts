import { BossConstants } from 'src/boss/boss.constants';
import { CustomBadRequestException } from 'src/system/infrastructure/exceptions/custom-exceptions/custom-bad-request-exception';

export class ObtainingInstanceFromAttributeListException extends CustomBadRequestException {
  constructor() {
    super({
      code: '',
      guid: 'e7449ed4-91bf-4b5d-b00b-408028683233',
      command: BossConstants.CREATE_AND_PROVISIONING_MASTER_ACCOUNT,
      objectOrError:
        'Error obteniendo instancia a partir de Lista de Atributos',
    });
  }
}
