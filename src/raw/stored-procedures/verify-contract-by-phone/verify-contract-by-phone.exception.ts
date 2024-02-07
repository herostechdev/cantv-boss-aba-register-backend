import { BossConstants } from 'src/boss/boss.constants';
import { CustomBadRequestException } from 'src/system/infrastructure/exceptions/custom-exceptions/custom-bad-request-exception';

export class VerifyContractByPhoneException extends CustomBadRequestException {
  constructor() {
    super({
      code: '',
      guid: 'bffecd5f-3d17-4b59-b7e6-a811218dacf9',
      command: BossConstants.VERIFY_CONTRACT_BY_PHONE,
      objectOrError: 'Error al verificar el contrato por número de teléfono',
    });
  }
}
