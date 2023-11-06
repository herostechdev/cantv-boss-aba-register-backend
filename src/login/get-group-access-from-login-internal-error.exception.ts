import { CustomBadRequestException } from 'src/system/infrastructure/exceptions/custom-exceptions/custom-bad-request-exception';

export class GetGroupAccessFromLoginInternalErrorException extends CustomBadRequestException {
  constructor() {
    super({
      code: '',
      guid: '9b579c40-6dc0-49b7-b5ca-ee6ce0e4207f',
      objectOrError:
        'Ha ocurrido un error al ejecutar el SP GetlfRemoteInstallerIP',
    });
  }
}
