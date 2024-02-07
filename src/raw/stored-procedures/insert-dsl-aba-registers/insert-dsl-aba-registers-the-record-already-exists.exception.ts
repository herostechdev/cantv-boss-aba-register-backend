import { BossConstants } from 'src/boss/boss.constants';
import { CustomBadRequestException } from 'src/system/infrastructure/exceptions/custom-exceptions/custom-bad-request-exception';

export class TheRecordAlreadyExistsException extends CustomBadRequestException {
  constructor() {
    super({
      code: '',
      guid: '4db8c093-36cd-4776-b400-eae51a3b28ba',
      command: BossConstants.UNKNOWN,
      objectOrError: 'El registro ya existe',
    });
  }
}
