import { CustomBadRequestException } from 'src/system/infrastructure/exceptions/custom-exceptions/custom-bad-request-exception';

export class InvalidPasswordException extends CustomBadRequestException {
  constructor() {
    super({
      code: '',
      guid: '5be4ea48-ee35-4331-86ba-122891c6ea26',
      objectOrError: 'La contraseña es inválida',
    });
  }
}
