import { CustomInternalServerException } from 'src/system/infrastructure/exceptions/custom-exceptions/custom-internal-server-exception';

export class Error30041Exception extends CustomInternalServerException {
  constructor() {
    super({
      code: '3004-1',
      guid: '4c6bd14b-00d3-41e8-9866-28ba83fc9229',
      objectOrError:
        'El teléfono no corresponde a alguna Ceb=ntral ADSL registrada en BOSS. Por favor verifique su número de teléfono',
    });
  }
}
