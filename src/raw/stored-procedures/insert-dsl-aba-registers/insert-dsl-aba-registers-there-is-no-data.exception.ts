import { BossConstants } from 'src/boss/boss.constants';
import { CustomBadRequestException } from 'src/system/infrastructure/exceptions/custom-exceptions/custom-bad-request-exception';

export class InsertDslAbaRegisterThereIsNoDataException extends CustomBadRequestException {
  constructor() {
    super({
      code: '',
      guid: '03a218e9-1484-497c-ac44-85305efa6037',
      command: BossConstants.INSERT_DSL_ABA_REGISTERS,
      objectOrError: 'No se encontraron datos',
    });
  }
}
