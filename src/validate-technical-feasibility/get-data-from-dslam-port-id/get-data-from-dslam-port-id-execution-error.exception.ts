import { CustomBadRequestException } from 'src/system/infrastructure/exceptions/custom-exceptions/custom-bad-request-exception';

export class GetDataFromDSLAMPortIdExecutionErrorException extends CustomBadRequestException {
  constructor() {
    super({
      code: '',
      guid: '1b213953-b7f7-4fed-8b55-8770f5a3cfe9',
      objectOrError:
        'Ha ocurrido un error al ejecutar el SP GetDataFromDslamPortid',
    });
  }
}
