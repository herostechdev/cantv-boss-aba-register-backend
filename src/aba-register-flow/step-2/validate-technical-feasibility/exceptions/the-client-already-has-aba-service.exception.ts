import { CustomBadRequestException } from 'src/system/infrastructure/exceptions/custom-exceptions/custom-bad-request-exception';

export class TheClientAlreadyHasABAServiceException extends CustomBadRequestException {
  constructor() {
    super({
      code: '',
      guid: 'd6068300-b9c8-42a8-b4db-99e514bcf830',
      objectOrError: 'El cliente ya tiene el servicio ABA',
    });
  }
}
