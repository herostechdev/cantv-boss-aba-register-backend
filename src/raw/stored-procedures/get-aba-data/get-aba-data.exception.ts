import { BossConstants } from 'src/boss/boss.constants';
import { CustomBadRequestException } from 'src/system/infrastructure/exceptions/custom-exceptions/custom-bad-request-exception';

export class GetABADataException extends CustomBadRequestException {
  constructor() {
    super({
      code: '',
      guid: '524c9cc4-3911-4ff9-8b28-c1afc281c0a8',
      objectOrError: `Ha ocurrido un error al ejecutar el SP ${BossConstants.GET_ABA_DATA}`,
    });
  }
}
