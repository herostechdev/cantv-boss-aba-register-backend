import { CustomBadRequestException } from 'src/system/infrastructure/exceptions/custom-exceptions/custom-bad-request-exception';

export class InsertDslAbaRegisterException extends CustomBadRequestException {
  constructor() {
    super({
      code: '',
      guid: '4143d9e9-f1fa-4f73-885d-37b307b5d3fb',
      objectOrError: 'Usuario ya registro en ABA',
    });
  }
}
