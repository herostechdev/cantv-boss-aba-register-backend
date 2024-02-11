import { BossConstants } from 'src/boss/boss.constants';
import { CustomBadRequestException } from 'src/system/infrastructure/exceptions/custom-exceptions/custom-bad-request-exception';

export class UpdatePasswordFromLoginThereIsNoDataException extends CustomBadRequestException {
  constructor() {
    super({
      code: '',
      guid: '699c0488-db65-4551-8180-12908a889c5a',
      command: BossConstants.UPDATE_PASSWORD_FROM_LOGIN,
      objectOrError: 'No hay datos',
    });
  }
}
