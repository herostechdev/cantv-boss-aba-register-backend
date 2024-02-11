import { BossConstants } from 'src/boss/boss.constants';
import { CustomBadRequestException } from 'src/system/infrastructure/exceptions/custom-exceptions/custom-bad-request-exception';

export class CreateUserInstanceException extends CustomBadRequestException {
  constructor() {
    super({
      code: '',
      guid: '73844ebf-4d93-4f96-8f06-7aa604b028a5',
      command: BossConstants.CREATE_AND_PROVISIONING_MASTER_ACCOUNT,
      objectOrError: 'Error Creando Instancia de Usuario',
    });
  }
}
