import { BossConstants } from 'src/boss/boss.constants';
import { CustomBadRequestException } from 'src/system/infrastructure/exceptions/custom-exceptions/custom-bad-request-exception';

export class GetFirstLetterFromABARequestThereIsNoDataException extends CustomBadRequestException {
  constructor() {
    super({
      code: '',
      guid: 'd5c88132-86ae-4767-97e9-98327c3f30a3',
      command: BossConstants.GET_FIRST_LETTER_FROM_ABA_REQUEST,
      objectOrError: 'No hay datos para la consulta',
    });
  }
}
