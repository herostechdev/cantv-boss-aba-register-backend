import { BossConstants } from 'src/boss/boss.constants';
import { CustomBadRequestException } from 'src/system/infrastructure/exceptions/custom-exceptions/custom-bad-request-exception';
//THERE_IS_NOT_CONTRACT_ASSOCIATED_WITH_THE_PORT
export class CheckIpThereIsNotContractAssociatedWithThePortException extends CustomBadRequestException {
  constructor() {
    super({
      code: '',
      guid: '6ad8422a-bf20-48cc-9a51-a641d8e8c407',
      command: BossConstants.CHECK_IP,
      objectOrError: 'No existe un contrato asociado al Puerto',
    });
  }
}
