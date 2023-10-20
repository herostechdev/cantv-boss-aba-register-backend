import { CustomBadRequestException } from 'src/system/infrastructure/exceptions/custom-exceptions/custom-bad-request-exception';

export class GetABADataExecutionErrorException extends CustomBadRequestException {
  constructor() {
    super({
      code: '',
      guid: '524c9cc4-3911-4ff9-8b28-c1afc281c0a8',
      objectOrError: 'Ha ocurrido un error al ejecutar el SP GetABAData',
    });
  }
}
