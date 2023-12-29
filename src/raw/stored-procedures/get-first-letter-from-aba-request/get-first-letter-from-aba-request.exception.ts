import { CustomBadRequestException } from 'src/system/infrastructure/exceptions/custom-exceptions/custom-bad-request-exception';

export class GetFirstLetterFromABARequestException extends CustomBadRequestException {
  constructor() {
    super({
      code: '',
      guid: 'e18f9953-a939-43cd-9344-9aa8417febac',
      objectOrError:
        'Ha ocurrido un error al ejecutar el SP GetFirstLetterFromABARequest',
    });
  }
}
