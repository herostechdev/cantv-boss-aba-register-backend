import { CustomBadRequestException } from 'src/system/infrastructure/exceptions/custom-exceptions/custom-bad-request-exception';

export class UpdateDslAbaRegistersInternalErrorException extends CustomBadRequestException {
  constructor() {
    super({
      code: '',
      guid: 'd415202c-270b-41dc-af1c-faf7b30c1ae9',
      objectOrError:
        'Ha ocurrido un error al ejecutar el SP UpdateDslAbaRegisters',
    });
  }
}
