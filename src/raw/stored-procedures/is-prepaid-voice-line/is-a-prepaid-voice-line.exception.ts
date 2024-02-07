import { BossConstants } from 'src/boss/boss.constants';
import { CustomBadRequestException } from 'src/system/infrastructure/exceptions/custom-exceptions/custom-bad-request-exception';

export class IsPrepaidVoiceLineException extends CustomBadRequestException {
  constructor() {
    super({
      code: '',
      guid: 'a6360b68-d3eb-46d2-9d93-ed76077794f9',
      command: BossConstants.IS_PREPAID,
      objectOrError:
        'El Cliente debe contactar a Atención al Cliente pata migrar lína de voz prepago.',
    });
  }
}
