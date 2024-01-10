import { CustomBadRequestException } from 'src/system/infrastructure/exceptions/custom-exceptions/custom-bad-request-exception';

export class LoginAlreadyExistsException extends CustomBadRequestException {
  constructor() {
    super({
      code: '',
      guid: '751eb9d6-da7a-40b7-9a18-d23f11a47991',
      objectOrError: 'El nombre de usuario (login) ya existe',
    });
  }
}
