import { CustomBadRequestException } from 'src/system/infrastructure/exceptions/custom-exceptions/custom-bad-request-exception';

export class ContactAdministratorException extends CustomBadRequestException {
  constructor() {
    super({
      code: '',
      guid: '4a6f38f0-33d4-48e2-b21a-a6f2f32d8988',
      objectOrError: 'Error Genérico. Contactar Administrador',
    });
  }
}
