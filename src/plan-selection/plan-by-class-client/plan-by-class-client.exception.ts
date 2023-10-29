import { CustomBadRequestException } from 'src/system/infrastructure/exceptions/custom-exceptions/custom-bad-request-exception';

export class PlanByClassClientException extends CustomBadRequestException {
  constructor() {
    super({
      code: '',
      guid: 'bd958810-5ed6-4530-97e6-bc2f39297fe3',
      objectOrError: 'Error al ejecutar el SP GetFirstLetterFromABARequest',
    });
  }
}
