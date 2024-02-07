import { BossConstants } from 'src/boss/boss.constants';
import { CustomBadRequestException } from 'src/system/infrastructure/exceptions/custom-exceptions/custom-bad-request-exception';
import { ExceptionHelper } from 'src/system/infrastructure/helpers/exception.helper';

export class GetFirstLetterFromABARequestException extends CustomBadRequestException {
  constructor() {
    super({
      code: '',
      guid: 'e18f9953-a939-43cd-9344-9aa8417febac',
      command: BossConstants.GET_FIRST_LETTER_FROM_ABA_REQUEST,
      objectOrError: ExceptionHelper.storedProcedureExecutionExceptionMessage(
        BossConstants.GET_FIRST_LETTER_FROM_ABA_REQUEST,
      ),
    });
  }
}
