import { CustomBadRequestException } from 'src/system/infrastructure/exceptions/custom-exceptions/custom-bad-request-exception';

export class GetDownstreamFromPlanException extends CustomBadRequestException {
  constructor() {
    super({
      code: '',
      guid: '620dc849-9ba3-4132-992a-7ba39fd91935',
      objectOrError: 'Error al obtener la velocidad de descarga de un plan',
    });
  }
}
