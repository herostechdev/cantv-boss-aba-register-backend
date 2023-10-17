import { CustomBadRequestException } from 'src/system/infrastructure/exceptions/custom-exceptions/custom-bad-request-exception';

export class GetPortIdFromIpDSLAMDataNotFoundException extends CustomBadRequestException {
  constructor() {
    super({
      code: '',
      guid: 'cdfff956-c901-416f-a73e-8716f8b16b8f',
      objectOrError: 'No hay datos del DSLAM dado el Puerto en BOSS',
    });
  }
}
