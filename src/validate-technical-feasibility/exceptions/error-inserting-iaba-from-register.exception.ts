import { CustomBadRequestException } from 'src/system/infrastructure/exceptions/custom-exceptions/custom-bad-request-exception';

export class ErrorInsertingIABAFromRegisterException extends CustomBadRequestException {
  constructor() {
    super({
      code: '',
      guid: 'b2eb63c4-a208-4db2-a804-29578986a954',
      objectOrError: 'Error insertando IABA desde registro',
    });
  }
}
