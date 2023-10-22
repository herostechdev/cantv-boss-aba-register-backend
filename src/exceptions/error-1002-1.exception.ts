import { CustomInternalServerException } from 'src/system/infrastructure/exceptions/custom-exceptions/custom-internal-server-exception';

export class Error10021Exception extends CustomInternalServerException {
  constructor() {
    super({
      code: '1002-1',
      guid: '67865c25-294a-43e2-b9e3-e2b9ab9cf54b',
      objectOrError:
        'Clase de cliente en Boss es distinta de la de ASAP (Res - Natural / Nores - Jurídico)',
    });
  }
}
